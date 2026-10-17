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
  return (
    <>
    <Navbar/>
    
    <main className="FondoEstilo">

      <Routes>
        <Route
        path='/'
        element={<Inicio/>}
        />  
      </Routes>

      <Routes>
        <Route
        path='/Productos'
        element={<Productos/>}
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
        element={<Carrito/>}
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
