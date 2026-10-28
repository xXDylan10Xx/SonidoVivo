import Instagram from '../../Imagenes/Contacto/InstagramIcono.png'
import Facebook from '../../Imagenes/Contacto/FacebookIcono.png'
import WhatsApp from '../../Imagenes/Contacto/WhatsappIcono.png'
import '../../Estilos/Footer.css'

function Footer() {
    return (
        <footer className="FooterEstilo">
            <p className="titulo-footer">Síguenos en nuestras redes sociales</p>
            <div className="redes-footer">
                <a href="https://www.instagram.com/sonido_.vivo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <img src={Instagram} width={45} height={45} alt="" />
                </a>
                <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <img src={WhatsApp} width={45} height={45} alt="" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100057384885975" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <img src={Facebook} width={45} height={45} alt="" />
                </a>
            </div>
            <hr />
            <p className="mb-0">Sonido Vivo</p>
        </footer>
    )
}

export default Footer
