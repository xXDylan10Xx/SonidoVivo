import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Ingreso, registro y administración', () => {
    let contenedor: HTMLDivElement
    let root: Root
    let almacen: Record<string, string>

    beforeEach(() => {
        almacen = {}
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((clave) => almacen[clave] ?? null)
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation((clave, valor) => { almacen[clave] = valor })
        vi.spyOn(Storage.prototype, 'removeItem').mockImplementation((clave) => { delete almacen[clave] })
        contenedor = document.createElement('div')
        document.body.appendChild(contenedor)
        root = createRoot(contenedor)
    })

    afterEach(async () => {
        await act(async () => root.unmount())
        contenedor.remove()
    })

    async function montar(ruta: string) {
        await act(async () => root.render(<MemoryRouter initialEntries={[ruta]}><App /></MemoryRouter>))
    }

    async function escribir(selector: string, valor: string) {
        const input = contenedor.querySelector<HTMLInputElement>(selector)
        if (!input) throw new Error('No existe ' + selector)
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        await act(async () => {
            setter?.call(input, valor)
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
    }

    async function pulsar(selector: string) {
        const elemento = contenedor.querySelector<HTMLElement>(selector)
        if (!elemento) throw new Error('No existe ' + selector)
        await act(async () => elemento.click())
    }

    it('rechaza un correo inválido al ingresar', async () => {
        await montar('/IniciarSesion')
        await escribir('#login-correo', 'correo-invalido')
        await escribir('#login-clave', '1234')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain('correo válido')
    })

    it('bloquea el registro cuando las contraseñas son distintas', async () => {
        await montar('/Registro')
        await escribir('#registro-clave', 'clave1')
        await escribir('#registro-confirmacion', 'clave2')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain('contraseñas no coinciden')
        expect(almacen['sonidovivo.usuarios']).toBeUndefined()
    })

    it('registra un usuario de ejemplo con datos válidos', async () => {
        await montar('/Registro')
        await escribir('#registro-run', '12345678-5')
        await escribir('#registro-nombre', 'Ana')
        await escribir('#registro-apellidos', 'Prueba')
        await escribir('#registro-correo', 'ana@ejemplo.cl')
        async function seleccionar(selector: string, valor: string) {
            const campo = contenedor.querySelector<HTMLSelectElement>(selector)
            if (!campo) throw new Error('No existe ' + selector)
            await act(async () => { campo.value = valor; campo.dispatchEvent(new Event('change', { bubbles: true })) })
        }
        await seleccionar('#registro-region', 'Metropolitana')
        await seleccionar('#registro-comuna', 'Santiago')
        await escribir('#registro-direccion', 'Dirección de ejemplo')
        await escribir('#registro-clave', 'clave1')
        await escribir('#registro-confirmacion', 'clave1')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain('ya registrado')
        await escribir('#registro-run', '22222222-2')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main')?.textContent).toContain('Registro de demostración guardado')
        expect(JSON.parse(almacen['sonidovivo.usuarios']).some((item: { correo: string }) => item.correo === 'ana@ejemplo.cl')).toBe(true)
    })

    it('redirige al ingreso si se intenta abrir la administración sin sesión', async () => {
        await montar('/Admin')
        expect(contenedor.querySelector('main h1')?.textContent).toContain('Iniciar')
    })

    it('permite ingresar con el administrador de ejemplo y cerrar sesión', async () => {
        await montar('/IniciarSesion')
        await escribir('#login-correo', 'adminsonido@vivo.cl')
        await escribir('#login-clave', 'admin1234')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main h1')?.textContent).toContain('Administración')
        expect(almacen['sonidovivo.sesion']).toBe('1')
        await pulsar('nav button.NavbarIniciarSesion')
        expect(almacen['sonidovivo.sesion']).toBeUndefined()
        expect(contenedor.querySelector('main h1')?.textContent).toContain('Iniciar')
    })

    it('guarda cambios de stock y ajusta el carrito', async () => {
        almacen['sonidovivo.sesion'] = '1'
        almacen['sonidovivo-carrito'] = JSON.stringify([{ id: 'GA001', cantidad: 3 }])
        await montar('/Admin/productos')
        await pulsar('main tbody tr:first-child button')
        const input = Array.from(contenedor.querySelectorAll<HTMLInputElement>('main form input')).find((item) =>
            item.closest('label')?.textContent?.includes('Stock')
        )
        if (!input) throw new Error('No existe el campo de stock')
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        await act(async () => { setter?.call(input, '1'); input.dispatchEvent(new Event('input', { bubbles: true })) })
        await pulsar('main form button[type="submit"]')
        const productos = JSON.parse(almacen['sonidovivo.productos'])
        expect(productos.find((item: { id: string }) => item.id === 'GA001').stock).toBe(1)
        expect(JSON.parse(almacen['sonidovivo-carrito'])).toEqual([{ id: 'GA001', cantidad: 1 }])
    })
})