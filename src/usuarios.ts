export type TipoUsuario = 'Cliente' | 'Administrador'

export interface Usuario {
    id: number
    run: string
    nombre: string
    apellidos: string
    correo: string
    region: string
    comuna: string
    direccion: string
    clave: string
    tipoUsuario: TipoUsuario
}

export const regionesComunas: Record<string, string[]> = {
    Metropolitana: ['Santiago', 'Quilicura', 'Providencia', 'Maipú'],
    Valparaíso: ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    Biobío: ['Concepción', 'Talcahuano', 'Los Ángeles'],
}

const usuariosEjemplo: Usuario[] = [
    {
        id: 1, run: '12345678-5', nombre: 'Administrador', apellidos: 'Demo',
        correo: 'adminsonido@vivo.cl', region: 'Metropolitana', comuna: 'Santiago',
        direccion: 'Demo', clave: 'admin1234', tipoUsuario: 'Administrador',
    },
    {
        id: 2, run: '11111111-1', nombre: 'Cliente', apellidos: 'Demo',
        correo: 'clientesonido@vivo.cl', region: 'Metropolitana', comuna: 'Santiago',
        direccion: 'Demo', clave: 'cliente123', tipoUsuario: 'Cliente',
    },
]

export function cargarUsuarios(): Usuario[] {
    try {
        const datos = JSON.parse(localStorage.getItem('sonidovivo.usuarios') ?? 'null')
        if (!Array.isArray(datos)) return usuariosEjemplo
        if (!datos.every((usuario) =>
            usuario && typeof usuario.id === 'number' &&
            typeof usuario.correo === 'string' && typeof usuario.clave === 'string' &&
            typeof usuario.nombre === 'string' && typeof usuario.run === 'string' &&
            typeof usuario.apellidos === 'string' && typeof usuario.region === 'string' &&
            typeof usuario.comuna === 'string' && typeof usuario.direccion === 'string' &&
            (usuario.tipoUsuario === 'Cliente' || usuario.tipoUsuario === 'Administrador')
        )) return usuariosEjemplo
        return datos
    } catch {
        return usuariosEjemplo
    }
}

export function guardarUsuarios(usuarios: Usuario[]): boolean {
    try {
        localStorage.setItem('sonidovivo.usuarios', JSON.stringify(usuarios))
        return true
    } catch {
        return false
    }
}

export function usuarioActual(): Usuario | null {
    try {
        const id = Number(sessionStorage.getItem('sonidovivo.sesion'))
        return cargarUsuarios().find((usuario) => usuario.id === id) ?? null
    } catch {
        return null
    }
}

export function validarRun(run: string): boolean {
    const limpio = run.replace(/[.-]/g, '').toUpperCase()
    if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false
    const cuerpo = limpio.slice(0, -1)
    const digito = limpio.slice(-1)
    let suma = 0
    let multiplicador = 2
    for (let indice = cuerpo.length - 1; indice >= 0; indice--) {
        suma += Number(cuerpo[indice]) * multiplicador
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
    }
    const resto = 11 - (suma % 11)
    const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
    return digito === esperado
}

export function validarUsuario(usuario: Usuario, usuarios: Usuario[]): string {
    if (
        !usuario.run.trim() || !usuario.nombre.trim() || !usuario.apellidos.trim() ||
        !usuario.correo.trim() || !usuario.region || !usuario.comuna ||
        !usuario.direccion.trim() || !usuario.clave
    ) return 'Debe completar todos los campos obligatorios.'
    if (!validarRun(usuario.run)) return 'El RUN ingresado no es válido.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.correo.trim())) return 'Ingrese un correo válido.'
    if (!regionesComunas[usuario.region]?.includes(usuario.comuna)) return 'Seleccione una región y comuna válidas.'
    if (usuario.clave.length < 4 || usuario.clave.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.'
    const run = usuario.run.replace(/[.-]/g, '').toUpperCase()
    const correo = usuario.correo.trim().toLowerCase()
    if (usuarios.some((otro) =>
        otro.id !== usuario.id &&
        (otro.correo.trim().toLowerCase() === correo || otro.run.replace(/[.-]/g, '').toUpperCase() === run)
    )) return 'Correo o RUN ya registrado.'
    return ''
}
