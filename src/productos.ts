import imagen1 from "./Imagenes/CatalogoImages/GA001-front.png"
import imagen2 from "./Imagenes/CatalogoImages/GA002-front.png"
import imagen3 from "./Imagenes/CatalogoImages/GA003-front.png"
import imagen4 from "./Imagenes/CatalogoImages/GA004-front.png"
import imagen5 from "./Imagenes/CatalogoImages/GA005-front.png"
import imagen6 from "./Imagenes/CatalogoImages/GE001-front.png"
import imagen7 from "./Imagenes/CatalogoImages/GE002-front.png"
import imagen8 from "./Imagenes/CatalogoImages/GE003-front.png"
import imagen9 from "./Imagenes/CatalogoImages/GE004-front.png"
import imagen10 from "./Imagenes/CatalogoImages/GE005-front.png"
import imagen11 from "./Imagenes/CatalogoImages/BA001-front.png"
import imagen12 from "./Imagenes/CatalogoImages/BA002-front.png"
import imagen13 from "./Imagenes/CatalogoImages/BA003-front-1254x1254.png"
import imagen14 from "./Imagenes/CatalogoImages/BT001-front.png"
import imagen15 from "./Imagenes/CatalogoImages/BT002-front.png"
import imagen16 from "./Imagenes/CatalogoImages/BT003-front.png"
import imagen17 from "./Imagenes/CatalogoImages/BT004-front.png"
import imagen18 from "./Imagenes/CatalogoImages/BT005-front.png"
import imagen19 from "./Imagenes/CatalogoImages/TC001-front.png"
import imagen20 from "./Imagenes/CatalogoImages/TC002-front.png"
import imagen21 from "./Imagenes/CatalogoImages/TC003-front.png"
import imagen22 from "./Imagenes/CatalogoImages/TC004-front.png"
import imagen23 from "./Imagenes/CatalogoImages/AM001-front.png"
import imagen24 from "./Imagenes/CatalogoImages/AM002-front.png"
import imagen25 from "./Imagenes/CatalogoImages/AM003-front.png"
import imagen26 from "./Imagenes/CatalogoImages/AM004-front.png"
import imagen27 from "./Imagenes/CatalogoImages/MI001-front.png"
import imagen28 from "./Imagenes/CatalogoImages/MI002-front.png"
import imagen29 from "./Imagenes/CatalogoImages/MI003-front.png"
import imagen30 from "./Imagenes/CatalogoImages/MI004-front.png"
import imagen31 from "./Imagenes/CatalogoImages/PE001-front.png"
import imagen32 from "./Imagenes/CatalogoImages/PE002-front.png"
import imagen33 from "./Imagenes/CatalogoImages/PE003-front.png"
import imagen34 from "./Imagenes/CatalogoImages/PE004-front.png"
import imagen35 from "./Imagenes/CatalogoImages/PE005-front.png"
import imagen36 from "./Imagenes/CatalogoImages/PE006-front.png"
import imagen37 from "./Imagenes/CatalogoImages/AC001-front.png"
import imagen38 from "./Imagenes/CatalogoImages/AC002-front.png"
import imagen39 from "./Imagenes/CatalogoImages/AC003-front.png"
import imagen40 from "./Imagenes/CatalogoImages/AC004-front.png"
import imagen41 from "./Imagenes/CatalogoImages/AC005-front.png"
import imagen42 from "./Imagenes/CatalogoImages/AC006-front.png"
import imagen43 from "./Imagenes/CatalogoImages/AC007-front.png"
import imagen44 from "./Imagenes/CatalogoImages/AC008-front.png"
import imagen45 from "./Imagenes/CatalogoImages/AC009-front.png"
import imagen46 from "./Imagenes/CatalogoImages/AC010-front.png"
import imagen47 from "./Imagenes/CatalogoImages/ES001-front.png"
import imagen48 from "./Imagenes/CatalogoImages/ES002-front.png"
import imagen49 from "./Imagenes/CatalogoImages/ES003-front.png"
import imagen50 from "./Imagenes/CatalogoImages/ES004-front.png"
import imagen51 from "./Imagenes/CatalogoImages/ES005-front.png"

