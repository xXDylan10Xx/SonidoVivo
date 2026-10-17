import "../../Estilos/Navbar.css";
import iniciarSesion from "../../Imagenes/Navbar/IniciarSesion.png";
import carrito from "../../Imagenes/Navbar/Carrito.png";

import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav className="navbar navbar-expand NavbarEstilo ">
            <div className="container-fluid">
            <span className="navbar-brand text-white">
                Mi Tienda
            </span>
            <div className="navbar-nav container-fluid ">
                
                <Link className="nav-link text-white" to="/">Inicio</Link>
                <Link className="nav-link text-white" to="/productos">Productos</Link>
                <Link className="nav-link text-white" to="/contactos">Contacto</Link>
                <Link className="nav-link text-white" to="/Quienes_somos">Quienes somos</Link>
                <Link className="nav-link text-white NavbarCarrito" to="/carrito"><img src={carrito} height={20} width={20} />Carrito</Link>
                <Link className="nav-link text-white NavbarIniciarSesion"  to="/Login"> <img src={iniciarSesion} height={20} width={20} />Iniciar Sesion</Link>
            </div>
            </div>
        </nav>
    )
}
export default Navbar; 