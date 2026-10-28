import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../molecule/CampoFormulario'
import { cargarUsuarios, guardarUsuarios, regionesComunas, validarUsuario } from '../../usuarios'
import type { Usuario } from '../../usuarios'

const datosIniciales: Usuario = {
    id: 0, run: '', nombre: '', apellidos: '', correo: '', region: '',
    comuna: '', direccion: '', clave: '', tipoUsuario: 'Cliente',
}

function FormularioRegistro() {
    const [datos, setDatos] = useState<Usuario>(datosIniciales)
    const [confirmacion, setConfirmacion] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function registrar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        if (datos.clave !== confirmacion) {
            setError('Las contraseñas no coinciden.')
            return
        }
        const usuarios = cargarUsuarios()
        const nuevo: Usuario = {
            ...datos,
            id: Math.max(0, ...usuarios.map((usuario) => usuario.id)) + 1,
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            correo: datos.correo.trim().toLowerCase(),
            direccion: datos.direccion.trim(),
        }
        const mensaje = validarUsuario(nuevo, usuarios)
        if (mensaje) {
            setError(mensaje)
            return
        }
        if (!guardarUsuarios([...usuarios, nuevo])) {
            setError('No se pudieron guardar los datos en este navegador.')
            return
        }
        navigate('/IniciarSesion', { state: 'registro-exitoso' })
    }

    return (
        <form onSubmit={registrar} onChange={() => setError('')} noValidate>
            <CampoFormulario id="registro-run" etiqueta="RUN" type="text" required value={datos.run}
                onChange={(evento) => setDatos({ ...datos, run: evento.target.value })} />
            <CampoFormulario id="registro-nombre" etiqueta="Nombre" type="text" required value={datos.nombre}
                onChange={(evento) => setDatos({ ...datos, nombre: evento.target.value })} />
            <CampoFormulario id="registro-apellidos" etiqueta="Apellidos" type="text" required value={datos.apellidos}
                onChange={(evento) => setDatos({ ...datos, apellidos: evento.target.value })} />
            <CampoFormulario id="registro-correo" etiqueta="Correo electrónico" type="email" required value={datos.correo}
                onChange={(evento) => setDatos({ ...datos, correo: evento.target.value })} />
            <div className="mb-3">
                <label htmlFor="registro-region" className="form-label">Región</label>
                <select id="registro-region" className="form-select" value={datos.region}
                    onChange={(evento) => setDatos({ ...datos, region: evento.target.value, comuna: '' })}>
                    <option value="">Seleccione región</option>
                    {Object.keys(regionesComunas).map((region) => <option key={region} value={region}>{region}</option>)}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="registro-comuna" className="form-label">Comuna</label>
                <select id="registro-comuna" className="form-select" value={datos.comuna}
                    onChange={(evento) => setDatos({ ...datos, comuna: evento.target.value })}>
                    <option value="">Seleccione comuna</option>
                    {(regionesComunas[datos.region] ?? []).map((comuna) => <option key={comuna} value={comuna}>{comuna}</option>)}
                </select>
            </div>
            <CampoFormulario id="registro-direccion" etiqueta="Dirección" type="text" required value={datos.direccion}
                onChange={(evento) => setDatos({ ...datos, direccion: evento.target.value })} />
            <CampoFormulario id="registro-clave" etiqueta="Contraseña de ejemplo" type="password" required value={datos.clave}
                onChange={(evento) => setDatos({ ...datos, clave: evento.target.value })} />
            <CampoFormulario id="registro-confirmacion" etiqueta="Confirmar contraseña" type="password" required value={confirmacion}
                onChange={(evento) => setConfirmacion(evento.target.value)} />
            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-dark">Registrarse</button>
                <Link to="/IniciarSesion" className="btn btn-outline-dark">Volver al ingreso</Link>
            </div>
        </form>
    )
}

export default FormularioRegistro
