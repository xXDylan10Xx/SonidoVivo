import { validarRun, validarUsuario } from '../usuarios'
import type { Usuario } from '../usuarios'

describe('Validaciones de usuario', () => {
    const usuario: Usuario = {
        id: 3, run: '22222222-2', nombre: 'Ana', apellidos: 'Prueba',
        correo: 'ana@ejemplo.cl', region: 'Metropolitana', comuna: 'Santiago',
        direccion: 'Dirección de ejemplo', clave: 'clave1', tipoUsuario: 'Cliente',
    }

    it('acepta un RUN con dígito verificador válido', () => {
        expect(validarRun('22.222.222-2')).toBe(true)
    })

    it('rechaza un RUN con dígito verificador incorrecto', () => {
        expect(validarRun('22.222.222-3')).toBe(false)
    })

    it('detecta un correo registrado en otra cuenta', () => {
        expect(validarUsuario(usuario, [{ ...usuario, id: 1 }])).toContain('ya registrado')
    })
})