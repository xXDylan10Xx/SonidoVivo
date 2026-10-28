import equipo from '../../Imagenes/Equipo/trabajadores.png'
import '../../Estilos/Inicio.css'

function Nosotros() {
    return (
        <section id="nosotros" className="sv-panel" aria-labelledby="titulo-nosotros">
            <h2 id="titulo-nosotros" className="sv-titulo">¿Quiénes somos?</h2>
            <div className="nosotros-contenido">
                <img src={equipo} alt="Equipo de SonidoVivo" />
                <div className="nosotros-texto">
                    <p>En Sonido Vivo llevamos más de 11 años acercando la música a nuestros clientes desde Viña del Mar.</p>
                    <p>Somos una tienda especializada en instrumentos musicales, equipos de sonido y accesorios: guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales y mucho más.</p>
                    <p>Nuestro equipo está formado por el dueño de la tienda y dos vendedores, quienes entregan una atención cercana y ayudan a cada cliente a encontrar el instrumento o equipo que necesita.</p>
                    <p>Además de la venta de productos, contamos con servicio de reparación de instrumentos de cuerda.</p>
                    <p>Nuestro objetivo es que músicos principiantes y experimentados encuentren un lugar confiable para desarrollar su pasión por la música.</p>
                </div>
            </div>
        </section>
    )
}

export default Nosotros
