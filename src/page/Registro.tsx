import FormularioRegistro from '../components/organism/FormularioRegistro'
import '../Estilos/Inicio.css'

function Registro() {
    return (
        <section className="sv-panel auth-pagina">
            <h1 className="sv-titulo">Registro</h1>
            <p>Registro de demostración local. Usa datos y contraseñas de ejemplo.</p>
            <FormularioRegistro />
        </section>
    )
}

export default Registro
