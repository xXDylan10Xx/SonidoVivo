import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Pago de demostración', () => {
    let contenedor: HTMLDivElement
    let root: Root
    let datosGuardados: string | null

    const carritoInicial = [
        { id: 'GA001', cantidad: 1 },
        { id: 'MI001', cantidad: 1 },
    ]

    beforeEach(() => {
        datosGuardados = JSON.stringify(carritoInicial)
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((clave) =>
            clave === 'sonidovivo-carrito' ? datosGuardados : null
        )
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation((clave, valor) => {
            if (clave === 'sonidovivo-carrito') datosGuardados = valor
        })

        contenedor = document.createElement('div')
        document.body.appendChild(contenedor)
        root = createRoot(contenedor)
    })

    afterEach(async () => {
        await act(async () => {
            root.unmount()
        })
        contenedor.remove()
    })

    async function montar() {
        await act(async () => {
            root.render(
                <MemoryRouter initialEntries={['/Pago']}>
                    <App />
                </MemoryRouter>
            )
        })
    }

    async function pulsar(selector: string) {
        const elemento = contenedor.querySelector<HTMLElement>(selector)
        if (!elemento) throw new Error('No se encontró el elemento: ' + selector)

        await act(async () => {
            elemento.click()
        })
    }

    async function escribir(id: string, valor: string) {
        const campo = contenedor.querySelector<HTMLInputElement>('#' + id)
        const cambiarValor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        if (!campo || !cambiarValor) throw new Error('No se encontró el campo: ' + id)

        await act(async () => {
            // El setter nativo permite que React detecte la escritura simulada.
            cambiarValor.call(campo, valor)
            campo.dispatchEvent(new Event('input', { bubbles: true }))
        })
    }

    async function seleccionar(id: string, valor: string) {
        const campo = contenedor.querySelector<HTMLSelectElement>('#' + id)
        if (!campo) throw new Error('No se encontró la selección: ' + id)

        await act(async () => {
            campo.value = valor
            campo.dispatchEvent(new Event('change', { bubbles: true }))
        })
    }

    async function completarFormulario() {
        await escribir('pago-nombre', 'Cliente de prueba')
        await escribir('pago-correo', 'cliente@example.com')
        await escribir('pago-direccion', 'Calle de prueba 123')
        await escribir('pago-comuna', 'Santiago')
    }

    it('bloquea el formulario cuando no hay productos en el carrito', async () => {
        datosGuardados = null
        await montar()

        expect(contenedor.querySelector('main')?.textContent).toContain('Agrega productos al carrito')
        expect(contenedor.querySelector('main form')).toBeNull()
        expect(contenedor.querySelector('main a[href="/Productos"]')).not.toBeNull()
        expect(contenedor.querySelector('main [role="status"]')).toBeNull()
    })

    it('rechaza campos vacíos, espacios y correo inválido sin vaciar el carrito', async () => {
        await montar()
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main [role="alert"]')?.textContent).toContain('Debes completar')

        await completarFormulario()
        await escribir('pago-nombre', '   ')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main [role="alert"]')?.textContent).toContain('Debes completar')

        await escribir('pago-nombre', 'Cliente de prueba')
        await escribir('pago-correo', 'correo-invalido')
        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main [role="alert"]')?.textContent).toContain('correo electrónico válido')
        expect(contenedor.querySelector('main h1')?.textContent).toBe('Pago')
        expect(contenedor.querySelector('main [role="status"]')).toBeNull()
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual(carritoInicial)
    })

    it('aprueba el pago, confirma el pedido con seguimiento y vacía el carrito', async () => {
        vi.spyOn(Date, 'now').mockReturnValue(1234567890000)
        await montar()
        await completarFormulario()
        await escribir('pago-nombre', ' Cliente de prueba ')
        await pulsar('main button[type="submit"]')

        const texto = contenedor.querySelector('main')?.textContent
        expect(contenedor.querySelector('main [role="status"]')?.textContent).toContain('No se realizó ningún cobro')
        expect(texto).toContain('Resumen de tu solicitud, Cliente de prueba.')
        expect(texto).toContain('SV-1234567890000')
        expect(texto).toContain('DEMO-1234567890000')
        expect(texto).toContain('Guitarra Acústica Folk')
        expect(texto).toContain('Micrófono')
        expect(texto).toContain('$279.980')
        expect(texto).toContain('cliente@example.com')
        expect(texto).toContain('Calle de prueba 123')
        expect(texto).toContain('Santiago')
        expect(texto).toContain('Despacho incluido')
        expect(texto).toContain('código es ficticio')
        expect(contenedor.querySelector('main a[href="https://www.chilexpress.cl/estado-envio-paquete-courier"]')).not.toBeNull()
        expect(localStorage.setItem).toHaveBeenCalledWith('sonidovivo-carrito', '[]')

        await pulsar('nav a[href="/Carrito"]')
        expect(contenedor.querySelector('main')?.textContent).toContain('Tu carrito está vacío')
    })

    it('muestra el rechazo simulado y conserva los productos para un nuevo intento', async () => {
        await montar()
        await completarFormulario()
        await pulsar('#pago-simular-rechazo')
        await pulsar('main button[type="submit"]')

        expect(contenedor.querySelector('main h1')?.textContent).toBe('Resultado del pago')
        expect(contenedor.querySelector('main [role="alert"]')?.textContent).toContain('No se pudo completar')
        expect(contenedor.querySelector('main [role="status"]')).toBeNull()
        expect(contenedor.querySelector('main')?.textContent).not.toContain('DEMO-')
        expect(contenedor.querySelector('main a[href="/Pago"]')).not.toBeNull()
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual(carritoInicial)

        await pulsar('main a[href="/Carrito"]')
        expect(contenedor.querySelectorAll('main li.list-group-item').length).toBe(2)
        expect(contenedor.querySelector('main dd[aria-live="polite"]')?.textContent?.trim()).toBe('$279.980')
    })

    it('recupera los datos al reintentar y permite aprobar el pago después del rechazo', async () => {
        await montar()
        await completarFormulario()
        await seleccionar('pago-entrega', 'sucursal')
        await seleccionar('pago-metodo', 'transferencia')
        await pulsar('#pago-simular-rechazo')
        await pulsar('main button[type="submit"]')
        await pulsar('main a[href="/Pago"]')

        expect(contenedor.querySelector<HTMLInputElement>('#pago-nombre')?.value).toBe('Cliente de prueba')
        expect(contenedor.querySelector<HTMLInputElement>('#pago-correo')?.value).toBe('cliente@example.com')
        expect(contenedor.querySelector<HTMLInputElement>('#pago-direccion')?.value).toBe('Calle de prueba 123')
        expect(contenedor.querySelector<HTMLInputElement>('#pago-comuna')?.value).toBe('Santiago')
        expect(contenedor.querySelector<HTMLSelectElement>('#pago-entrega')?.value).toBe('sucursal')
        expect(contenedor.querySelector<HTMLSelectElement>('#pago-metodo')?.value).toBe('transferencia')
        expect(contenedor.querySelector<HTMLInputElement>('#pago-simular-rechazo')?.checked).toBe(false)
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual(carritoInicial)

        await pulsar('main button[type="submit"]')
        expect(contenedor.querySelector('main [role="status"]')?.textContent).toContain('No se realizó ningún cobro')
        expect(contenedor.querySelector('main')?.textContent).toContain('Sucursal Chilexpress')
        expect(contenedor.querySelector('main')?.textContent).toContain('Medio de pago: Transferencia')
        expect(contenedor.querySelector('main')?.textContent).toContain('$279.980')
        expect(datosGuardados).toBe('[]')
    })
})
