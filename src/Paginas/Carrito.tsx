import { Link } from 'react-router-dom'
import Button from '../Componentes/Atomos/Boton'
import type { ProductoCarrito } from '../Datos/productos'

interface CarritoProps {
    carrito: ProductoCarrito[]
    onCambiarCantidad: (id: string, cantidad: number) => void
    onEliminarProducto: (id: string) => void
}

function Carrito({ carrito, onCambiarCantidad, onEliminarProducto }: CarritoProps) {
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

                    <Link to="/Productos" className="btn btn-outline-primary">
                        Seguir comprando
                    </Link>
                </>
            )}
        </section>
    )
}

export default Carrito
