import CardProducto from '../Componentes/Moleculas/CardProducto'
import imagenProducto1 from '../Imagenes/CatalogoImages/GA001-front.png'
import imagenProducto2 from '../Imagenes/CatalogoImages/GA002-front.png'
import imagenProducto3 from '../Imagenes/CatalogoImages/GA003-front.png'
import imagenProducto4 from '../Imagenes/CatalogoImages/GA004-front.png'
import imagenProducto5 from '../Imagenes/CatalogoImages/GA005-front.png'
import imagenProducto6 from '../Imagenes/CatalogoImages/GE001-front.png'
import imagenProducto7 from '../Imagenes/CatalogoImages/GE002-front.png'
import imagenProducto8 from '../Imagenes/CatalogoImages/GE003-front.png'
import imagenProducto9 from '../Imagenes/CatalogoImages/GE004-front.png'
import imagenProducto10 from '../Imagenes/CatalogoImages/GE005-front.png'
import imagenProducto11 from '../Imagenes/CatalogoImages/BA001-front.png'
import imagenProducto12 from '../Imagenes/CatalogoImages/BA002-front.png'
import imagenProducto13 from '../Imagenes/CatalogoImages/BA003-front-1254x1254.png'
import imagenProducto14 from '../Imagenes/CatalogoImages/BT001-front.png'
import imagenProducto15 from '../Imagenes/CatalogoImages/BT002-front.png'
import imagenProducto16 from '../Imagenes/CatalogoImages/BT003-front.png'
import imagenProducto17 from '../Imagenes/CatalogoImages/BT004-front.png'
import imagenProducto18 from '../Imagenes/CatalogoImages/BT005-front.png'
import imagenProducto19 from '../Imagenes/CatalogoImages/TC001-front.png'
import imagenProducto20 from '../Imagenes/CatalogoImages/TC002-front.png'
import imagenProducto21 from '../Imagenes/CatalogoImages/TC003-front.png'
import imagenProducto22 from '../Imagenes/CatalogoImages/TC004-front.png'
import imagenProducto23 from '../Imagenes/CatalogoImages/AM001-front.png'
import imagenProducto24 from '../Imagenes/CatalogoImages/AM002-front.png'
import imagenProducto25 from '../Imagenes/CatalogoImages/AM003-front.png'
import imagenProducto26 from '../Imagenes/CatalogoImages/AM004-front.png'
import imagenProducto27 from '../Imagenes/CatalogoImages/MI001-front.png'
import imagenProducto28 from '../Imagenes/CatalogoImages/MI002-front.png'
import imagenProducto29 from '../Imagenes/CatalogoImages/MI003-front.png'
import imagenProducto30 from '../Imagenes/CatalogoImages/MI004-front.png'
import imagenProducto31 from '../Imagenes/CatalogoImages/PE001-front.png'
import imagenProducto32 from '../Imagenes/CatalogoImages/PE002-front.png'
import imagenProducto33 from '../Imagenes/CatalogoImages/PE003-front.png'
import imagenProducto34 from '../Imagenes/CatalogoImages/PE004-front.png'
import imagenProducto35 from '../Imagenes/CatalogoImages/PE005-front.png'
import imagenProducto36 from '../Imagenes/CatalogoImages/PE006-front.png'
import imagenProducto37 from '../Imagenes/CatalogoImages/AC001-front.png'
import imagenProducto38 from '../Imagenes/CatalogoImages/AC002-front.png'
import imagenProducto39 from '../Imagenes/CatalogoImages/AC003-front.png'
import imagenProducto40 from '../Imagenes/CatalogoImages/AC004-front.png'
import imagenProducto41 from '../Imagenes/CatalogoImages/AC005-front.png'
import imagenProducto42 from '../Imagenes/CatalogoImages/AC006-front.png'
import imagenProducto43 from '../Imagenes/CatalogoImages/AC007-front.png'
import imagenProducto44 from '../Imagenes/CatalogoImages/AC008-front.png'
import imagenProducto45 from '../Imagenes/CatalogoImages/AC009-front.png'
import imagenProducto46 from '../Imagenes/CatalogoImages/AC010-front.png'
import imagenProducto47 from '../Imagenes/CatalogoImages/ES001-front.png'
import imagenProducto48 from '../Imagenes/CatalogoImages/ES002-front.png'
import imagenProducto49 from '../Imagenes/CatalogoImages/ES003-front.png'
import imagenProducto50 from '../Imagenes/CatalogoImages/ES004-front.png'
import imagenProducto51 from '../Imagenes/CatalogoImages/ES005-front.png'

