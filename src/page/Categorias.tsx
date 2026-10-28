import { Link } from 'react-router-dom'
import type { Producto } from '../productos'
import '../Estilos/Paginas.css'

function Categorias({ productos }: { productos: Producto[] }) {
    const categorias = [...new Set(productos.map((producto) => producto.categoria))]
    return (
        <section className="contenido-pagina">
            <header className="encabezado-pagina">
                <p className="seccion-marca">SONIDO VIVO / PRODUCTOS</p>
                <h1>Categorías</h1>
                <p>Encuentra instrumentos y equipos según su categoría.</p>
            </header>
            <div className="row g-3">
                {categorias.map((categoria) => (
                    <div className="col-12 col-md-6 col-lg-4" key={categoria}>
                        <Link className="card card-body text-decoration-none h-100" to={'/Productos?categoria=' + encodeURIComponent(categoria)}>
                            <strong>{categoria}</strong>
                            <span>Ver productos</span>
                        </Link>
                    </div>
                ))}
            </div>
            {categorias.length === 0 && <p>No hay categorías disponibles.</p>}
        </section>
    )
}
export default Categorias