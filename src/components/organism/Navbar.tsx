import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Usuario } from '../../usuarios'
import carrito from '../../Imagenes/Inicio/Carrito.png'
import '../../Estilos/Navbar.css'

function Navbar({ usuario, onCerrarSesion }: { usuario: Usuario | null; onCerrarSesion: () => void }) {
    const [menuAbierto, setMenuAbierto] = useState(false)

    function cerrarMenu() {
        setMenuAbierto(false)
    }

    return (
        <nav className="navbar navbar-expand-lg NavbarEstilo" aria-label="Navegación principal">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={cerrarMenu}>SonidoVivo</Link>
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
                <div id="menu-principal" className={'collapse navbar-collapse' + (menuAbierto ? ' show' : '')}>
                    <div className="navbar-nav w-100">
                        <Link className="nav-link" to="/" onClick={cerrarMenu}>Inicio</Link>
                        <Link className="nav-link" to="/Productos" onClick={cerrarMenu}>Productos</Link>
                        <Link className="nav-link" to="/Categorias" onClick={cerrarMenu}>Categorías</Link>
                        <Link className="nav-link" to="/Ofertas" onClick={cerrarMenu}>Ofertas</Link>
                        <Link className="nav-link" to="/QuienesSomos" onClick={cerrarMenu}>Nosotros</Link>
                        <Link className="nav-link" to="/Blog" onClick={cerrarMenu}>Blog</Link>
                        <Link className="nav-link" to="/Contacto" onClick={cerrarMenu}>Contacto</Link>
                        {usuario?.tipoUsuario === 'Administrador' && <Link className="nav-link" to="/Admin" onClick={cerrarMenu}>Administración</Link>}
                        {usuario
                            ? <button type="button" className="nav-link NavbarIniciarSesion" onClick={() => { onCerrarSesion(); cerrarMenu() }}>Cerrar sesión</button>
                            : <Link className="nav-link NavbarIniciarSesion" to="/IniciarSesion" onClick={cerrarMenu}>Iniciar sesión</Link>}
                        <Link className="nav-link NavbarCarrito" to="/Carrito" onClick={cerrarMenu}>
                            <img src={carrito} height={35} width={35} alt="" /> Carrito
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
