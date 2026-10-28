import { Link } from 'react-router-dom'
import type { Producto } from '../../productos'

interface CardProductoProps {
    producto: Producto
    cantidad: number
    onAgregarProducto: (producto: Producto) => void
}

function CardProducto({ producto, cantidad, onAgregarProducto }: CardProductoProps) {
    return (
        <article className="card tarjeta-catalogo">
            <Link to={'/Productos/' + producto.id}>
                <img src={producto.imagen} className="imagen-catalogo" alt={producto.nombre} loading="lazy" />
            </Link>
            <div className="card-body contenido-catalogo">
                <h2 className="h6">{producto.marca}</h2>
                <h3 className="h5 titulo-producto">
                    <Link to={'/Productos/' + producto.id} className="nombre-producto">
                        {producto.nombre} {producto.modelo}
                    </Link>
                </h3>
                <p>{producto.descripcion}</p>
                {producto.precioAnterior !== undefined && <p className="precio-anterior">Antes: <del>{'$' + producto.precioAnterior.toLocaleString('es-CL')}</del></p>}
                <p className="precio-catalogo">{producto.precioAnterior !== undefined ? 'Oferta: ' : 'Precio: '}{'$' + producto.precio.toLocaleString('es-CL')}</p>
                <p>Stock: {producto.stock} · En el carrito: {cantidad}</p>
                <button
                    type="button"
                    className="btn btn-outline-dark boton-catalogo"
                    disabled={cantidad >= producto.stock}
                    onClick={() => onAgregarProducto(producto)}
                >
                    Agregar al carrito
                </button>
            </div>
        </article>
    )
}

export default CardProducto
