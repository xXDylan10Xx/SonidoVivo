import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { productos } from '../productos'
import type { Producto } from '../productos'
import { cargarUsuarios, guardarUsuarios, regionesComunas, validarUsuario } from '../usuarios'
import type { Usuario } from '../usuarios'
import '../Estilos/Administracion.css'

interface Props {
    usuario: Usuario
    catalogo: Producto[]
    onGuardarProductos: (productos: Producto[]) => boolean
}

function Administracion({ usuario, catalogo, onGuardarProductos }: Props) {
    const ruta = useLocation().pathname.toLowerCase()
    const [usuarios, setUsuarios] = useState<Usuario[]>(cargarUsuarios)
    const [producto, setProducto] = useState<Producto | null>(null)
    const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null)
    const [nuevoProducto, setNuevoProducto] = useState(false)
    const [nuevoUsuario, setNuevoUsuario] = useState(false)
    const [mensaje, setMensaje] = useState('')

    function guardarProducto(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        if (!producto) return
        if (!producto.id.trim() || !producto.nombre.trim() || !producto.marca.trim() ||
            !producto.modelo.trim() || !producto.categoria.trim() || !producto.descripcion.trim() ||
            !Number.isFinite(producto.precio) || producto.precio < 0 ||
            !Number.isInteger(producto.stock) || producto.stock < 0) {
            setMensaje('Completa los datos y utiliza un precio y stock válidos.')
            return
        }
        if (nuevoProducto && catalogo.some((item) => item.id.toLowerCase() === producto.id.trim().toLowerCase())) {
            setMensaje('Ya existe un producto con ese código.')
            return
        }
        const actualizado = { ...producto, id: producto.id.trim() }
        const lista = nuevoProducto ? [...catalogo, actualizado] : catalogo.map((item) => item.id === producto.id ? actualizado : item)
        if (!onGuardarProductos(lista)) {
            setMensaje('No se pudieron guardar los productos en este navegador.')
            return
        }
        setProducto(null)
        setMensaje('Producto guardado correctamente.')
    }

    function guardarUsuario(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        if (!usuarioEditado) return
        const error = validarUsuario(usuarioEditado, usuarios)
        if (error) { setMensaje(error); return }
        if (usuarioEditado.id === usuario.id && usuarioEditado.tipoUsuario !== 'Administrador') {
            setMensaje('No puedes quitar el rol de administrador de tu propia cuenta.')
            return
        }
        const lista = nuevoUsuario ? [...usuarios, usuarioEditado] : usuarios.map((item) => item.id === usuarioEditado.id ? usuarioEditado : item)
        if (!guardarUsuarios(lista)) { setMensaje('No se pudieron guardar los usuarios en este navegador.'); return }
        setUsuarios(lista)
        setUsuarioEditado(null)
        setMensaje('Usuario guardado correctamente.')
    }

    function eliminarProducto(item: Producto) {
        if (!window.confirm('¿Eliminar ' + item.nombre + ' del catálogo?')) return
        if (!onGuardarProductos(catalogo.filter((actual) => actual.id !== item.id))) {
            setMensaje('No se pudieron guardar los productos en este navegador.')
            return
        }
        setMensaje('Producto eliminado correctamente.')
    }

    function crearProducto() {
        setProducto({ id: '', catalogoId: Math.max(0, ...catalogo.map((item) => item.catalogoId)) + 1,
            nombre: '', marca: '', modelo: '', categoria: '', precio: 0, stock: 0, descripcion: '', imagen: (catalogo[0] ?? productos[0]).imagen })
        setNuevoProducto(true)
        setMensaje('')
    }

    function crearUsuario() {
        setUsuarioEditado({ id: Math.max(0, ...usuarios.map((item) => item.id)) + 1, run: '', nombre: '', apellidos: '',
            correo: '', region: '', comuna: '', direccion: '', clave: '', tipoUsuario: 'Cliente' })
        setNuevoUsuario(true)
        setMensaje('')
    }

    return (
        <section className="administracion">
            <header className="admin-cabecera">
                <div>
                    <p className="admin-etiqueta">SONIDO VIVO / ADMINISTRACIÓN</p>
                    <h1>Administración</h1>
                    <p>Bienvenido, {usuario.nombre}. Gestiona la información de la tienda desde aquí.</p>
                </div>
                <span className="admin-usuario">Administrador</span>
            </header>

            <p className="admin-aviso">Panel de demostración: los cambios se guardan solo en este navegador. Usa datos y contraseñas de ejemplo.</p>
            <nav className="admin-navegacion" aria-label="Administración">
                <Link className={ruta === '/admin' ? 'activo' : ''} to="/Admin" aria-current={ruta === '/admin' ? 'page' : undefined}>Panel general</Link>
                <Link className={ruta === '/admin/productos' ? 'activo' : ''} to="/Admin/productos" aria-current={ruta === '/admin/productos' ? 'page' : undefined}>Productos</Link>
                <Link className={ruta === '/admin/usuarios' ? 'activo' : ''} to="/Admin/usuarios" aria-current={ruta === '/admin/usuarios' ? 'page' : undefined}>Usuarios</Link>
            </nav>
            {mensaje && <p className="alert alert-info" role="status">{mensaje}</p>}
            {ruta === '/admin' && (
                <div className="admin-resumen">
                    <div className="admin-introduccion">
                        <h2>Resumen de la tienda</h2>
                        <p>Consulta el catálogo y administra las cuentas registradas en este navegador.</p>
                    </div>
                    <div className="admin-indicadores">
                        <article className="admin-indicador">
                            <p>Productos</p>
                            <strong>{catalogo.length}</strong>
                            <span>en el catálogo</span>
                        </article>
                        <article className="admin-indicador">
                            <p>Usuarios</p>
                            <strong>{usuarios.length}</strong>
                            <span>cuentas registradas</span>
                        </article>
                        <article className="admin-indicador">
                            <p>Sin stock</p>
                            <strong>{catalogo.filter((item) => item.stock === 0).length}</strong>
                            <span>productos agotados</span>
                        </article>
                    </div>
                    <h2 className="admin-subtitulo">Accesos rápidos</h2>
                    <div className="admin-accesos">
                        <Link className="admin-acceso" to="/Admin/productos">
                            <strong>Administrar productos</strong>
                            <span>Agrega productos, actualiza precios y revisa el stock.</span>
                            <span className="admin-enlace">Ir a productos →</span>
                        </Link>
                        <Link className="admin-acceso" to="/Admin/usuarios">
                            <strong>Administrar usuarios</strong>
                            <span>Consulta las cuentas y modifica sus datos o roles.</span>
                            <span className="admin-enlace">Ir a usuarios →</span>
                        </Link>
                    </div>
                </div>
            )}

            {ruta === '/admin/productos' && <>
                <div className="admin-seccion"><div><h2>Productos</h2><p>Gestiona los productos y la disponibilidad del catálogo.</p></div>
                {!producto && <button type="button" className="btn btn-primary" onClick={crearProducto}>Agregar producto</button>}</div>
                {producto && <form onSubmit={guardarProducto} className="card card-body mb-4 admin-formulario">
                    <h3>{nuevoProducto ? 'Agregar producto' : 'Editar producto'}</h3>
                    <label className="form-label">Código<input className="form-control" value={producto.id} disabled={!nuevoProducto} onChange={(e) => setProducto({ ...producto, id: e.target.value })} /></label>
                    <label className="form-label">Nombre<input className="form-control" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} /></label>
                    <label className="form-label">Marca<input className="form-control" value={producto.marca} onChange={(e) => setProducto({ ...producto, marca: e.target.value })} /></label>
                    <label className="form-label">Modelo<input className="form-control" value={producto.modelo} onChange={(e) => setProducto({ ...producto, modelo: e.target.value })} /></label>
                    <label className="form-label">Categoría<input className="form-control" value={producto.categoria} onChange={(e) => setProducto({ ...producto, categoria: e.target.value })} /></label>
                    <label className="form-label">Descripción<textarea className="form-control" value={producto.descripcion} onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })} /></label>
                    <label className="form-label">Precio<input className="form-control" type="number" min="0" value={producto.precio} onChange={(e) => setProducto({ ...producto, precio: Number(e.target.value) })} /></label>
                    <label className="form-label">Stock<input className="form-control" type="number" min="0" step="1" value={producto.stock} onChange={(e) => setProducto({ ...producto, stock: Number(e.target.value) })} /></label>
                    <label className="form-label">Imagen de referencia<select className="form-select" value={producto.imagen} onChange={(e) => setProducto({ ...producto, imagen: e.target.value })}>{catalogo.map((item) => <option key={item.id} value={item.imagen}>{item.nombre}</option>)}</select></label>
                    <div className="d-flex gap-2"><button className="btn btn-dark" type="submit">Guardar</button><button className="btn btn-outline-dark" type="button" onClick={() => setProducto(null)}>Cancelar</button></div>
                </form>}
                <div className="table-responsive admin-tabla"><table className="table table-hover align-middle mb-0"><thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acción</th></tr></thead><tbody>
                    {catalogo.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.nombre}</td><td>{item.precio.toLocaleString('es-CL')}</td><td>{item.stock}</td><td><button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={() => { setProducto(item); setNuevoProducto(false); setMensaje('') }}>Editar</button><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(item)}>Eliminar</button></td></tr>)}
                </tbody></table></div>
            </>}

            {ruta === '/admin/usuarios' && <>
                <div className="admin-seccion"><div><h2>Usuarios</h2><p>Revisa y administra las cuentas de demostración.</p></div>
                {!usuarioEditado && <button type="button" className="btn btn-primary" onClick={crearUsuario}>Agregar usuario</button>}</div>
                {usuarioEditado && <form onSubmit={guardarUsuario} className="card card-body mb-4 admin-formulario">
                    <h3>{nuevoUsuario ? 'Agregar usuario' : 'Editar usuario'}</h3>
                    <label className="form-label">RUN<input className="form-control" value={usuarioEditado.run} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, run: e.target.value })} /></label>
                    <label className="form-label">Nombre<input className="form-control" value={usuarioEditado.nombre} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })} /></label>
                    <label className="form-label">Apellidos<input className="form-control" value={usuarioEditado.apellidos} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, apellidos: e.target.value })} /></label>
                    <label className="form-label">Correo<input className="form-control" type="email" value={usuarioEditado.correo} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, correo: e.target.value })} /></label>
                    <label className="form-label">Región<select className="form-select" value={usuarioEditado.region} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, region: e.target.value, comuna: '' })}><option value="">Seleccione región</option>{Object.keys(regionesComunas).map((region) => <option key={region}>{region}</option>)}</select></label>
                    <label className="form-label">Comuna<select className="form-select" value={usuarioEditado.comuna} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, comuna: e.target.value })}><option value="">Seleccione comuna</option>{(regionesComunas[usuarioEditado.region] ?? []).map((comuna) => <option key={comuna}>{comuna}</option>)}</select></label>
                    <label className="form-label">Dirección<input className="form-control" value={usuarioEditado.direccion} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, direccion: e.target.value })} /></label>
                    <label className="form-label">Contraseña de ejemplo<input className="form-control" type="password" value={usuarioEditado.clave} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, clave: e.target.value })} /></label>
                    <label className="form-label">Tipo de usuario<select className="form-select" value={usuarioEditado.tipoUsuario} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, tipoUsuario: e.target.value as Usuario['tipoUsuario'] })}><option>Cliente</option><option>Administrador</option></select></label>
                    <div className="d-flex gap-2"><button className="btn btn-dark" type="submit">Guardar</button><button className="btn btn-outline-dark" type="button" onClick={() => setUsuarioEditado(null)}>Cancelar</button></div>
                </form>}
                <div className="table-responsive admin-tabla"><table className="table table-hover align-middle mb-0"><thead><tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Tipo</th><th>Acción</th></tr></thead><tbody>
                    {usuarios.map((item) => <tr key={item.id}><td>{item.run}</td><td>{item.nombre} {item.apellidos}</td><td>{item.correo}</td><td>{item.tipoUsuario}</td><td><button type="button" className="btn btn-outline-dark btn-sm" onClick={() => { setUsuarioEditado(item); setNuevoUsuario(false); setMensaje('') }}>Editar</button></td></tr>)}
                </tbody></table></div>
            </>}
        </section>
    )
}

export default Administracion