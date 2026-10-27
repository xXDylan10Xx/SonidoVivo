import { Link, useLocation } from 'react-router-dom'
import type { Pedido } from '../Datos/pago'

function Confirmacion() {
    const pedido = useLocation().state as Pedido | null

    return (
        <section className="container py-4" aria-labelledby="titulo-confirmacion">
            <h1 id="titulo-confirmacion" className="mb-4">Confirmación de compra</h1>

            {!pedido ? (
                <div className="card card-body">
                    <p>No hay una compra confirmada para mostrar.</p>
                    <Link to="/Productos" className="btn btn-primary align-self-start">
                        Ver productos
                    </Link>
                </div>
            ) : (
                <>
                    <p className="alert alert-success" role="status">
                        Pago de demostración aprobado.
                    </p>
                    <p className="text-break">Gracias por tu compra, {pedido.datos.nombre}.</p>
                    <p className="text-break">Número de pedido: <strong>{pedido.numero}</strong></p>

                    <div className="row g-4 mb-4">
                        <div className="col-12 col-md-6">
                            <div className="card card-body h-100">
                                <h2 className="h4">Resumen de la compra</h2>
                                <ul className="list-group list-group-flush mb-3">
                                    {pedido.productos.map((producto) => (
                                        <li key={producto.id} className="list-group-item px-0">
                                            <p className="mb-1">{producto.nombre} · Cantidad: {producto.cantidad}</p>
                                            <p className="mb-0">
                                                {'$' + (producto.precio * producto.cantidad).toLocaleString('es-CL')}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <p>Medio de pago: {pedido.datos.metodo === 'tarjeta' ? 'Tarjeta' : 'Transferencia'} (simulado)</p>
                                <p className="fw-bold mb-0">
                                    Total pagado (simulado): {'$' + pedido.total.toLocaleString('es-CL')}
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="card card-body h-100">
                                <h2 className="h4">Datos de entrega</h2>
                                <p className="text-break">Correo: {pedido.datos.correo}</p>
                                <p>
                                    Entrega: {pedido.datos.entrega === 'sucursal' ? 'Sucursal Chilexpress' : 'Domicilio'}
                                </p>
                                <p className="text-break">Dirección: {pedido.datos.direccion}</p>
                                <p className="text-break">Comuna: {pedido.datos.comuna}</p>
                                <p className="fw-bold">Despacho incluido</p>
                                <p className="text-break">
                                    Seguimiento de demostración: <strong>{pedido.seguimiento}</strong>
                                </p>
                                <p className="text-muted">
                                    Este código es ficticio y no corresponde a un envío real.
                                </p>
                                <a
                                    href="https://www.chilexpress.cl/estado-envio-paquete-courier"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ir al seguimiento de Chilexpress
                                </a>
                            </div>
                        </div>
                    </div>

                    <Link to="/Productos" className="btn btn-primary">
                        Volver a productos
                    </Link>
                </>
            )}
        </section>
    )
}

export default Confirmacion