function Productos() {
    return (
        <div className="container mt-4 pb-4">
            <h1>Productos</h1>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <CardProducto
                    id={1}
                    titulo={"Guitarra Acústica Folk"}
                    descripcion={"Guitarra acústica folk con tapa de abeto y cuerpo de meranti, diseñada para ofrecer una respuesta equilibrada y una buena proyección acústica."}
                    precio={129990}
                    imagen={imagenProducto1}
                />
                <CardProducto
                    id={2}
                    titulo={"Guitarra Acústica Dreadnought"}
                    descripcion={"Guitarra acústica dreadnought con tapa de abeto macizo y brazo de caoba, caracterizada por su buena proyección, dinámica y sonido cálido."}
                    precio={189990}
                    imagen={imagenProducto2}
                />
                <CardProducto
                    id={3}
                    titulo={"Guitarra Acústica Clásica 4/4"}
                    descripcion={"Guitarra clásica de tamaño completo con cuerdas de nailon y tapa de abeto, ideal para estudio, técnica clásica y ejecución de repertorio acústico."}
                    precio={89990}
                    imagen={imagenProducto3}
                />
                <CardProducto
                    id={4}
                    titulo={"Guitarra Electroacústica"}
                    descripcion={"Guitarra electroacústica equipada con sistema de captación y afinador integrado, preparada para interpretación acústica y amplificación en vivo."}
                    precio={349990}
                    imagen={imagenProducto4}
                />
                <CardProducto
                    id={5}
                    titulo={"Guitarra 3/4"}
                    descripcion={"Guitarra acústica compacta de tamaño 3/4, especialmente cómoda para niños, estudiantes jóvenes y músicos que buscan mayor portabilidad."}
                    precio={79990}
                    imagen={imagenProducto5}
                />
                <CardProducto
                    id={6}
                    titulo={"Guitarra Eléctrica Stratocaster"}
                    descripcion={"Guitarra eléctrica tipo Stratocaster con cuerpo de álamo, mástil de arce y configuración de tres pastillas single-coil."}
                    precio={249990}
                    imagen={imagenProducto6}
                />
                <CardProducto
                    id={7}
                    titulo={"Guitarra Eléctrica Les Paul"}
                    descripcion={"Guitarra eléctrica con cuerpo de caoba, tapa de arce y pastillas humbucker, orientada a un sonido potente, cálido y con gran sustain."}
                    precio={329990}
                    imagen={imagenProducto7}
                />
                <CardProducto
                    id={8}
                    titulo={"Guitarra Eléctrica SG"}
                    descripcion={"Guitarra eléctrica de cuerpo de caoba equipada con dos pastillas humbucker, diseñada para entregar un tono potente y definido."}
                    precio={319990}
                    imagen={imagenProducto8}
                />
                <CardProducto
                    id={9}
                    titulo={"Guitarra Eléctrica Telecaster"}
                    descripcion={"Guitarra eléctrica estilo Telecaster con cuerpo de álamo y dos pastillas single-coil, destacada por su ataque definido y claridad tonal."}
                    precio={239990}
                    imagen={imagenProducto9}
                />
                <CardProducto
                    id={10}
                    titulo={"Guitarra Eléctrica Semi-Hollow"}
                    descripcion={"Guitarra eléctrica semi-hueca con dos humbuckers, caracterizada por un tono cálido, resonante y con gran riqueza armónica."}
                    precio={549990}
                    imagen={imagenProducto10}
                />
                <CardProducto
                    id={11}
                    titulo={"Bajo Eléctrico 4 Cuerdas"}
                    descripcion={"Bajo eléctrico de cuatro cuerdas con configuración de pastillas PJ, cuerpo de álamo y mástil de arce para una respuesta tonal versátil."}
                    precio={299990}
                    imagen={imagenProducto11}
                />
                <CardProducto
                    id={12}
                    titulo={"Bajo Eléctrico Jazz Bass"}
                    descripcion={"Bajo eléctrico Jazz Bass con cuerpo de aliso y dos pastillas Alnico V single-coil, ofreciendo una respuesta definida y articulada."}
                    precio={699990}
                    imagen={imagenProducto12}
                />
                <CardProducto
                    id={13}
                    titulo={"Bajo Acústico 4 Cuerdas"}
                    descripcion={"Bajo electroacústico de cuatro cuerdas con sistema electrónico y afinador integrado, preparado para interpretación acústica y amplificada."}
                    precio={429990}
                    imagen={imagenProducto13}
                />
                <CardProducto
                    id={14}
                    titulo={"Batería Acústica 5 Piezas"}
                    descripcion={"Set de batería acústica de cinco piezas que incluye hardware, platillos y pedal de bombo para una configuración completa."}
                    precio={599990}
                    imagen={imagenProducto14}
                />
                <CardProducto
                    id={15}
                    titulo={"Batería Electrónica 8 Pads"}
                    descripcion={"Batería electrónica equipada con módulo TD-02 y ocho pads, ideal para práctica, aprendizaje y ejecución con sonidos digitales."}
                    precio={799990}
                    imagen={imagenProducto15}
                />
                <CardProducto
                    id={16}
                    titulo={"Caja Snare 14\""}
                    descripcion={"Caja de acero de 14 x 5 pulgadas equipada con diez tensores para obtener una afinación precisa y un ataque definido."}
                    precio={89990}
                    imagen={imagenProducto16}
                />
                <CardProducto
                    id={17}
                    titulo={"Hi-Hat 14\""}
                    descripcion={"Hi-hat de 14 pulgadas fabricado en aleación B20, con respuesta brillante, clara y definida para mantener el pulso rítmico."}
                    precio={149990}
                    imagen={imagenProducto17}
                />
                <CardProducto
                    id={18}
                    titulo={"Crash 16\""}
                    descripcion={"Platillo crash de 16 pulgadas fabricado en aleación B20, caracterizado por un ataque rápido y gran riqueza armónica."}
                    precio={129990}
                    imagen={imagenProducto18}
                />
                <CardProducto
                    id={19}
                    titulo={"Teclado Digital 61 Teclas"}
                    descripcion={"Teclado digital de 61 teclas sensibles al tacto con 622 voces, pensado para interpretación, práctica y aprendizaje musical."}
                    precio={249990}
                    imagen={imagenProducto19}
                />
                <CardProducto
                    id={20}
                    titulo={"Piano Digital 88 Teclas"}
                    descripcion={"Piano digital de 88 teclas pesadas con diez voces y pedal sustain, diseñado para una ejecución de carácter pianístico."}
                    precio={499990}
                    imagen={imagenProducto20}
                />
                <CardProducto
                    id={21}
                    titulo={"Sintetizador 49 Teclas"}
                    descripcion={"Controlador MIDI con 49 mini teclas diseñado para controlar instrumentos virtuales, sintetizadores y software de producción musical."}
                    precio={129990}
                    imagen={imagenProducto21}
                />
                <CardProducto
                    id={22}
                    titulo={"Teclado MIDI 88 Teclas"}
                    descripcion={"Controlador MIDI de 88 teclas con acción de martillo, orientado al control expresivo de instrumentos virtuales y software musical."}
                    precio={399990}
                    imagen={imagenProducto22}
                />
                <CardProducto
                    id={23}
                    titulo={"Amplificador Guitarra 15W"}
                    descripcion={"Amplificador combo para guitarra de 15 watts con distorsión integrada y entrada auxiliar, ideal para práctica y estudio."}
                    precio={99990}
                    imagen={imagenProducto23}
                />
                <CardProducto
                    id={24}
                    titulo={"Amplificador Guitarra 40W"}
                    descripcion={"Amplificador de guitarra de 40 watts con cuatro canales y efectos digitales integrados para una amplia variedad de sonidos."}
                    precio={299990}
                    imagen={imagenProducto24}
                />
                <CardProducto
                    id={25}
                    titulo={"Amplificador Bajo 100W"}
                    descripcion={"Amplificador para bajo eléctrico de 100 watts con tweeter y ecualizador de cuatro bandas para controlar el espectro tonal."}
                    precio={449990}
                    imagen={imagenProducto25}
                />
                <CardProducto
                    id={26}
                    titulo={"Amplificador Acústico 60W"}
                    descripcion={"Amplificador acústico de 60 watts y dos canales con efectos de reverb y chorus para instrumentos electroacústicos."}
                    precio={499990}
                    imagen={imagenProducto26}
                />
                <CardProducto
                    id={27}
                    titulo={"Micrófono Dinámico Cardioide"}
                    descripcion={"Micrófono dinámico cardioide diseñado para captación vocal, reconocido por su claridad y rendimiento en presentaciones en vivo."}
                    precio={149990}
                    imagen={imagenProducto27}
                />
                <CardProducto
                    id={28}
                    titulo={"Micrófono Dinámico de Instrumento"}
                    descripcion={"Micrófono dinámico diseñado para captar instrumentos y amplificadores con gran definición de ataque y resistencia a altos niveles sonoros."}
                    precio={139990}
                    imagen={imagenProducto28}
                />
                <CardProducto
                    id={29}
                    titulo={"Micrófono Condensador"}
                    descripcion={"Micrófono de condensador cardioide con conexión XLR, diseñado para capturar voces e instrumentos con alto nivel de detalle."}
                    precio={199990}
                    imagen={imagenProducto29}
                />
                <CardProducto
                    id={30}
                    titulo={"Micrófono USB de Condensador"}
                    descripcion={"Micrófono USB de condensador con cuatro patrones polares, versátil para streaming, podcast, locución y creación de contenido."}
                    precio={299990}
                    imagen={imagenProducto30}
                />
                <CardProducto
                    id={31}
                    titulo={"Pedal de Distorsión"}
                    descripcion={"Pedal de distorsión clásico con controles de nivel, tono y distorsión para obtener sonidos saturados y definidos."}
                    precio={79990}
                    imagen={imagenProducto31}
                />
                <CardProducto
                    id={32}
                    titulo={"Pedal Reverb"}
                    descripcion={"Pedal digital de reverberación con ocho modos y función shimmer para crear espacios, profundidad y ambientes sonoros."}
                    precio={179990}
                    imagen={imagenProducto32}
                />
                <CardProducto
                    id={33}
                    titulo={"Pedal Multi-Efectos"}
                    descripcion={"Procesador multi-efectos en formato pedalboard capaz de combinar hasta ocho efectos simultáneamente para guitarra eléctrica."}
                    precio={349990}
                    imagen={imagenProducto33}
                />
                <CardProducto
                    id={34}
                    titulo={"Pedal Afinador Cromático"}
                    descripcion={"Afinador cromático en formato pedal con indicador visual para realizar ajustes rápidos y precisos durante ensayos o presentaciones."}
                    precio={89990}
                    imagen={imagenProducto34}
                />
                <CardProducto
                    id={35}
                    titulo={"Pedal Delay Analógico"}
                    descripcion={"Pedal de delay analógico con hasta 600 ms de retardo, caracterizado por repeticiones cálidas y de textura orgánica."}
                    precio={179990}
                    imagen={imagenProducto35}
                />
                <CardProducto
                    id={36}
                    titulo={"Pedal Overdrive"}
                    descripcion={"Pedal Tube Screamer de overdrive con saturación suave y dinámica, ideal para blues, rock y realce de amplificadores."}
                    precio={99990}
                    imagen={imagenProducto36}
                />
                <CardProducto
                    id={37}
                    titulo={"Cuerdas Eléctrica 09-42"}
                    descripcion={"Juego de seis cuerdas para guitarra eléctrica calibre 09-42, de tensión ligera y gran flexibilidad para bendings y vibratos."}
                    precio={8990}
                    imagen={imagenProducto37}
                />
                <CardProducto
                    id={38}
                    titulo={"Cuerdas Acústica 12-53"}
                    descripcion={"Juego de cuerdas para guitarra acústica calibre 12-53 en bronce fósforo, diseñado para entregar un sonido cálido y definido."}
                    precio={10990}
                    imagen={imagenProducto38}
                />
                <CardProducto
                    id={39}
                    titulo={"Cuerdas Bajo 45-105"}
                    descripcion={"Juego de cuatro cuerdas para bajo eléctrico calibre 45-105 con entorchado de níquel y respuesta definida en graves."}
                    precio={14990}
                    imagen={imagenProducto39}
                />
                <CardProducto
                    id={40}
                    titulo={"Púas x10 0,73 mm"}
                    descripcion={"Set de diez púas Fender 351 de grosor medio 0,73 mm, adecuadas para rasgueos, riffs y ejecución melódica."}
                    precio={3990}
                    imagen={imagenProducto40}
                />
                <CardProducto
                    id={41}
                    titulo={"Capotraste"}
                    descripcion={"Capotraste de resorte para guitarra de seis cuerdas, diseñado para realizar cambios rápidos de tonalidad durante la interpretación."}
                    precio={12990}
                    imagen={imagenProducto41}
                />
                <CardProducto
                    id={42}
                    titulo={"Afinador de Clip"}
                    descripcion={"Afinador cromático de clip con pantalla giratoria, diseñado para realizar una afinación rápida y cómoda directamente desde el instrumento."}
                    precio={8990}
                    imagen={imagenProducto42}
                />
                <CardProducto
                    id={43}
                    titulo={"Cable Instrumento 3 m"}
                    descripcion={"Cable de instrumento de tres metros con construcción trenzada y conectores dorados para conexión de instrumentos y amplificación."}
                    precio={12990}
                    imagen={imagenProducto43}
                />
                <CardProducto
                    id={44}
                    titulo={"Cable Instrumento 6 m"}
                    descripcion={"Cable de instrumento de seis metros con construcción trenzada y conectores dorados, ideal para escenarios y salas de ensayo."}
                    precio={17990}
                    imagen={imagenProducto44}
                />
                <CardProducto
                    id={45}
                    titulo={"Soporte Guitarra de Piso"}
                    descripcion={"Soporte plegable de piso para guitarra con sistema de sujeción, diseñado para mantener el instrumento estable y protegido."}
                    precio={22990}
                    imagen={imagenProducto45}
                />
                <CardProducto
                    id={46}
                    titulo={"Soporte Guitarra de Pared"}
                    descripcion={"Soporte mural para guitarra con sistema automático de sujeción, ideal para almacenar o exhibir instrumentos de forma segura."}
                    precio={18990}
                    imagen={imagenProducto46}
                />
                <CardProducto
                    id={47}
                    titulo={"Interfaz de Audio 2x2 USB"}
                    descripcion={"Interfaz de audio USB con entrada XLR e instrumento, dos salidas y grabación de alta resolución de hasta 24 bits/192 kHz."}
                    precio={149990}
                    imagen={imagenProducto47}
                />
                <CardProducto
                    id={48}
                    titulo={"Auriculares de Estudio"}
                    descripcion={"Auriculares circumaurales de estudio con respuesta de frecuencia de 15 Hz a 20 kHz, diseñados para monitoreo y producción musical."}
                    precio={79990}
                    imagen={imagenProducto48}
                />
                <CardProducto
                    id={49}
                    titulo={"Auriculares de Estudio Pro"}
                    descripcion={"Auriculares profesionales de estudio orientados a una reproducción detallada para monitoreo, edición, grabación y mezcla."}
                    precio={219990}
                    imagen={imagenProducto49}
                />
                <CardProducto
                    id={50}
                    titulo={"Monitor de Estudio 5"}
                    descripcion={"Monitor activo de estudio de 5 pulgadas con respuesta plana, diseñado para realizar mezclas y monitoreo con mayor precisión."}
                    precio={349990}
                    imagen={imagenProducto50}
                />
                <CardProducto
                    id={51}
                    titulo={"Pop Filter"}
                    descripcion={"Filtro antipop de doble malla con brazo flexible, diseñado para reducir consonantes explosivas durante grabaciones vocales."}
                    precio={14990}
                    imagen={imagenProducto51}
                />
            </div>
        </div>
    )
}

export default Productos
