import { productos } from './productos'
import type { ProductoCarrito } from './productos'

const claveCarrito = 'sonidovivo-carrito'

export function cargarCarrito(): ProductoCarrito[] {
    try {
        const guardado = JSON.parse(localStorage.getItem(claveCarrito) ?? '[]')

        if (!Array.isArray(guardado)) return []

        const carrito: ProductoCarrito[] = []

        // Recuperar los datos del catálogo y aceptar solo cantidades válidas.
        for (const producto of productos) {
            const item = guardado.find((item) =>
                item !== null && typeof item === 'object' && item.id === producto.id
            )

            if (
                item &&
                Number.isInteger(item.cantidad) &&
                item.cantidad >= 1 &&
                item.cantidad <= producto.stock
            ) {
                carrito.push({ ...producto, cantidad: item.cantidad })
            }
        }

        return carrito
    } catch {
        return []
    }
}

export function guardarCarrito(carrito: ProductoCarrito[]) {
    try {
        const datos = carrito.map((producto) => ({
            id: producto.id,
            cantidad: producto.cantidad,
        }))

        localStorage.setItem(claveCarrito, JSON.stringify(datos))
    } catch (error) {
        console.warn('No se pudo guardar el carrito en este navegador.', error)
    }
}
