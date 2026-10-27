import { Link } from 'react-router-dom'
import Button from '../Componentes/Atomos/Boton'
import { productos } from '../Datos/productos'
import type { Producto, ProductoCarrito } from '../Datos/productos'

interface ProductosProps {
    carrito: ProductoCarrito[]
    onAgregarProducto: (producto: Producto) => void
}

function Productos({ carrito, onAgregarProducto }: ProductosProps) {
    return (
        <section className="container py-4" aria-labelledby="titulo-productos">
            <h1 id="titulo-productos">Productos</h1>
            <p>Productos de ejemplo para probar el carrito.</p>
            <Link to="/Carrito" className="btn btn-outline-primary mb-4">
                Ver carrito
            </Link>

            <div className="row g-3">
                {productos.map((producto) => {
                    const cantidad = carrito.find((item) => item.id === producto.id)?.cantidad ?? 0

                    return (
                        <div className="col-12 col-md-6" key={producto.id}>
                            <article className="card h-100">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="card-img-top object-fit-contain"
                                    height={200}
                                />
                                <div className="card-body">
                                    <h2 className="h4">{producto.nombre}</h2>
                                    <p>Precio: {'$' + producto.precio.toLocaleString('es-CL')}</p>
                                    <p>Stock: {producto.stock} unidades</p>
                                    <p>En el carrito: {cantidad}</p>
                                    <Button
                                        texto="Agregar al carrito"
                                        onClick={() => onAgregarProducto(producto)}
                                        disabled={cantidad >= producto.stock}
                                    />
                                </div>
                            </article>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Productos
