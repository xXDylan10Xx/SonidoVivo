import { useState } from 'react'
import type { FormEvent } from 'react'
import CampoFormulario from '../molecule/CampoFormulario'
import Button from '../atoms/Boton'

function FormularioContacto() {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')
    const [enviado, setEnviado] = useState(false)

    function enviarMensaje(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setEnviado(false)

        if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
            setError('Debes completar nombre, correo y mensaje.')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            setError('Ingresa un correo electrónico válido.')
            return
        }

        setError('')
        setNombre('')
        setCorreo('')
        setMensaje('')
        setEnviado(true)
    }

    return (
        <form
            className="card card-body"
            onSubmit={enviarMensaje}
            onChange={() => {
                setError('')
                setEnviado(false)
            }}
            aria-describedby={error ? 'error-contacto' : undefined}
            noValidate
        >
            <p>Todos los campos son obligatorios.</p>
            <CampoFormulario
                id="contacto-nombre"
                etiqueta="Nombre"
                type="text"
                autoComplete="name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <CampoFormulario
                id="contacto-correo"
                etiqueta="Correo electrónico"
                type="email"
                autoComplete="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />

            <div className="mb-3">
                <label htmlFor="contacto-mensaje" className="form-label">
                    Mensaje
                </label>
                <textarea
                    id="contacto-mensaje"
                    className="form-control"
                    rows={5}
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
            </div>

            {error && (
                <p id="error-contacto" className="alert alert-danger" role="alert">
                    {error}
                </p>
            )}
            {enviado && (
                <p className="alert alert-success" role="status">
                    Mensaje enviado correctamente (simulación).
                </p>
            )}

            <div>
                <Button type="submit" texto="Enviar mensaje" />
            </div>
        </form>
    )
}

export default FormularioContacto
