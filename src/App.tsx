
import { useState } from "react";
import CampoFormulario from "./Componentes/Moleculas/CampoFormulario";
import Button from "./Componentes/Atomos/Boton";
function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");

  function validarFormulario() {
    if (!nombre.trim() || !correo.trim()) {
      setError("Debes completar todos los campos");
    } else {
      setError("");
      alert("Formulario completado correctamente");
    }
  }

  return (
    <div className="container mt-5">
      <h1>SonidoVivo</h1>
      <h3>Formulario de registro</h3>

      <CampoFormulario
        id="nombre"
        etiqueta="Nombre"
        type="text"
        placeholder="Ingresa tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <CampoFormulario
        id="correo"
        etiqueta="Correo electrónico"
        type="email"
        placeholder="Ingresa tu correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        error={error}
      />

      <Button
        texto="Registrarse"
        variante="success"
        onClick={validarFormulario}
      />
    </div>
  );
}

export default App;
