import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Producto } from '../productos'
import Nosotros from '../components/organism/Nosotros'
import imagenInicio from '../Imagenes/Inicio/Imagen Inicio.png'
import portadaNovedades from '../Imagenes/Inicio/Novedades.png'
import bajos from '../Imagenes/Inicio/Todo en Bajos.png'
import baterias from '../Imagenes/Inicio/Todo en Baterias.png'
import guitarras from '../Imagenes/Inicio/Todo en Guitarras.png'
import microfonos from '../Imagenes/Inicio/Todo en Microfonos.png'
import '../Estilos/Inicio.css'

const codigosNovedades = ['GA001', 'ES004', 'MI003', 'BA003', 'BT001', 'PE004', 'MI004']
function Inicio({ productos }: { productos: Producto[] }) {
    const novedades = codigosNovedades
        .map((codigo) => productos.find((producto) => producto.id === codigo))
        .filter((producto) => producto !== undefined)
    const grupos = [novedades.slice(0, 4), novedades.slice(4)]
    const [grupoActivo, setGrupoActivo] = useState(0)

    return (
        <div className="pagina-inicio">
            <h1 className="visually-hidden">SonidoVivo</h1>
            <img className="inicio-portada" src={imagenInicio} alt="SonidoVivo" />

            <section className="sv-panel" aria-labelledby="titulo-novedades">
                <h2 id="titulo-novedades" className="sv-titulo">Novedades</h2>
                <div className="novedades-contenido">
                    <img className="novedades-portada" src={portadaNovedades} alt="Novedades SonidoVivo" />
                    <div className="novedades-carrusel">
                        <div className="novedades-grupo" aria-live="polite">
                            {grupos[grupoActivo].map((producto) => (
                                <article className="card novedad" key={producto.id}>
                                    <Link to={'/Productos/' + producto.id}>
                                        <img src={producto.imagen} alt={producto.nombre} />
                                    </Link>
                                    <div className="card-body">
                                        <p className="fw-bold mb-2">{producto.marca}</p>
                                        <h3 className="h6">{producto.nombre}</h3>
                                        <p>{producto.modelo}</p>
                                        <p className="novedad-precio">{'$' + producto.precio.toLocaleString('es-CL')}</p>
                                        <Link className="btn btn-dark" to={'/Productos/' + producto.id}>Ver producto</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="novedades-controles">
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => setGrupoActivo((grupoActivo + grupos.length - 1) % grupos.length)}
                            >
                                Anterior
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => setGrupoActivo((grupoActivo + 1) % grupos.length)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Nosotros />

            <section className="categorias-inicio" aria-label="Categorías de productos">
                <Link to="/Productos?categoria=Bajos%20El%C3%A9ctricos"><img src={bajos} alt="Todo en bajos" /></Link>
                <Link to="/Productos?categoria=Bater%C3%ADas"><img src={baterias} alt="Todo en baterías" /></Link>
                <Link to="/Productos?categoria=Guitarras%20Ac%C3%BAsticas&categoria=Guitarras%20El%C3%A9ctricas"><img src={guitarras} alt="Todo en guitarras" /></Link>
                <Link to="/Productos?categoria=Micr%C3%B3fonos"><img src={microfonos} alt="Todo en micrófonos" /></Link>
            </section>
        </div>
    )
}

export default Inicio
