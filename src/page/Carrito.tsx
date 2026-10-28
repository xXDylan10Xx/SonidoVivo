import { Link } from 'react-router-dom'
import Button from '../components/atoms/Boton'
import type { ProductoCarrito } from '../productos'

interface CarritoProps {
    carrito: ProductoCarrito[]
    onCambiarCantidad: (id: string, cantidad: number) => void
    onEliminarProducto: (id: string) => void
}

function Carrito({ carrito, onCambiarCantidad, onEliminarProducto }: CarritoProps) {
    const subtotal = carrito.reduce((suma, producto) =>
        suma + producto.precio * producto.cantidad, 0
    )
    const total = subtotal
    return (
        <section className="container py-4" aria-labelledby="titulo-carrito">
            <h1 id="titulo-carrito" className="mb-4">Mi carrito</h1>

            {carrito.length === 0 ? (
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h2 className="h4">Tu carrito está vacío</h2>
                        <p>Agrega productos para comenzar tu compra.</p>
                        <Link to="/Productos" className="btn btn-primary">
                            Ver productos
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {carrito.map((producto) => (
                            <li
                                key={producto.id}
                                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
                            >
                                <div>
                                    <h2 className="h5">{producto.nombre}</h2>
                                    <p className="mb-0">
                                        Precio unitario: {'$' + producto.precio.toLocaleString('es-CL')}
                                    </p>
                                    <p className="mb-0">
                                        Subtotal: {'$' + (producto.precio * producto.cantidad).toLocaleString('es-CL')}
                                    </p>
                                </div>

                                <div className="d-flex flex-wrap align-items-center gap-2">
                                    <Button
                                        texto="−"
                                        variante="secondary"
                                        aria-label={'Disminuir cantidad de ' + producto.nombre}
                                        disabled={producto.cantidad <= 1}
                                        onClick={() => onCambiarCantidad(producto.id, producto.cantidad - 1)}
                                    />
                                    <span>Cantidad: {producto.cantidad}</span>
                                    <Button
                                        texto="+"
                                        variante="secondary"
                                        aria-label={'Aumentar cantidad de ' + producto.nombre}
                                        disabled={producto.cantidad >= producto.stock}
                                        onClick={() => onCambiarCantidad(producto.id, producto.cantidad + 1)}
                                    />
                                    <Button
                                        texto="Eliminar"
                                        variante="danger"
                                        aria-label={'Eliminar ' + producto.nombre}
                                        onClick={() => onEliminarProducto(producto.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="card mb-4" aria-labelledby="titulo-resumen">
                        <div className="card-body">
                            <h2 id="titulo-resumen" className="h4">Resumen de la compra</h2>
                            <dl className="mb-0">
                                <div className="d-flex flex-wrap justify-content-between gap-2">
                                    <dt>Subtotal</dt>
                                    <dd>{'$' + subtotal.toLocaleString('es-CL')}</dd>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between gap-2">
                                    <dt>Despacho</dt>
                                    <dd>Incluido</dd>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between gap-2 border-top pt-2">
                                    <dt>Total</dt>
                                    <dd className="fw-bold" aria-live="polite">
                                        {'$' + total.toLocaleString('es-CL')}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/Productos" className="btn btn-outline-primary">
                            Seguir comprando
                        </Link>
                        <Link to="/Pago" className="btn btn-success">
                            Ir al pago
                        </Link>
                    </div>
                </>
            )}
        </section>
    )
}

export default Carrito
