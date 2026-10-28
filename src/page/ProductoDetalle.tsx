import { Link, useParams } from 'react-router-dom'

import type { Producto, ProductoCarrito } from '../productos'

interface ProductoDetalleProps {
    productos: Producto[]
    carrito: ProductoCarrito[]
    onAgregarProducto: (producto: Producto) => void
}

function ProductoDetalle({ productos, carrito, onAgregarProducto }: ProductoDetalleProps) {
    const { id } = useParams()
    const producto = productos.find((item) => item.id === id || String(item.catalogoId) === id)

    if (!producto) {
        return (
            <section className="container py-4">
                <h1>Producto no encontrado</h1>
                <Link to="/Productos" className="btn btn-dark">Volver a productos</Link>
            </section>
        )
    }

    const cantidad = carrito.find((item) => item.id === producto.id)?.cantidad ?? 0

    return (
        <section className="container py-4">
            <Link to="/Productos" className="btn btn-outline-dark mb-4">Volver a productos</Link>
            <div className="card p-4">
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-md-5 text-center">
                        <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-7">
                        <h1>{producto.nombre}</h1>
                        <p>{producto.marca} · {producto.modelo}</p>
                        <p>{producto.descripcion}</p>
                        <p>Categoría: {producto.categoria}</p>
                        <p>Stock: {producto.stock} · En el carrito: {cantidad}</p>
                        {producto.precioAnterior !== undefined && <p>Antes: <del>{'$' + producto.precioAnterior.toLocaleString('es-CL')}</del></p>}
                        <p className="h4">{'$' + producto.precio.toLocaleString('es-CL')}</p>
                        <button
                            type="button"
                            className="btn btn-dark mt-3 me-2"
                            disabled={cantidad >= producto.stock}
                            onClick={() => onAgregarProducto(producto)}
                        >
                            Agregar al carrito
                        </button>
                        <Link to="/Carrito" className="btn btn-outline-dark mt-3">Ver carrito</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductoDetalle
