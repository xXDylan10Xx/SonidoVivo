

import "../../Estilos/Footer.css";
import Instagram from "../../Imagenes/Contacto/InstagramIcono.png"
import Facebook from "../../Imagenes/Contacto/FacebookIcono.png"
import WhatsApp from "../../Imagenes/Contacto/WhatsappIcono.png"
import X from "../../Imagenes/Contacto/XIcono.png"



function Footer(){

    return(
        <footer className="FooterEstilo">

            <div className="ContenidoFooter">
                <h5> <strong> Ayuda </strong> </h5>

                    <a href="https://wa.me/56912345678" className="text-white"> Comunicate con nosotros </a>

                    <br/>

                    <a href="https://chatgpt.com/" className="text-white"> Comunicate con la IA </a>
            </div>

            <div className="ContenidoFooter">

                <h5> <strong> Encuentranos en las nuestras redes </strong> </h5>

                    <a href="https://www.instagram.com/sonidovivo" className="text-white"> Instagram <img src={Instagram} height={20} width={20} alt="Imagen Ig" /> </a>

                    <br/>

                    <a href="https://www.facebook.com/profile.php?id=100057384885975" className="text-white"> Facebook <img src={Facebook} height={20} width={20} alt="Imagen Ig" /> </a>

                    <br/>

                    <a href="https://www.twitter.com/sonidovivo" className="text-white"> WhatsApp <img src={WhatsApp} height={20} width={20} alt="Imagen Ig" /> </a>

                    <br/>

                    <a href="https://www.facebook.com/sonidovivo" className="text-white"> X <img src={X} height={20} width={20} alt="Imagen Ig" /> </a>
            </div>

        </footer>

    )
}

export default Footer
