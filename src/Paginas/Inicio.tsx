import { useState } from 'react'
import { Link } from 'react-router-dom'
import producto1 from '../Imagenes/CatalogoImages/GA001-front.png'
import producto50 from '../Imagenes/CatalogoImages/ES004-front.png'
import producto29 from '../Imagenes/CatalogoImages/MI003-front.png'
import producto13 from '../Imagenes/CatalogoImages/BA003-front-1254x1254.png'
import producto14 from '../Imagenes/CatalogoImages/BT001-front.png'
import producto34 from '../Imagenes/CatalogoImages/PE004-front.png'
import producto30 from '../Imagenes/CatalogoImages/MI004-front.png'
import '../Estilos/Inicio.css'
import imagenInicio from '../Imagenes/Inicio/Imagen Inicio.png'
import novedades from '../Imagenes/Inicio/Novedades.png'
import bajos from '../Imagenes/Inicio/Todo en Bajos.png'
import baterias from '../Imagenes/Inicio/Todo en Baterias.png'
import guitarras from '../Imagenes/Inicio/Todo en Guitarras.png'
import microfonos from '../Imagenes/Inicio/Todo en Microfonos.png'
import instagram from '../Imagenes/Contacto/InstagramBanner.png'
import whatsapp from '../Imagenes/Contacto/WhatsappBanner.png'
import facebook from '../Imagenes/Contacto/FacebookBanner.png'

const productosNovedad = [
    { id: 1, nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", precio: 129990, imagen: producto1 },
    { id: 50, nombre: "Monitor de Estudio 5", marca: "Yamaha", modelo: "HS5", precio: 349990, imagen: producto50 },
    { id: 29, nombre: "Micrófono Condensador", marca: "Audio-Technica", modelo: "AT2020", precio: 199990, imagen: producto29 },
    { id: 13, nombre: "Bajo Acústico 4 Cuerdas", marca: "Yamaha", modelo: "APX700II", precio: 429990, imagen: producto13 },
    { id: 14, nombre: "Batería Acústica 5 Piezas", marca: "Pearl", modelo: "Roadshow", precio: 599990, imagen: producto14 },
    { id: 34, nombre: "Pedal Afinador Cromático", marca: "Boss", modelo: "TU-3", precio: 89990, imagen: producto34 },
    { id: 30, nombre: "Micrófono USB de Condensador", marca: "Blue", modelo: "Yeti", precio: 299990, imagen: producto30 },
]

const gruposNovedades = [productosNovedad.slice(0, 4), productosNovedad.slice(4)]

function Inicio() {
    const [grupoActivo, setGrupoActivo] = useState(0)
    return (

    <main className="fondo-pagina pagina-inicio ">
    
    <section className="seccion-pagina">
        <div > 
            <img className="imagen-inicio imagen-completa" src={imagenInicio} alt="Sonido Vivo" />
        </div>

    </section>

    <section id="novedades" className="seccion-pagina seccion-blanca ">
        

        <h2 className="titulo-seccion">Novedades</h2>

        <div className="contenedor-novedades fila-contenido">

            <div className="portada-novedades">
                <img className="imagen-portada" src={novedades} alt="Novedades Sonido Vivo" />
            </div>

            <div id="carouselNovedades" className="carousel slide carrusel-novedades">
                
                <div className="carousel-inner" id="listaProductosNovedad" aria-live="polite">
                    {gruposNovedades.map((grupo, indice) => (
                        <div key={indice} className={indice === grupoActivo ? 'carousel-item active' : 'carousel-item'}>
                            <div className="grupo-tarjetas">
                                {grupo.map((producto) => (
                                    <div key={producto.id} className="card tarjeta-producto tarjeta-novedad rejilla-novedad">
                                        <img src={producto.imagen} className="card-img-top imagen-novedad imagen-completa" alt={producto.nombre} />
                                        <div className="card-body contenido-novedad rejilla-novedad">
                                            <h6 className="marca-novedad elemento-novedad">{producto.marca}</h6>
                                            <h5 className="card-title elemento-novedad">{producto.nombre}</h5>
                                            <p className="modelo-novedad elemento-novedad">{producto.modelo}</p>
                                            <p className="precio-novedad elemento-novedad">{producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })}</p>
                                            <Link className="btn btn-dark boton-novedad elemento-novedad" to={'/Productos?id=' + producto.id}>
                                                Ver producto
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

                <button
                    className="carousel-control-prev control-carrusel control-anterior"
                    type="button"
                    onClick={() => setGrupoActivo((actual) => (actual - 1 + gruposNovedades.length) % gruposNovedades.length)}
                >
                    <span className="carousel-control-prev-icon icono-carrusel" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>

                <button
                    className="carousel-control-next control-carrusel control-siguiente"
                    type="button"
                    onClick={() => setGrupoActivo((actual) => (actual + 1) % gruposNovedades.length)}
                >
                    <span className="carousel-control-next-icon icono-carrusel" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>

            </div>
        </div>
    </section>

    <br />



        <br />
        <section  className="seccion-pagina">
            <div className="contenedor">

                <a className="enlace-categoria" href="/Productos?categoria=Bajos%20El%C3%A9ctricos" aria-label="Ver todo en Bajos"><img className="imagen-producto-categoria manito bordes-imagen" src={bajos} alt="Todo en Bajos" /></a>
                <a className="enlace-categoria" href="/Productos?categoria=Bater%C3%ADas" aria-label="Ver todo en Baterias"><img className="imagen-producto-categoria manito bordes-imagen" src={baterias} alt="Todo en Baterias" /></a>
                <a className="enlace-categoria" href="/Productos?categoria=Guitarras%20Ac%C3%BAsticas&amp;categoria=Guitarras%20El%C3%A9ctricas" aria-label="Ver todo en Guitarras"><img className="imagen-producto-categoria manito bordes-imagen" src={guitarras} alt="Todo en Guitarras" /></a>
                <a className="enlace-categoria" href="/Productos?categoria=Micr%C3%B3fonos" aria-label="Ver todo en Microfonos"><img className="imagen-producto-categoria manito bordes-imagen" src={microfonos} alt="Todo en Microfonos" /></a>

            </div>

        </section>

        <br />

        

        <section id="contacto" className="seccion-pagina seccion-blanca">
            <h2 className="titulo-seccion">
                Donde nos puedes encontrar 
            </h2>
            <div className="detalle-contenido contacto-redes fila-contenido">
                <a
                    href="https://www.instagram.com/sonido_.vivo/"
                    target="_blank" rel="noopener noreferrer"
                >

                <img
                    className="imagen-producto imagen-contacto bordes-imagen imagen-completa"
                    src={instagram}
                    alt="Instagram Sonido Vivo"
                     />

                </a>
                <a
                    href="https://wa.me/56900000000"
                    target="_blank" rel="noopener noreferrer"
                    >
                <img
                    className="imagen-producto imagen-contacto bordes-imagen imagen-completa"
                    src={whatsapp}
                    alt="WhatsApp Sonido Vivo — número de ejemplo"
                     />
                </a>

                <a
                    href="https://www.facebook.com/profile.php?id=100057384885975"
                    target="_blank" rel="noopener noreferrer"
                >

                <img
                        className="imagen-producto imagen-contacto bordes-imagen imagen-completa"
                        src={facebook}
                        alt="Facebook Sonido Vivo"
                     />

                </a>


                <br/>

                </div>

    </section>

    </main>
    )
}

export default Inicio



