import FormularioContacto from '../components/organism/FormularioContacto'
import imagen from '../Imagenes/Inicio/Todo en Microfonos.png'
import '../Estilos/Paginas.css'

function Contacto() {
    return (
        <section className="contenido-pagina" aria-labelledby="titulo-contacto">
            <header className="encabezado-pagina">
                <p className="seccion-marca">SONIDO VIVO / CONTACTO</p>
                <h1 id="titulo-contacto">Hablemos de música</h1>
                <p>¿Tienes una consulta sobre nuestros instrumentos? Escríbenos.</p>
            </header>
            <div className="contacto-contenido">
                <div>
                    <h2>Envíanos un mensaje</h2>
                    <p>El envío de este formulario es una simulación.</p>
                    <FormularioContacto />
                </div>
                <div className="contacto-imagen">
                    <img src={imagen} alt="Micrófonos Sonido Vivo" />
                </div>
            </div>
        </section>
    )
}

export default Contacto