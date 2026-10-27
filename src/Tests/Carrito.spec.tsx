import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Carrito de compras', () => {
    let contenedor: HTMLDivElement
    let root: Root
    let datosGuardados: string | null

    beforeEach(() => {
        datosGuardados = null
        spyOn(Storage.prototype, 'getItem').and.callFake((clave) =>
            clave === 'sonidovivo-carrito' ? datosGuardados : null
        )
        spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
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
            root.render(
                <MemoryRouter initialEntries={[ruta]}>
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

    function totalMostrado() {
        return contenedor.querySelector('main dd[aria-live="polite"]')?.textContent?.trim()
    }

    it('muestra el carrito vacío y oculta el enlace al pago', async () => {
        await montar('/Carrito')

        expect(contenedor.querySelector('main')?.textContent).toContain('Tu carrito está vacío')
        expect(contenedor.querySelector('main a[href="/Productos"]')).not.toBeNull()
        expect(contenedor.querySelector('main a[href="/Pago"]')).toBeNull()
    })

    it('agrega productos y aumenta la cantidad sin duplicar la fila', async () => {
        await montar('/Productos')
        await pulsar('main article button')
        await pulsar('main article button')
        await pulsar('main a[href="/Carrito"]')

        expect(contenedor.querySelectorAll('main li.list-group-item').length).toBe(1)
        expect(contenedor.querySelector('main li')?.textContent).toContain('Guitarra acústica')
        expect(contenedor.querySelector('main li')?.textContent).toContain('Cantidad: 2')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'GA001', cantidad: 2 }])
    })

    it('bloquea cantidades mayores al stock y menores a una unidad', async () => {
        await montar('/Productos')
        for (let intento = 0; intento < 4; intento++) {
            await pulsar('main article button')
        }
        expect(contenedor.querySelector<HTMLButtonElement>('main article button')?.disabled).toBeTrue()

        await pulsar('main a[href="/Carrito"]')
        const aumentar = 'main button[aria-label="Aumentar cantidad de Guitarra acústica"]'
        const disminuir = 'main button[aria-label="Disminuir cantidad de Guitarra acústica"]'

        expect(contenedor.querySelector<HTMLButtonElement>(aumentar)?.disabled).toBeTrue()
        await pulsar(aumentar)
        expect(contenedor.querySelector('main li')?.textContent).toContain('Cantidad: 3')

        await pulsar(disminuir)
        await pulsar(disminuir)
        expect(contenedor.querySelector<HTMLButtonElement>(disminuir)?.disabled).toBeTrue()
        await pulsar(disminuir)
        expect(contenedor.querySelector('main li')?.textContent).toContain('Cantidad: 1')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'GA001', cantidad: 1 }])
    })

    it('recalcula subtotales y total al aumentar y disminuir cantidades', async () => {
        datosGuardados = JSON.stringify([
            { id: 'GA001', cantidad: 1 },
            { id: 'MI001', cantidad: 1 },
        ])
        await montar('/Carrito')
        expect(totalMostrado()).toBe('$119.980')

        await pulsar('main button[aria-label="Aumentar cantidad de Guitarra acústica"]')
        expect(contenedor.querySelector('main li')?.textContent).toContain('Subtotal: $179.980')
        expect(totalMostrado()).toBe('$209.970')

        await pulsar('main button[aria-label="Disminuir cantidad de Guitarra acústica"]')
        expect(contenedor.querySelector('main li')?.textContent).toContain('Subtotal: $89.990')
        expect(totalMostrado()).toBe('$119.980')
    })

    it('elimina productos, actualiza el total y guarda el carrito vacío al quitar el último', async () => {
        datosGuardados = JSON.stringify([
            { id: 'GA001', cantidad: 1 },
            { id: 'MI001', cantidad: 1 },
        ])
        await montar('/Carrito')
        await pulsar('main button[aria-label="Eliminar Guitarra acústica"]')

        expect(contenedor.querySelectorAll('main li.list-group-item').length).toBe(1)
        expect(contenedor.querySelector('main li')?.textContent).toContain('Micrófono')
        expect(totalMostrado()).toBe('$29.990')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'MI001', cantidad: 1 }])

        await pulsar('main button[aria-label="Eliminar Micrófono"]')
        expect(contenedor.querySelector('main')?.textContent).toContain('Tu carrito está vacío')
        expect(contenedor.querySelector('main a[href="/Pago"]')).toBeNull()
        expect(datosGuardados).toBe('[]')
    })

    it('recupera el carrito guardado y descarta cantidades inválidas y productos inexistentes', async () => {
        datosGuardados = JSON.stringify([
            { id: 'GA001', cantidad: 2, precio: 1, stock: 999 },
            { id: 'GA001', cantidad: 3 },
            { id: 'MI001', cantidad: 99 },
            { id: 'NO-EXISTE', cantidad: 1 },
            null,
        ])
        await montar('/Carrito')

        expect(localStorage.getItem).toHaveBeenCalledWith('sonidovivo-carrito')
        expect(contenedor.querySelectorAll('main li.list-group-item').length).toBe(1)
        expect(contenedor.querySelector('main li')?.textContent).toContain('Cantidad: 2')
        expect(totalMostrado()).toBe('$179.980')
        expect(JSON.parse(datosGuardados ?? '[]')).toEqual([{ id: 'GA001', cantidad: 2 }])
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'sonidovivo-carrito',
            JSON.stringify([{ id: 'GA001', cantidad: 2 }])
        )
    })
})
