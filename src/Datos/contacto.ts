export interface DatosContacto {
    nombre: string
    correo: string
    mensaje: string
}

export function validarDatosContacto(datos: DatosContacto): string {
    if (!datos.nombre.trim() || !datos.correo.trim() || !datos.mensaje.trim()) {
        return 'Debes completar nombre, correo y mensaje.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
        return 'Ingresa un correo electrónico válido.'
    }

    return ''
}
