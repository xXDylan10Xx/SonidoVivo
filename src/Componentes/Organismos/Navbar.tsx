import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../Estilos/Navbar.css'
import iniciarSesion from '../../Imagenes/Navbar/IniciarSesion.png'
import carrito from '../../Imagenes/Navbar/Carrito.png'

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false)

    function cerrarMenu() {
        setMenuAbierto(false)
    }

    return (
        <nav
            className="navbar navbar-expand-lg NavbarEstilo"
            data-bs-theme="dark"
            aria-label="Navegación principal"
        >
            <div className="container-fluid">
                <span className="navbar-brand text-white">Mi Tienda</span>

                <button
                    type="button"
                    className="navbar-toggler"
                    aria-controls="menu-principal"
                    aria-expanded={menuAbierto}
                    aria-label="Mostrar u ocultar menú"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    id="menu-principal"
                    className={'collapse navbar-collapse' + (menuAbierto ? ' show' : '')}
                >
                    <div className="navbar-nav w-100">
                        <Link className="nav-link text-white" to="/" onClick={cerrarMenu}>
                            Inicio
                        </Link>
                        <Link className="nav-link text-white" to="/Productos" onClick={cerrarMenu}>
                            Productos
                        </Link>
                        <Link className="nav-link text-white" to="/Contacto" onClick={cerrarMenu}>
                            Contacto
                        </Link>
                        <Link className="nav-link text-white" to="/QuienesSomos" onClick={cerrarMenu}>
                            Quienes somos
                        </Link>
                        <Link className="nav-link text-white NavbarCarrito" to="/Carrito" onClick={cerrarMenu}>
                            <img src={carrito} height={20} width={20} alt="" />
                            Carrito
                        </Link>
                        <Link className="nav-link text-white NavbarIniciarSesion" to="/IniciarSesion" onClick={cerrarMenu}>
                            <img src={iniciarSesion} height={20} width={20} alt="" />
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
