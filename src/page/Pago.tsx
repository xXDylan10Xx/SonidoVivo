import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/molecule/CampoFormulario'
import Button from '../components/atoms/Boton'
import type { ProductoCarrito } from '../productos'
import type { Usuario } from '../usuarios'

export interface DatosPago {
    nombre: string
    correo: string
    direccion: string
    comuna: string
    entrega: string
    metodo: string
}

function validarDatosPago(datos: DatosPago): string {
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

function crearPedido(datos: DatosPago, carrito: ProductoCarrito[]): Pedido | null {
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

interface PagoProps {
    usuario: Usuario | null
    carrito: ProductoCarrito[]
    onPagoConfirmado: () => void
}

function Pago({ carrito, usuario, onPagoConfirmado }: PagoProps) {
    const navigate = useNavigate()
    const datosAnteriores = useLocation().state as DatosPago | null
    const [datos, setDatos] = useState<DatosPago>(datosAnteriores ?? {
        nombre: usuario ? usuario.nombre + ' ' + usuario.apellidos : '',
        correo: usuario?.correo ?? '',
        direccion: usuario?.direccion ?? '',
        comuna: usuario?.comuna ?? '',
        entrega: 'domicilio',
        metodo: 'tarjeta',
    })
    const [error, setError] = useState('')
    const [simularRechazo, setSimularRechazo] = useState(false)

    const total = carrito.reduce((suma, producto) =>
        suma + producto.precio * producto.cantidad, 0
    )

    function validarPago(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()

        if (carrito.length === 0) {
            setError('Agrega productos al carrito antes de continuar.')
            return
        }

        const mensaje = validarDatosPago(datos)
        setError(mensaje)

        if (mensaje) return

        if (simularRechazo) {
            navigate('/PagoFallido', { state: datos })
            return
        }

        const pedido = crearPedido(datos, carrito)

        if (!pedido) {
            setError('Revisa las cantidades de los productos antes de confirmar el pago.')
            return
        }

        onPagoConfirmado()
        navigate('/Confirmacion', { state: pedido })
    }

    return (
        <section className="container py-4" aria-labelledby="titulo-pago">
            <h1 id="titulo-pago" className="mb-3">Pago</h1>

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
                    <p>Completa tus datos de entrega. Este proceso no realiza cobros.</p>
                    <div className="row g-4">
                        <div className="col-12 col-md-7">
                            <form
                                className="card card-body"
                                onSubmit={validarPago}
                                onChange={() => setError('')}
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
                                        Medio de pago
                                    </label>
                                    <select
                                        id="pago-metodo"
                                        className="form-select"
                                        required
                                        value={datos.metodo}
                                        onChange={(e) => setDatos({ ...datos, metodo: e.target.value })}
                                    >
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="transferencia">Transferencia</option>
                                    </select>
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        id="pago-simular-rechazo"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={simularRechazo}
                                        onChange={(e) => setSimularRechazo(e.target.checked)}
                                    />
                                    <label htmlFor="pago-simular-rechazo" className="form-check-label">
                                        Simular pago rechazado
                                    </label>
                                </div>

                                {error && <p className="alert alert-danger" role="alert">{error}</p>}


                                <div className="d-flex flex-wrap gap-2">
                                    <Button type="submit" texto="Continuar" variante="success" />
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
