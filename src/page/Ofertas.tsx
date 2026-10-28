import { Link } from 'react-router-dom'
import CardProducto from '../components/molecule/CardProducto'
import type { Producto, ProductoCarrito } from '../productos'
import '../Estilos/Paginas.css'
import '../Estilos/Catalogo.css'

interface OfertasProps {
    productos: Producto[]
    carrito: ProductoCarrito[]
    onAgregarProducto: (producto: Producto) => void
}

function Ofertas({ productos, carrito, onAgregarProducto }: OfertasProps) {
    const ofertas = productos.filter((producto) => producto.precioAnterior !== undefined)

    return (
        <section className="contenido-pagina">
            <header className="encabezado-pagina">
                <p className="seccion-marca">SONIDO VIVO / PRODUCTOS</p>
                <h1>Ofertas</h1>
                <p>Encuentra instrumentos seleccionados con 10 % de descuento.</p>
            </header>
            <div className="catalogo-orden">
                {ofertas.map((producto) => (
                    <CardProducto key={producto.id} producto={producto}
                        cantidad={carrito.find((item) => item.id === producto.id)?.cantidad ?? 0}
                        onAgregarProducto={onAgregarProducto} />
                ))}
                {ofertas.length === 0 && <p>No hay ofertas disponibles por el momento.</p>}
            </div>
            <Link className="btn btn-outline-primary mt-4" to="/Productos">Ver todos los productos</Link>
        </section>
    )
}

export default Ofertas