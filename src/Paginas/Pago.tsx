import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import CampoFormulario from '../Componentes/Moleculas/CampoFormulario'
import Button from '../Componentes/Atomos/Boton'
import { validarDatosPago } from '../Datos/pago'
import type { DatosPago } from '../Datos/pago'
import type { ProductoCarrito } from '../Datos/productos'

interface PagoProps {
    carrito: ProductoCarrito[]
}

function Pago({ carrito }: PagoProps) {
    const [datos, setDatos] = useState<DatosPago>({
        nombre: '',
        correo: '',
        direccion: '',
        comuna: '',
        entrega: 'domicilio',
        metodo: 'tarjeta',
    })
    const [error, setError] = useState('')
    const [validado, setValidado] = useState(false)

    const total = carrito.reduce((suma, producto) =>
        suma + producto.precio * producto.cantidad, 0
    )

    function validarPago(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        setValidado(false)

        if (carrito.length === 0) {
            setError('Agrega productos al carrito antes de continuar.')
            return
        }

        const mensaje = validarDatosPago(datos)
        setError(mensaje)

        if (mensaje) return

        setValidado(true)
    }

    return (
        <section className="container py-4" aria-labelledby="titulo-pago">
            <h1 id="titulo-pago" className="mb-3">Pago de demostración</h1>

            {carrito.length === 0 ? (
                <div className="card">
                    <div className="card-body">
                        <p>Agrega productos al carrito antes de continuar al pago.</p>
                        <Link to="/Productos" className="btn btn-primary">
                            Ver productos
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <p>Completa tus datos de entrega. Esta simulación no realiza cobros.</p>
                    <div className="row g-4">
                        <div className="col-12 col-md-7">
                            <form
                                className="card card-body"
                                onSubmit={validarPago}
                                onChange={() => {
                                    setError('')
                                    setValidado(false)
                                }}
                                noValidate
                            >
                                <h2 className="h4">Datos del cliente y entrega</h2>
                                <CampoFormulario
                                    id="pago-nombre"
                                    etiqueta="Nombre completo"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={datos.nombre}
                                    onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                                />
                                <CampoFormulario
                                    id="pago-correo"
                                    etiqueta="Correo electrónico"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={datos.correo}
                                    onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
                                />

                                <div className="mb-3">
                                    <label htmlFor="pago-entrega" className="form-label">
                                        Forma de entrega
                                    </label>
                                    <select
                                        id="pago-entrega"
                                        className="form-select"
                                        required
                                        value={datos.entrega}
                                        onChange={(e) => setDatos({ ...datos, entrega: e.target.value })}
                                    >
                                        <option value="domicilio">Envío a domicilio</option>
                                        <option value="sucursal">Envío a sucursal Chilexpress</option>
                                    </select>
                                </div>

                                <CampoFormulario
                                    id="pago-direccion"
                                    etiqueta={datos.entrega === 'sucursal' ? 'Dirección de la sucursal' : 'Dirección de envío'}
                                    type="text"
                                    autoComplete="street-address"
                                    required
                                    value={datos.direccion}
                                    onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
                                />
                                <CampoFormulario
                                    id="pago-comuna"
                                    etiqueta="Comuna"
                                    type="text"
                                    autoComplete="address-level3"
                                    required
                                    value={datos.comuna}
                                    onChange={(e) => setDatos({ ...datos, comuna: e.target.value })}
                                />

                                <div className="mb-3">
                                    <label htmlFor="pago-metodo" className="form-label">
                                        Medio de pago de demostración
                                    </label>
                                    <select
                                        id="pago-metodo"
                                        className="form-select"
                                        required
                                        value={datos.metodo}
                                        onChange={(e) => setDatos({ ...datos, metodo: e.target.value })}
                                    >
                                        <option value="tarjeta">Tarjeta (simulación)</option>
                                        <option value="transferencia">Transferencia (simulación)</option>
                                    </select>
                                </div>

                                {error && <p className="alert alert-danger" role="alert">{error}</p>}
                                {validado && (
                                    <p className="alert alert-success" role="status">
                                        Los datos de tu compra son válidos.
                                    </p>
                                )}

                                <div className="d-flex flex-wrap gap-2">
                                    <Button type="submit" texto="Validar datos de pago" variante="success" />
                                    <Link to="/Carrito" className="btn btn-outline-primary">
                                        Volver al carrito
                                    </Link>
                                </div>
                            </form>
                        </div>

                        <div className="col-12 col-md-5">
                            <aside className="card card-body" aria-labelledby="resumen-pago">
                                <h2 id="resumen-pago" className="h4">Resumen de la compra</h2>
                                <ul className="list-group list-group-flush mb-3">
                                    {carrito.map((producto) => (
                                        <li key={producto.id} className="list-group-item px-0">
                                            <p className="mb-1">{producto.nombre} · Cantidad: {producto.cantidad}</p>
                                            <p className="mb-0">
                                                {'$' + (producto.precio * producto.cantidad).toLocaleString('es-CL')}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <p>Despacho incluido</p>
                                <p className="fw-bold mb-0">
                                    Total: {'$' + total.toLocaleString('es-CL')}
                                </p>
                            </aside>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Pago
