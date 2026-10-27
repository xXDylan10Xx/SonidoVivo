import { Link, useLocation } from 'react-router-dom'
import type { DatosPago } from '../Datos/pago'

function PagoFallido() {
    const datos = useLocation().state as DatosPago | null

    return (
        <section className="container py-4" aria-labelledby="titulo-pago-fallido">
            <h1 id="titulo-pago-fallido" className="mb-4">Resultado del pago</h1>

            <div className="card card-body">
                {!datos ? (
                    <>
                        <p>No hay un intento de pago para mostrar.</p>
                        <Link to="/Carrito" className="btn btn-primary align-self-start">
                            Ver carrito
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="alert alert-danger" role="alert">
                            El pago de demostración fue rechazado.
                        </p>
                        <p>Esta simulación no realiza cobros y conserva los productos del carrito.</p>
                        <p>Puedes volver a intentarlo o revisar tu carrito.</p>
                        <div className="d-flex flex-wrap gap-2">
                            <Link to="/Pago" state={datos} className="btn btn-primary">
                                Reintentar pago
                            </Link>
                            <Link to="/Carrito" className="btn btn-outline-primary">
                                Volver al carrito
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default PagoFallido
