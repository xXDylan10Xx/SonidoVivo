import { useState } from 'react'
import type { FormEvent } from 'react'
import CampoFormulario from '../Componentes/Moleculas/CampoFormulario'
import Button from '../Componentes/Atomos/Boton'
import { validarDatosContacto } from '../Datos/contacto'
import type { DatosContacto } from '../Datos/contacto'

function Contacto() {
    const [datos, setDatos] = useState<DatosContacto>({
        nombre: '',
        correo: '',
        mensaje: '',
    })
    const [error, setError] = useState('')
    const [enviado, setEnviado] = useState(false)

    function enviarMensaje(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setEnviado(false)

        const mensajeError = validarDatosContacto(datos)
        setError(mensajeError)

        if (mensajeError) return

        setDatos({ nombre: '', correo: '', mensaje: '' })
        setEnviado(true)
    }

    return (
        <section className="container py-4" aria-labelledby="titulo-contacto">
            <h1 id="titulo-contacto" className="mb-3">Contacto</h1>
            <p>El envío de este formulario es una simulación.</p>

            <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
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
                            value={datos.nombre}
                            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                        />
                        <CampoFormulario
                            id="contacto-correo"
                            etiqueta="Correo electrónico"
                            type="email"
                            autoComplete="email"
                            required
                            value={datos.correo}
                            onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
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
                                value={datos.mensaje}
                                onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
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
                </div>
            </div>
        </section>
    )
}

export default Contacto
