import { Link } from 'react-router-dom'
import guitarra from '../Imagenes/CatalogoImages/GA001-front.png'
import microfono from '../Imagenes/CatalogoImages/MI001-front.png'
import '../Estilos/Paginas.css'

function Blog() {
    return (
        <section className="contenido-pagina blog">
            <header className="encabezado-pagina">
                <p className="seccion-marca">SONIDO VIVO / BLOG</p>
                <h1>La música también se aprende</h1>
                <p>Consejos para disfrutar, elegir y cuidar tus instrumentos.</p>
            </header>
            <div className="blog-tarjetas">
                <article className="blog-tarjeta">
                    <img src={guitarra} alt="Guitarra acústica" />
                    <div className="blog-tarjeta-texto">
                        <p className="seccion-marca">CUIDADO DE INSTRUMENTOS</p>
                        <h2>Cómo cuidar tu guitarra</h2>
                        <p>Algunos consejos básicos para mantener tu guitarra limpia y en buenas condiciones.</p>
                        <Link to="/Blog/guitarra" className="btn btn-primary">Leer artículo</Link>
                    </div>
                </article>
                <article className="blog-tarjeta">
                    <img src={microfono} alt="Micrófono para música" />
                    <div className="blog-tarjeta-texto">
                        <p className="seccion-marca">GUÍA PARA COMENZAR</p>
                        <h2>Consejos para elegir tu primer instrumento</h2>
                        <p>Conoce algunas ideas que te ayudarán a elegir tu primer instrumento.</p>
                        <Link to="/Blog/instrumento" className="btn btn-primary">Leer artículo</Link>
                    </div>
                </article>
            </div>
        </section>
    )
}

export function BlogGuitarra() {
    return (
        <article className="contenido-pagina articulo-blog">
            <Link to="/Blog" className="enlace-volver">Volver al blog</Link>
            <header className="encabezado-pagina"><p className="seccion-marca">CUIDADO DE INSTRUMENTOS</p><h1>Cómo cuidar tu guitarra</h1></header>
            <div className="articulo-contenido">
                <img src={guitarra} alt="Guitarra acústica" />
                <div>
                    <p>Una guitarra necesita algunos cuidados básicos para mantenerse en buenas condiciones y conservar su sonido.</p>
                    <h2>Limpieza</h2>
                    <p>Después de tocar, limpia las cuerdas y el cuerpo con un paño suave para eliminar el polvo, la humedad y la suciedad.</p>
                    <h2>Guardar correctamente</h2>
                    <p>Guarda tu guitarra en un lugar seguro y evita exponerla directamente al sol o a lugares con mucha humedad.</p>
                    <h2>Revisar las cuerdas</h2>
                    <p>Si las cuerdas están oxidadas o el sonido ha cambiado, puede ser momento de reemplazarlas.</p>
                </div>
            </div>
        </article>
    )
}

export function BlogInstrumento() {
    return (
        <article className="contenido-pagina articulo-blog">
            <Link to="/Blog" className="enlace-volver">Volver al blog</Link>
            <header className="encabezado-pagina"><p className="seccion-marca">GUÍA PARA COMENZAR</p><h1>Consejos para elegir tu primer instrumento</h1></header>
            <div className="articulo-contenido">
                <img src={microfono} alt="Micrófono para música" />
                <div>
                    <p>Elegir un instrumento por primera vez puede ser complicado cuando existen muchas alternativas.</p>
                    <h2>Piensa qué música te gusta</h2>
                    <p>Tus gustos musicales pueden ayudarte a decidir. Si te gusta tocar acordes y acompañar canciones, una guitarra puede ser una buena alternativa.</p>
                    <h2>Considera tu presupuesto</h2>
                    <p>Hay alternativas para principiantes que permiten aprender antes de invertir en un equipo más avanzado.</p>
                    <h2>Prueba diferentes instrumentos</h2>
                    <p>Si tienes la oportunidad, prueba diferentes opciones y elige aquella con la que te sientas más cómodo.</p>
                </div>
            </div>
        </article>
    )
}

export default Blog