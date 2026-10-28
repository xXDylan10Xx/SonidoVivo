import FormularioLogin from '../components/organism/FormularioLogin'
import type { Usuario } from '../usuarios'
import imagen from '../Imagenes/Inicio/Todo en Guitarras.png'
import '../Estilos/Paginas.css'

interface IniciarSesionProps {
    onIniciarSesion: (usuario: Usuario) => void
}

function IniciarSesion({ onIniciarSesion }: IniciarSesionProps) {
    return (
        <section className="contenido-pagina acceso-pagina">
            <div className="acceso-imagen">
                <img src={imagen} alt="Guitarras Sonido Vivo" />
            </div>
            <div className="acceso-formulario">
                <p className="seccion-marca">SONIDO VIVO</p>
                <h1>Iniciar sesión</h1>
                <p>Acceso de demostración local. Usa datos y contraseñas de ejemplo.</p>
                <FormularioLogin onIniciarSesion={onIniciarSesion} />
            </div>
        </section>
    )
}

export default IniciarSesion