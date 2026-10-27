import { useState } from 'react'
import type { Producto, ProductoCarrito } from './Datos/productos'
import Registro from './Paginas/Registro'
import { Routes,Route } from 'react-router-dom'
import './Estilos/General.css'
import Navbar from './Componentes/Organismos/Navbar'
import Inicio from './Paginas/Inicio'
import Productos from './Paginas/Productos'
import Contacto from './Paginas/Contacto'
import QuienesSomos from './Paginas/QuienesSomos'
import Carrito from './Paginas/Carrito'
import IniciarSesion from './Paginas/IniciarSesion'
import Footer from './Componentes/Organismos/Footer'

function App() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])

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
    <Navbar/>
    
    <main className="FondoEstilo">
      <Routes><Route path='/Registro' element={<Registro/>} /></Routes>

      <Routes>
        <Route
        path='/'
        element={<Inicio/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/Productos'
        element={<Productos carrito={carrito} onAgregarProducto={agregarProducto}/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/Contacto'
        element={<Contacto/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/QuienesSomos'
        element={<QuienesSomos/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/Carrito'
        element={<Carrito carrito={carrito} onCambiarCantidad={cambiarCantidad} onEliminarProducto={eliminarProducto}/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/IniciarSesion'
        element={<IniciarSesion/>}
        />  
      </Routes>

    </main>

    <Footer/>

    </>
  )
}

export default App