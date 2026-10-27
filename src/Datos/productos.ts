import guitarra from '../Imagenes/CatalogoImages/GA001-front.png'
import microfono from '../Imagenes/CatalogoImages/MI001-front.png'

export interface Producto {
    id: string
    nombre: string
    precio: number
    stock: number
    imagen: string
}

export interface ProductoCarrito extends Producto {
    cantidad: number
}

// Datos de ejemplo para probar el carrito hasta integrar el catálogo del equipo.
export const productos: Producto[] = [
    {
        id: 'GA001',
        nombre: 'Guitarra acústica',
        precio: 89990,
        stock: 3,
        imagen: guitarra,
    },
    {
        id: 'MI001',
        nombre: 'Micrófono',
        precio: 29990,
        stock: 2,
        imagen: microfono,
    },
]
