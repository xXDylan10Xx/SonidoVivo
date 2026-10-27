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
