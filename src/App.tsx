import { useEffect, useState } from 'react'
import { productos, aplicarOfertas } from './productos'
import type { Producto, ProductoCarrito } from './productos'
import Registro from './page/Registro'
import Categorias from './page/Categorias'
import Ofertas from './page/Ofertas'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { usuarioActual } from './usuarios'
import type { Usuario } from './usuarios'
import Administracion from './page/Administracion'
import './Estilos/General.css'
import Navbar from './components/organism/Navbar'
import Inicio from './page/Inicio'
import Productos from './page/Productos'
import ProductoDetalle from './page/ProductoDetalle'
import Contacto from './page/Contacto'
import Blog, { BlogGuitarra, BlogInstrumento } from './page/Blog'
import QuienesSomos from './page/QuienesSomos'
import Carrito from './page/Carrito'
import Pago from './page/Pago'
import Confirmacion from './page/Confirmacion'
import PagoFallido from './page/PagoFallido'
import IniciarSesion from './page/IniciarSesion'
import Footer from './components/organism/Footer'

const claveCarrito = 'sonidovivo-carrito'

function cargarCarrito(catalogo: Producto[]): ProductoCarrito[] {
    try {
        const guardado = JSON.parse(localStorage.getItem(claveCarrito) ?? '[]')

        if (!Array.isArray(guardado)) return []

        const carrito: ProductoCarrito[] = []

        // Recuperar los datos del catálogo y aceptar solo cantidades válidas.
        for (const producto of catalogo) {
            const item = guardado.find((item) =>
                item !== null && typeof item === 'object' && item.id === producto.id
            )

            if (
                item &&
                Number.isInteger(item.cantidad) &&
                item.cantidad >= 1 &&
                item.cantidad <= producto.stock
            ) {
                carrito.push({ ...producto, cantidad: item.cantidad })
            }
        }

        return carrito
    } catch {
        return []
    }
}

function guardarCarrito(carrito: ProductoCarrito[]) {
    try {
        const datos = carrito.map((producto) => ({
            id: producto.id,
            cantidad: producto.cantidad,
        }))

        localStorage.setItem(claveCarrito, JSON.stringify(datos))
    } catch (error) {
        console.warn('No se pudo guardar el carrito en este navegador.', error)
    }
}

function cargarCatalogo(): Producto[] {
  try {
    const guardado = JSON.parse(localStorage.getItem('sonidovivo.productos') ?? 'null')
    if (Array.isArray(guardado) && guardado.every((item) =>
      item && typeof item.id === 'string' && typeof item.catalogoId === 'number' &&
      typeof item.nombre === 'string' && typeof item.marca === 'string' &&
      typeof item.modelo === 'string' && typeof item.categoria === 'string' &&
      typeof item.descripcion === 'string' && typeof item.imagen === 'string' &&
      Number.isFinite(item.precio) && item.precio >= 0 && Number.isInteger(item.stock) && item.stock >= 0
    )) return guardado
  } catch {
    // Si los datos guardados no son válidos se usa el catálogo original.
  }
  return productos
}

function App() {
  const [catalogo, setCatalogo] = useState<Producto[]>(cargarCatalogo)
  const [usuario, setUsuario] = useState<Usuario | null>(usuarioActual)
  const catalogoTienda = aplicarOfertas(catalogo)
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => cargarCarrito(catalogoTienda))

  function guardarProductos(nuevos: Producto[]): boolean {
    try {
      localStorage.setItem('sonidovivo.productos', JSON.stringify(nuevos))
    } catch {
      return false
    }
    setCatalogo(nuevos)
    setCarrito((actual) => actual.flatMap((item) => {
      const producto = aplicarOfertas(nuevos).find((nuevo) => nuevo.id === item.id)
      if (!producto || producto.stock < 1) return []
      return [{ ...producto, cantidad: Math.min(item.cantidad, producto.stock) }]
    }))
    return true
  }

  function cerrarSesion() {
    try {
      sessionStorage.removeItem('sonidovivo.sesion')
    } catch {
      // La sesión visible se cierra aunque el navegador bloquee el almacenamiento.
    }
    setUsuario(null)
  }

  useEffect(() => {
    guardarCarrito(carrito)
  }, [carrito])

  function agregarProducto(producto: Producto) {
    if (producto.stock < 1) return

    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id)

      if (existente) {
        if (existente.cantidad >= existente.stock) return actual

        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...actual, { ...producto, cantidad: 1 }]
    })
  }

  function cambiarCantidad(id: string, cantidad: number) {
    if (!Number.isInteger(cantidad) || cantidad < 1) return

    setCarrito((actual) => actual.map((item) => {
      if (item.id !== id || cantidad > item.stock) return item
      return { ...item, cantidad }
    }))
  }

  function eliminarProducto(id: string) {
    setCarrito((actual) => actual.filter((item) => item.id !== id))
  }

  return (
    <>
    <Navbar usuario={usuario} onCerrarSesion={cerrarSesion}/>
    
    <main className="FondoEstilo">
      <Routes>
        <Route path='/' element={<Inicio productos={catalogoTienda}/>} />
        <Route path='/Registro' element={<Registro/>} />
        <Route
          path='/Productos'
          element={<Productos productos={catalogoTienda} carrito={carrito} onAgregarProducto={agregarProducto}/>}
        />
        <Route
          path='/Productos/:id'
          element={<ProductoDetalle productos={catalogoTienda} carrito={carrito} onAgregarProducto={agregarProducto}/>}
        />
        <Route path='/Categorias' element={<Categorias productos={catalogo}/>} />
        <Route path='/Ofertas' element={<Ofertas productos={catalogoTienda} carrito={carrito} onAgregarProducto={agregarProducto}/>} />
        <Route path='/Contacto' element={<Contacto/>} />
        <Route path='/Blog' element={<Blog/>} />
        <Route path='/Blog/guitarra' element={<BlogGuitarra/>} />
        <Route path='/Blog/instrumento' element={<BlogInstrumento/>} />
        <Route path='/QuienesSomos' element={<QuienesSomos/>} />
        <Route
          path='/Carrito'
          element={<Carrito carrito={carrito} onCambiarCantidad={cambiarCantidad} onEliminarProducto={eliminarProducto}/>}
        />
        <Route path='/IniciarSesion' element={<IniciarSesion onIniciarSesion={setUsuario}/>} />
        <Route
          path='/Pago'
          element={<Pago usuario={usuario} carrito={carrito} onPagoConfirmado={() => setCarrito([])}/>}
        />
        <Route path='/Confirmacion' element={<Confirmacion/>} />
        <Route path='/PagoFallido' element={<PagoFallido/>} />
        <Route path='/Admin/*' element={usuario?.tipoUsuario === 'Administrador'
          ? <Administracion usuario={usuario} catalogo={catalogo} onGuardarProductos={guardarProductos}/>
          : <Navigate to="/IniciarSesion" replace />} />
        <Route path='*' element={<section className="container py-4"><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>} />
      </Routes>
    </main>

    <Footer/>

    </>
  )
}

export default App