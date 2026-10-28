import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CampoFormulario from '../molecule/CampoFormulario'
import type { Usuario } from '../../usuarios'
import { cargarUsuarios } from '../../usuarios'

interface FormularioLoginProps {
    onIniciarSesion: (usuario: Usuario) => void
}

function FormularioLogin({ onIniciarSesion }: FormularioLoginProps) {
    const [correo, setCorreo] = useState('')
    const [clave, setClave] = useState('')
    const [mostrarClave, setMostrarClave] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const registroExitoso = useLocation().state === 'registro-exitoso'

    function ingresar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        if (!correo.trim() || !clave) {
            setError('Debe completar todos los campos.')
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            setError('Ingrese un correo válido.')
            return
        }
        if (clave.length < 4 || clave.length > 10) {
            setError('La clave debe tener entre 4 y 10 caracteres.')
            return
        }
        const usuario = cargarUsuarios().find((actual) =>
            actual.correo.toLowerCase() === correo.trim().toLowerCase() && actual.clave === clave
        )
        if (!usuario) {
            setError('Correo o clave incorrectos.')
            return
        }
        try {
            sessionStorage.setItem('sonidovivo.sesion', String(usuario.id))
        } catch {
            setError('No se pudo guardar la sesión en este navegador.')
            return
        }
        onIniciarSesion(usuario)
        navigate(usuario.tipoUsuario === 'Administrador' ? '/Admin' : '/')
    }

    return (
        <form onSubmit={ingresar} noValidate>
            {registroExitoso && <p className="alert alert-success" role="status">Registro de demostración guardado. Ahora puedes iniciar sesión.</p>}
            <CampoFormulario id="login-correo" etiqueta="Correo electrónico" type="email" autoComplete="email" required
                value={correo} onChange={(evento) => { setCorreo(evento.target.value); setError('') }} />
            <CampoFormulario id="login-clave" etiqueta="Contraseña" type={mostrarClave ? 'text' : 'password'}
                autoComplete="current-password" required value={clave}
                onChange={(evento) => { setClave(evento.target.value); setError('') }} />
            <button type="button" className="btn btn-outline-secondary mb-3" onClick={() => setMostrarClave(!mostrarClave)}>
                {mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            </button>
            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-dark">Ingresar</button>
                <Link to="/Registro" className="btn btn-outline-dark">Crear cuenta</Link>
            </div>
            <p className="mt-3 mb-0">Cuenta de administrador de ejemplo: adminsonido@vivo.cl / admin1234</p>
        </form>
    )
}

export default FormularioLogin