export interface Producto {
    id: string
    catalogoId: number
    nombre: string
    marca: string
    modelo: string
    categoria: string
    precio: number
    precioAnterior?: number
    stock: number
    descripcion: string
    imagen: string
}

export interface ProductoCarrito extends Producto {
    cantidad: number
}

// Productos del catalogo original de SonidoVivo.
export const productos: Producto[] = [
    {
        "id": "GA001",
        "catalogoId": 1,
        "nombre": "Guitarra Acústica Folk",
        "marca": "Yamaha",
        "modelo": "F310",
        "categoria": "Guitarras Acústicas",
        "precio": 129990,
        "stock": 8,
        "descripcion": "Guitarra acústica folk con tapa de abeto y cuerpo de meranti, diseñada para ofrecer una respuesta equilibrada y una buena proyección acústica.",
        "imagen": imagen1
    },
    {
        "id": "GA002",
        "catalogoId": 2,
        "nombre": "Guitarra Acústica Dreadnought",
        "marca": "Fender",
        "modelo": "CD-60S",
        "categoria": "Guitarras Acústicas",
        "precio": 189990,
        "stock": 5,
        "descripcion": "Guitarra acústica dreadnought con tapa de abeto macizo y brazo de caoba, caracterizada por su buena proyección, dinámica y sonido cálido.",
        "imagen": imagen2
    },
    {
        "id": "GA003",
        "catalogoId": 3,
        "nombre": "Guitarra Acústica Clásica 4/4",
        "marca": "Yamaha",
        "modelo": "C40",
        "categoria": "Guitarras Acústicas",
        "precio": 89990,
        "stock": 10,
        "descripcion": "Guitarra clásica de tamaño completo con cuerdas de nailon y tapa de abeto, ideal para estudio, técnica clásica y ejecución de repertorio acústico.",
        "imagen": imagen3
    },
    {
        "id": "GA004",
        "catalogoId": 4,
        "nombre": "Guitarra Electroacústica",
        "marca": "Takamine",
        "modelo": "GN20CE",
        "categoria": "Guitarras Acústicas",
        "precio": 349990,
        "stock": 3,
        "descripcion": "Guitarra electroacústica equipada con sistema de captación y afinador integrado, preparada para interpretación acústica y amplificación en vivo.",
        "imagen": imagen4
    },
    {
        "id": "GA005",
        "catalogoId": 5,
        "nombre": "Guitarra 3/4",
        "marca": "Yamaha",
        "modelo": "JR1",
        "categoria": "Guitarras Acústicas",
        "precio": 79990,
        "stock": 6,
        "descripcion": "Guitarra acústica compacta de tamaño 3/4, especialmente cómoda para niños, estudiantes jóvenes y músicos que buscan mayor portabilidad.",
        "imagen": imagen5
    },
    {
        "id": "GE001",
        "catalogoId": 6,
        "nombre": "Guitarra Eléctrica Stratocaster",
        "marca": "Squier",
        "modelo": "Affinity Strat",
        "categoria": "Guitarras Eléctricas",
        "precio": 249990,
        "stock": 5,
        "descripcion": "Guitarra eléctrica tipo Stratocaster con cuerpo de álamo, mástil de arce y configuración de tres pastillas single-coil.",
        "imagen": imagen6
    },
    {
        "id": "GE002",
        "catalogoId": 7,
        "nombre": "Guitarra Eléctrica Les Paul",
        "marca": "Epiphone",
        "modelo": "Les Paul Std",
        "categoria": "Guitarras Eléctricas",
        "precio": 329990,
        "stock": 4,
        "descripcion": "Guitarra eléctrica con cuerpo de caoba, tapa de arce y pastillas humbucker, orientada a un sonido potente, cálido y con gran sustain.",
        "imagen": imagen7
    },
    {
        "id": "GE003",
        "catalogoId": 8,
        "nombre": "Guitarra Eléctrica SG",
        "marca": "Epiphone",
        "modelo": "SG Standard",
        "categoria": "Guitarras Eléctricas",
        "precio": 319990,
        "stock": 3,
        "descripcion": "Guitarra eléctrica de cuerpo de caoba equipada con dos pastillas humbucker, diseñada para entregar un tono potente y definido.",
        "imagen": imagen8
    },
    {
        "id": "GE004",
        "catalogoId": 9,
        "nombre": "Guitarra Eléctrica Telecaster",
        "marca": "Squier",
        "modelo": "Affinity Tele",
        "categoria": "Guitarras Eléctricas",
        "precio": 239990,
        "stock": 4,
        "descripcion": "Guitarra eléctrica estilo Telecaster con cuerpo de álamo y dos pastillas single-coil, destacada por su ataque definido y claridad tonal.",
        "imagen": imagen9
    },
    {
        "id": "GE005",
        "catalogoId": 10,
        "nombre": "Guitarra Eléctrica Semi-Hollow",
        "marca": "Epiphone",
        "modelo": "ES-335",
        "categoria": "Guitarras Eléctricas",
        "precio": 549990,
        "stock": 2,
        "descripcion": "Guitarra eléctrica semi-hueca con dos humbuckers, caracterizada por un tono cálido, resonante y con gran riqueza armónica.",
        "imagen": imagen10
    },
    {
        "id": "BA001",
        "catalogoId": 11,
        "nombre": "Bajo Eléctrico 4 Cuerdas",
        "marca": "Squier",
        "modelo": "Affinity PJ",
        "categoria": "Bajos Eléctricos",
        "precio": 299990,
        "stock": 5,
        "descripcion": "Bajo eléctrico de cuatro cuerdas con configuración de pastillas PJ, cuerpo de álamo y mástil de arce para una respuesta tonal versátil.",
        "imagen": imagen11
    },
    {
        "id": "BA002",
        "catalogoId": 12,
        "nombre": "Bajo Eléctrico Jazz Bass",
        "marca": "Fender",
        "modelo": "Player Jazz",
        "categoria": "Bajos Eléctricos",
        "precio": 699990,
        "stock": 2,
        "descripcion": "Bajo eléctrico Jazz Bass con cuerpo de aliso y dos pastillas Alnico V single-coil, ofreciendo una respuesta definida y articulada.",
        "imagen": imagen12
    },
    {
        "id": "BA003",
        "catalogoId": 13,
        "nombre": "Bajo Acústico 4 Cuerdas",
        "marca": "Yamaha",
        "modelo": "APX700II",
        "categoria": "Bajos Eléctricos",
        "precio": 429990,
        "stock": 2,
        "descripcion": "Bajo electroacústico de cuatro cuerdas con sistema electrónico y afinador integrado, preparado para interpretación acústica y amplificada.",
        "imagen": imagen13
    },
    {
        "id": "BT001",
        "catalogoId": 14,
        "nombre": "Batería Acústica 5 Piezas",
        "marca": "Pearl",
        "modelo": "Roadshow",
        "categoria": "Baterías",
        "precio": 599990,
        "stock": 2,
        "descripcion": "Set de batería acústica de cinco piezas que incluye hardware, platillos y pedal de bombo para una configuración completa.",
        "imagen": imagen14
    },
    {
        "id": "BT002",
        "catalogoId": 15,
        "nombre": "Batería Electrónica 8 Pads",
        "marca": "Roland",
        "modelo": "TD-02KV",
        "categoria": "Baterías",
        "precio": 799990,
        "stock": 2,
        "descripcion": "Batería electrónica equipada con módulo TD-02 y ocho pads, ideal para práctica, aprendizaje y ejecución con sonidos digitales.",
        "imagen": imagen15
    },
    {
        "id": "BT003",
        "catalogoId": 16,
        "nombre": "Caja Snare 14\"",
        "marca": "Pearl",
        "modelo": "STE1450",
        "categoria": "Baterías",
        "precio": 89990,
        "stock": 4,
        "descripcion": "Caja de acero de 14 x 5 pulgadas equipada con diez tensores para obtener una afinación precisa y un ataque definido.",
        "imagen": imagen16
    },
    {
        "id": "BT004",
        "catalogoId": 17,
        "nombre": "Hi-Hat 14\"",
        "marca": "Zildjian",
        "modelo": "A Series",
        "categoria": "Baterías",
        "precio": 149990,
        "stock": 3,
        "descripcion": "Hi-hat de 14 pulgadas fabricado en aleación B20, con respuesta brillante, clara y definida para mantener el pulso rítmico.",
        "imagen": imagen17
    },
    {
        "id": "BT005",
        "catalogoId": 18,
        "nombre": "Crash 16\"",
        "marca": "Zildjian",
        "modelo": "A Series",
        "categoria": "Baterías",
        "precio": 129990,
        "stock": 3,
        "descripcion": "Platillo crash de 16 pulgadas fabricado en aleación B20, caracterizado por un ataque rápido y gran riqueza armónica.",
        "imagen": imagen18
    },
    {
        "id": "TC001",
        "catalogoId": 19,
        "nombre": "Teclado Digital 61 Teclas",
        "marca": "Yamaha",
        "modelo": "PSR-E373",
        "categoria": "Teclados y Pianos",
        "precio": 249990,
        "stock": 4,
        "descripcion": "Teclado digital de 61 teclas sensibles al tacto con 622 voces, pensado para interpretación, práctica y aprendizaje musical.",
        "imagen": imagen19
    },
    {
        "id": "TC002",
        "catalogoId": 20,
        "nombre": "Piano Digital 88 Teclas",
        "marca": "Yamaha",
        "modelo": "P-45",
        "categoria": "Teclados y Pianos",
        "precio": 499990,
        "stock": 2,
        "descripcion": "Piano digital de 88 teclas pesadas con diez voces y pedal sustain, diseñado para una ejecución de carácter pianístico.",
        "imagen": imagen20
    },
    {
        "id": "TC003",
        "catalogoId": 21,
        "nombre": "Sintetizador 49 Teclas",
        "marca": "Arturia",
        "modelo": "MiniLab MKII",
        "categoria": "Teclados y Pianos",
        "precio": 129990,
        "stock": 5,
        "descripcion": "Controlador MIDI con 49 mini teclas diseñado para controlar instrumentos virtuales, sintetizadores y software de producción musical.",
        "imagen": imagen21
    },
    {
        "id": "TC004",
        "catalogoId": 22,
        "nombre": "Teclado MIDI 88 Teclas",
        "marca": "M-Audio",
        "modelo": "Hammer 88",
        "categoria": "Teclados y Pianos",
        "precio": 399990,
        "stock": 2,
        "descripcion": "Controlador MIDI de 88 teclas con acción de martillo, orientado al control expresivo de instrumentos virtuales y software musical.",
        "imagen": imagen22
    },
    {
        "id": "AM001",
        "catalogoId": 23,
        "nombre": "Amplificador Guitarra 15W",
        "marca": "Fender",
        "modelo": "Frontman 15G",
        "categoria": "Amplificadores",
        "precio": 99990,
        "stock": 5,
        "descripcion": "Amplificador combo para guitarra de 15 watts con distorsión integrada y entrada auxiliar, ideal para práctica y estudio.",
        "imagen": imagen23
    },
    {
        "id": "AM002",
        "catalogoId": 24,
        "nombre": "Amplificador Guitarra 40W",
        "marca": "Marshall",
        "modelo": "MG40GFX",
        "categoria": "Amplificadores",
        "precio": 299990,
        "stock": 3,
        "descripcion": "Amplificador de guitarra de 40 watts con cuatro canales y efectos digitales integrados para una amplia variedad de sonidos.",
        "imagen": imagen24
    },
    {
        "id": "AM003",
        "catalogoId": 25,
        "nombre": "Amplificador Bajo 100W",
        "marca": "Hartke",
        "modelo": "HD100",
        "categoria": "Amplificadores",
        "precio": 449990,
        "stock": 2,
        "descripcion": "Amplificador para bajo eléctrico de 100 watts con tweeter y ecualizador de cuatro bandas para controlar el espectro tonal.",
        "imagen": imagen25
    },
    {
        "id": "AM004",
        "catalogoId": 26,
        "nombre": "Amplificador Acústico 60W",
        "marca": "Fishman",
        "modelo": "Loudbox Mini",
        "categoria": "Amplificadores",
        "precio": 499990,
        "stock": 2,
        "descripcion": "Amplificador acústico de 60 watts y dos canales con efectos de reverb y chorus para instrumentos electroacústicos.",
        "imagen": imagen26
    },
    {
        "id": "MI001",
        "catalogoId": 27,
        "nombre": "Micrófono Dinámico Cardioide",
        "marca": "Shure",
        "modelo": "SM58",
        "categoria": "Micrófonos",
        "precio": 149990,
        "stock": 8,
        "descripcion": "Micrófono dinámico cardioide diseñado para captación vocal, reconocido por su claridad y rendimiento en presentaciones en vivo.",
        "imagen": imagen27
    },
    {
        "id": "MI002",
        "catalogoId": 28,
        "nombre": "Micrófono Dinámico de Instrumento",
        "marca": "Shure",
        "modelo": "SM57",
        "categoria": "Micrófonos",
        "precio": 139990,
        "stock": 6,
        "descripcion": "Micrófono dinámico diseñado para captar instrumentos y amplificadores con gran definición de ataque y resistencia a altos niveles sonoros.",
        "imagen": imagen28
    },
    {
        "id": "MI003",
        "catalogoId": 29,
        "nombre": "Micrófono Condensador",
        "marca": "Audio-Technica",
        "modelo": "AT2020",
        "categoria": "Micrófonos",
        "precio": 199990,
        "stock": 4,
        "descripcion": "Micrófono de condensador cardioide con conexión XLR, diseñado para capturar voces e instrumentos con alto nivel de detalle.",
        "imagen": imagen29
    },
    {
        "id": "MI004",
        "catalogoId": 30,
        "nombre": "Micrófono USB de Condensador",
        "marca": "Blue",
        "modelo": "Yeti",
        "categoria": "Micrófonos",
        "precio": 299990,
        "stock": 5,
        "descripcion": "Micrófono USB de condensador con cuatro patrones polares, versátil para streaming, podcast, locución y creación de contenido.",
        "imagen": imagen30
    },
    {
        "id": "PE001",
        "catalogoId": 31,
        "nombre": "Pedal de Distorsión",
        "marca": "Boss",
        "modelo": "DS-1",
        "categoria": "Pedales de Efectos",
        "precio": 79990,
        "stock": 7,
        "descripcion": "Pedal de distorsión clásico con controles de nivel, tono y distorsión para obtener sonidos saturados y definidos.",
        "imagen": imagen31
    },
    {
        "id": "PE002",
        "catalogoId": 32,
        "nombre": "Pedal Reverb",
        "marca": "Boss",
        "modelo": "RV-6",
        "categoria": "Pedales de Efectos",
        "precio": 179990,
        "stock": 4,
        "descripcion": "Pedal digital de reverberación con ocho modos y función shimmer para crear espacios, profundidad y ambientes sonoros.",
        "imagen": imagen32
    },
    {
        "id": "PE003",
        "catalogoId": 33,
        "nombre": "Pedal Multi-Efectos",
        "marca": "Boss",
        "modelo": "ME-80",
        "categoria": "Pedales de Efectos",
        "precio": 349990,
        "stock": 2,
        "descripcion": "Procesador multi-efectos en formato pedalboard capaz de combinar hasta ocho efectos simultáneamente para guitarra eléctrica.",
        "imagen": imagen33
    },
    {
        "id": "PE004",
        "catalogoId": 34,
        "nombre": "Pedal Afinador Cromático",
        "marca": "Boss",
        "modelo": "TU-3",
        "categoria": "Pedales de Efectos",
        "precio": 89990,
        "stock": 8,
        "descripcion": "Afinador cromático en formato pedal con indicador visual para realizar ajustes rápidos y precisos durante ensayos o presentaciones.",
        "imagen": imagen34
    },
    {
        "id": "PE005",
        "catalogoId": 35,
        "nombre": "Pedal Delay Analógico",
        "marca": "MXR",
        "modelo": "Carbon Copy",
        "categoria": "Pedales de Efectos",
        "precio": 179990,
        "stock": 4,
        "descripcion": "Pedal de delay analógico con hasta 600 ms de retardo, caracterizado por repeticiones cálidas y de textura orgánica.",
        "imagen": imagen35
    },
    {
        "id": "PE006",
        "catalogoId": 36,
        "nombre": "Pedal Overdrive",
        "marca": "Ibanez",
        "modelo": "TS9",
        "categoria": "Pedales de Efectos",
        "precio": 99990,
        "stock": 6,
        "descripcion": "Pedal Tube Screamer de overdrive con saturación suave y dinámica, ideal para blues, rock y realce de amplificadores.",
        "imagen": imagen36
    },
    {
        "id": "AC001",
        "catalogoId": 37,
        "nombre": "Cuerdas Eléctrica 09-42",
        "marca": "Ernie Ball",
        "modelo": "Super Slinky",
        "categoria": "Accesorios",
        "precio": 8990,
        "stock": 25,
        "descripcion": "Juego de seis cuerdas para guitarra eléctrica calibre 09-42, de tensión ligera y gran flexibilidad para bendings y vibratos.",
        "imagen": imagen37
    },
    {
        "id": "AC002",
        "catalogoId": 38,
        "nombre": "Cuerdas Acústica 12-53",
        "marca": "Ernie Ball",
        "modelo": "Earthwood",
        "categoria": "Accesorios",
        "precio": 10990,
        "stock": 20,
        "descripcion": "Juego de cuerdas para guitarra acústica calibre 12-53 en bronce fósforo, diseñado para entregar un sonido cálido y definido.",
        "imagen": imagen38
    },
    {
        "id": "AC003",
        "catalogoId": 39,
        "nombre": "Cuerdas Bajo 45-105",
        "marca": "Ernie Ball",
        "modelo": "Regular Slinky",
        "categoria": "Accesorios",
        "precio": 14990,
        "stock": 12,
        "descripcion": "Juego de cuatro cuerdas para bajo eléctrico calibre 45-105 con entorchado de níquel y respuesta definida en graves.",
        "imagen": imagen39
    },
    {
        "id": "AC004",
        "catalogoId": 40,
        "nombre": "Púas x10 0,73 mm",
        "marca": "Fender",
        "modelo": "351",
        "categoria": "Accesorios",
        "precio": 3990,
        "stock": 50,
        "descripcion": "Set de diez púas Fender 351 de grosor medio 0,73 mm, adecuadas para rasgueos, riffs y ejecución melódica.",
        "imagen": imagen40
    },
    {
        "id": "AC005",
        "catalogoId": 41,
        "nombre": "Capotraste",
        "marca": "Dunlop",
        "modelo": "Trigger",
        "categoria": "Accesorios",
        "precio": 12990,
        "stock": 15,
        "descripcion": "Capotraste de resorte para guitarra de seis cuerdas, diseñado para realizar cambios rápidos de tonalidad durante la interpretación.",
        "imagen": imagen41
    },
    {
        "id": "AC006",
        "catalogoId": 42,
        "nombre": "Afinador de Clip",
        "marca": "Snark",
        "modelo": "SN-5",
        "categoria": "Accesorios",
        "precio": 8990,
        "stock": 20,
        "descripcion": "Afinador cromático de clip con pantalla giratoria, diseñado para realizar una afinación rápida y cómoda directamente desde el instrumento.",
        "imagen": imagen42
    },
    {
        "id": "AC007",
        "catalogoId": 43,
        "nombre": "Cable Instrumento 3 m",
        "marca": "Monster",
        "modelo": "S100-I-3",
        "categoria": "Accesorios",
        "precio": 12990,
        "stock": 15,
        "descripcion": "Cable de instrumento de tres metros con construcción trenzada y conectores dorados para conexión de instrumentos y amplificación.",
        "imagen": imagen43
    },
    {
        "id": "AC008",
        "catalogoId": 44,
        "nombre": "Cable Instrumento 6 m",
        "marca": "Monster",
        "modelo": "S100-I-6",
        "categoria": "Accesorios",
        "precio": 17990,
        "stock": 10,
        "descripcion": "Cable de instrumento de seis metros con construcción trenzada y conectores dorados, ideal para escenarios y salas de ensayo.",
        "imagen": imagen44
    },
    {
        "id": "AC009",
        "catalogoId": 45,
        "nombre": "Soporte Guitarra de Piso",
        "marca": "Hercules",
        "modelo": "GS302B",
        "categoria": "Accesorios",
        "precio": 22990,
        "stock": 12,
        "descripcion": "Soporte plegable de piso para guitarra con sistema de sujeción, diseñado para mantener el instrumento estable y protegido.",
        "imagen": imagen45
    },
    {
        "id": "AC010",
        "catalogoId": 46,
        "nombre": "Soporte Guitarra de Pared",
        "marca": "Hercules",
        "modelo": "WAH-202",
        "categoria": "Accesorios",
        "precio": 18990,
        "stock": 10,
        "descripcion": "Soporte mural para guitarra con sistema automático de sujeción, ideal para almacenar o exhibir instrumentos de forma segura.",
        "imagen": imagen46
    },
    {
        "id": "ES001",
        "catalogoId": 47,
        "nombre": "Interfaz de Audio 2x2 USB",
        "marca": "Focusrite",
        "modelo": "Scarlett Solo",
        "categoria": "Estudio y Grabación",
        "precio": 149990,
        "stock": 4,
        "descripcion": "Interfaz de audio USB con entrada XLR e instrumento, dos salidas y grabación de alta resolución de hasta 24 bits/192 kHz.",
        "imagen": imagen47
    },
    {
        "id": "ES002",
        "catalogoId": 48,
        "nombre": "Auriculares de Estudio",
        "marca": "Audio-Technica",
        "modelo": "ATH-M20x",
        "categoria": "Estudio y Grabación",
        "precio": 79990,
        "stock": 6,
        "descripcion": "Auriculares circumaurales de estudio con respuesta de frecuencia de 15 Hz a 20 kHz, diseñados para monitoreo y producción musical.",
        "imagen": imagen48
    },
    {
        "id": "ES003",
        "catalogoId": 49,
        "nombre": "Auriculares de Estudio Pro",
        "marca": "Audio-Technica",
        "modelo": "ATH-M50x",
        "categoria": "Estudio y Grabación",
        "precio": 219990,
        "stock": 4,
        "descripcion": "Auriculares profesionales de estudio orientados a una reproducción detallada para monitoreo, edición, grabación y mezcla.",
        "imagen": imagen49
    },
    {
        "id": "ES004",
        "catalogoId": 50,
        "nombre": "Monitor de Estudio 5",
        "marca": "Yamaha",
        "modelo": "HS5",
        "categoria": "Estudio y Grabación",
        "precio": 349990,
        "stock": 2,
        "descripcion": "Monitor activo de estudio de 5 pulgadas con respuesta plana, diseñado para realizar mezclas y monitoreo con mayor precisión.",
        "imagen": imagen50
    },
    {
        "id": "ES005",
        "catalogoId": 51,
        "nombre": "Pop Filter",
        "marca": "Sennheiser",
        "modelo": "MZP 40",
        "categoria": "Estudio y Grabación",
        "precio": 14990,
        "stock": 8,
        "descripcion": "Filtro antipop de doble malla con brazo flexible, diseñado para reducir consonantes explosivas durante grabaciones vocales.",
        "imagen": imagen51
    }
]

export function aplicarOfertas(catalogo: Producto[]): Producto[] {
    const codigos = ['GA002', 'GE001', 'BA001']
    return catalogo.map((producto) => {
        if (!codigos.includes(producto.id) || producto.precio <= 0) return producto
        return { ...producto, precioAnterior: producto.precio, precio: Math.round(producto.precio * 0.9) }
    })
}