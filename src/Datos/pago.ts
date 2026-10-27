import type { ProductoCarrito } from './productos'

export interface DatosPago {
    nombre: string
    correo: string
    direccion: string
    comuna: string
    entrega: string
    metodo: string
}

export function validarDatosPago(datos: DatosPago): string {
    if (
        !datos.nombre.trim() ||
        !datos.correo.trim() ||
        !datos.direccion.trim() ||
        !datos.comuna.trim()
    ) {
        return 'Debes completar nombre, correo, dirección y comuna.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
        return 'Ingresa un correo electrónico válido.'
    }

    if (datos.entrega !== 'domicilio' && datos.entrega !== 'sucursal') {
        return 'Selecciona una forma de entrega válida.'
    }

    if (datos.metodo !== 'tarjeta' && datos.metodo !== 'transferencia') {
        return 'Selecciona un medio de pago válido.'
    }

    return ''
}

export interface Pedido {
    numero: string
    datos: DatosPago
    productos: ProductoCarrito[]
    total: number
    seguimiento: string
}

export function crearPedido(datos: DatosPago, carrito: ProductoCarrito[]): Pedido | null {
    if (
        validarDatosPago(datos) ||
        carrito.length === 0 ||
        carrito.some((producto) =>
            !Number.isInteger(producto.cantidad) ||
            producto.cantidad < 1 ||
            producto.cantidad > producto.stock
        )
    ) {
        return null
    }

    const numero = Date.now().toString()

    return {
        numero: 'SV-' + numero,
        datos: {
            ...datos,
            nombre: datos.nombre.trim(),
            correo: datos.correo.trim(),
            direccion: datos.direccion.trim(),
            comuna: datos.comuna.trim(),
        },
        productos: carrito.map((producto) => ({ ...producto })),
        total: carrito.reduce((suma, producto) =>
            suma + producto.precio * producto.cantidad, 0
        ),
        seguimiento: 'DEMO-' + numero,
    }
}
