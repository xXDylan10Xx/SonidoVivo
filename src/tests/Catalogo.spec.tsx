import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Catálogo original', () => {
    let contenedor: HTMLDivElement
    let root: Root
    let datosGuardados: string | null

    beforeEach(() => {
        datosGuardados = null
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

    async function montar(ruta: string) {
        await act(async () => {
            root.render(<MemoryRouter initialEntries={[ruta]}><App /></MemoryRouter>)
        })
    }

    async function pulsar(selector: string) {
        const elemento = contenedor.querySelector<HTMLElement>(selector)
        if (!elemento) throw new Error('No se encontró el elemento: ' + selector)
        await act(async () => {
            elemento.click()
        })
    }

    async function escribirPrecio(valor: string) {
        const campo = contenedor.querySelector<HTMLInputElement>('#precio-maximo')
        const cambiarValor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        if (!campo || !cambiarValor) throw new Error('No se encontró el precio máximo')
        await act(async () => {
            cambiarValor.call(campo, valor)
            campo.dispatchEvent(new Event('input', { bubbles: true }))
        })
    }

    it('muestra los 51 productos originales con sus datos e imágenes', async () => {
        await montar('/Productos')

        const tarjetas = contenedor.querySelectorAll('main article')
        expect(tarjetas.length).toBe(51)
        expect(tarjetas[0].textContent).toContain('Guitarra Acústica Folk')
        expect(tarjetas[0].textContent).toContain('Yamaha')
        expect(tarjetas[0].textContent).toContain('$129.990')
        expect(tarjetas[0].querySelector('img')?.getAttribute('src')).toBeTruthy()
        expect(contenedor.querySelector('main img[alt="Productos disponibles en SonidoVivo"]')).not.toBeNull()
        const botonFiltros = contenedor.querySelector('button[aria-controls="contenido-filtros"]')
        expect(botonFiltros?.getAttribute('aria-expanded')).toBe('false')
        await pulsar('button[aria-controls="contenido-filtros"]')
        expect(botonFiltros?.getAttribute('aria-expanded')).toBe('true')
        expect(contenedor.querySelector('#contenido-filtros')?.classList.contains('abierto')).toBe(true)
    })

    it('aplica categorías desde la URL y muestra un mensaje si no hay resultados', async () => {
        await montar('/Productos?categoria=Micr%C3%B3fonos')

        expect(contenedor.querySelectorAll('main article').length).toBe(4)
        expect(contenedor.querySelector<HTMLInputElement>('input[value="Micrófonos"]')?.checked).toBe(true)
        await pulsar('input[value="Baterías"]')
        expect(contenedor.querySelectorAll('main article').length).toBe(9)

        await escribirPrecio('1')
        await pulsar('main aside form button[type="submit"]')
        expect(contenedor.querySelectorAll('main article').length).toBe(0)
        expect(contenedor.querySelector('main [role="status"]')?.textContent).toContain('No hay productos')

        await pulsar('#limpiar-filtros')
        expect(contenedor.querySelectorAll('main article').length).toBe(51)
        expect(contenedor.querySelector<HTMLInputElement>('#precio-maximo')?.value).toBe('')
    })

    it('filtra por marca y precio y ordena los resultados', async () => {
        await montar('/Productos')
        await pulsar('input[value="Yamaha"]')
        await escribirPrecio('150000')
        await pulsar('main aside form button[type="submit"]')

        const tarjetas = contenedor.querySelectorAll('main article')
        expect(tarjetas.length).toBeGreaterThan(0)
        for (const tarjeta of tarjetas) {
            expect(tarjeta.querySelector('h2')?.textContent).toBe('Yamaha')
            const precio = tarjeta.querySelector('.precio-catalogo')?.textContent ?? ''
            expect(Number(precio.replace(/\D/g, ''))).toBeLessThanOrEqual(150000)
        }

        const orden = contenedor.querySelector<HTMLSelectElement>('#orden-catalogo')
        if (!orden) throw new Error('No se encontró el selector de orden')
        await act(async () => {
            orden.value = 'precio-asc'
            orden.dispatchEvent(new Event('change', { bubbles: true }))
        })
        const precios = Array.from(contenedor.querySelectorAll('main article .precio-catalogo'))
            .map((elemento) => Number((elemento.textContent ?? '').replace(/\D/g, '')))
        for (let indice = 1; indice < precios.length; indice++) {
            expect(precios[indice]).toBeGreaterThanOrEqual(precios[indice - 1])
        }
    })

    it('abre el detalle de una tarjeta y agrega el producto al carrito', async () => {
        await montar('/Productos')
        await pulsar('main article a')

        expect(contenedor.querySelector('main h1')?.textContent).toBe('Guitarra Acústica Folk')
        expect(contenedor.querySelector('main')?.textContent).toContain('F310')
        expect(contenedor.querySelector('main')?.textContent).toContain('$129.990')
        await pulsar('main button')
        await pulsar('main a[href="/Carrito"]')

        expect(contenedor.querySelector('main li')?.textContent).toContain('Guitarra Acústica Folk')
        expect(contenedor.querySelector('main li')?.textContent).toContain('Cantidad: 1')
        expect(contenedor.querySelector('main dd[aria-live="polite"]')?.textContent?.trim()).toBe('$129.990')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'GA001', cantidad: 1 }])
    })

    it('aplica el precio de oferta en el carrito y al recuperar los datos', async () => {
        await montar('/Ofertas')
        expect(contenedor.querySelectorAll('main article').length).toBe(3)
        expect(contenedor.querySelector('main article')?.textContent).toContain('$189.990')
        expect(contenedor.querySelector('main article')?.textContent).toContain('$170.991')
        await pulsar('main article button')
        await pulsar('nav a[href="/Carrito"]')
        expect(contenedor.querySelector('main dd[aria-live="polite"]')?.textContent?.trim()).toBe('$170.991')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'GA002', cantidad: 1 }])

        await act(async () => root.unmount())
        root = createRoot(contenedor)
        await montar('/Carrito')
        expect(contenedor.querySelector('main dd[aria-live="polite"]')?.textContent?.trim()).toBe('$170.991')
    })

    it('muestra una salida cuando el producto no existe', async () => {
        await montar('/Productos/NO-EXISTE')

        expect(contenedor.querySelector('main h1')?.textContent).toBe('Producto no encontrado')
        expect(contenedor.querySelector('main a[href="/Productos"]')).not.toBeNull()
    })
})
