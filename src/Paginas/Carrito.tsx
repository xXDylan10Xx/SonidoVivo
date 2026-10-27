import { Link } from 'react-router-dom'

function Carrito() {
    return (
        <section className="container py-4" aria-labelledby="titulo-carrito">
            <h1 id="titulo-carrito" className="mb-4">Mi carrito</h1>

            <div className="card">
                <div className="card-body text-center py-5">
                    <h2 className="h4">Tu carrito está vacío</h2>
                    <p>Agrega productos para comenzar tu compra.</p>
                    <Link to="/Productos" className="btn btn-primary">
                        Ver productos
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Carrito
