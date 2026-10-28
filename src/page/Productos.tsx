import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CardProducto from '../components/molecule/CardProducto'

import type { Producto, ProductoCarrito } from '../productos'
import banner from '../Imagenes/Banners/BannerProductosDisponibles.png'
import '../Estilos/Catalogo.css'

interface ProductosProps {
    productos: Producto[]
    carrito: ProductoCarrito[]
    onAgregarProducto: (producto: Producto) => void
}

const marcas = ['Yamaha', 'Fender', 'Epiphone']

function Productos({ productos, carrito, onAgregarProducto }: ProductosProps) {
    const categorias = [...new Set(productos.map((producto) => producto.categoria))]
    const [parametros, setParametros] = useSearchParams()
    const [precioMaximo, setPrecioMaximo] = useState(parametros.get('precioMaximo') ?? '')
    const [error, setError] = useState('')
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

    const categoriasSeleccionadas = parametros.getAll('categoria')
    const marcasSeleccionadas = parametros.getAll('marca')
    const precioAplicado = parametros.get('precioMaximo')
    const orden = parametros.get('orden') ?? ''

    const resultado = productos.filter((producto) => {
        const coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(producto.categoria)
        const coincideMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca)
        const coincidePrecio = precioAplicado === null || producto.precio <= Number(precioAplicado)
        return coincideCategoria && coincideMarca && coincidePrecio
    })

    if (orden === 'precio-asc') resultado.sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') resultado.sort((a, b) => b.precio - a.precio)
    if (orden === 'nombre-asc') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    if (orden === 'nombre-desc') resultado.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))

    function cambiarFiltro(tipo: string, valor: string, seleccionado: boolean) {
        const nuevos = new URLSearchParams(parametros)
        const valores = nuevos.getAll(tipo).filter((actual) => actual !== valor)
        nuevos.delete(tipo)
        if (seleccionado) valores.push(valor)
        valores.forEach((actual) => nuevos.append(tipo, actual))
        setParametros(nuevos)
    }

    function aplicarPrecio(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        const valor = precioMaximo.trim()
        if (valor !== '' && (!Number.isFinite(Number(valor)) || Number(valor) < 0)) {
            setError('Ingresa un precio máximo válido.')
            return
        }

        const nuevos = new URLSearchParams(parametros)
        if (valor === '') nuevos.delete('precioMaximo')
        else nuevos.set('precioMaximo', valor)
        setError('')
        setParametros(nuevos)
    }

    function limpiarFiltros() {
        setPrecioMaximo('')
        setError('')
        setParametros(new URLSearchParams())
    }

    function cambiarOrden(valor: string) {
        const nuevos = new URLSearchParams(parametros)
        if (valor) nuevos.set('orden', valor)
        else nuevos.delete('orden')
        setParametros(nuevos)
    }

    return (
        <section className="pagina-catalogo" aria-labelledby="titulo-productos">
            <img className="portada-catalogo" src={banner} alt="Productos disponibles en SonidoVivo" />
            <div className="zona-catalogo">
                <aside className="filtros">
                    <h1 id="titulo-productos" className="h3">Productos</h1>
                    <button
                        type="button"
                        className="btn btn-outline-dark d-md-none mb-3"
                        aria-controls="contenido-filtros"
                        aria-expanded={filtrosAbiertos}
                        onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                    >
                        {filtrosAbiertos ? 'Ocultar filtros' : 'Mostrar filtros'}
                    </button>

                    <div id="contenido-filtros" className={filtrosAbiertos ? 'contenido-filtros abierto' : 'contenido-filtros'}>
                        <h2 className="h4">Filtros</h2>

                        <h3 className="h5">Categoría</h3>
                        {categorias.map((categoria) => (
                            <label className="etiqueta-filtro" key={categoria}>
                                <input
                                    type="checkbox"
                                    value={categoria}
                                    checked={categoriasSeleccionadas.includes(categoria)}
                                    onChange={(evento) => cambiarFiltro('categoria', categoria, evento.target.checked)}
                                />{' '}{categoria}
                            </label>
                        ))}

                        <hr />
                        <h3 className="h5">Marca</h3>
                        {marcas.map((marca) => (
                            <label className="etiqueta-filtro" key={marca}>
                                <input
                                    type="checkbox"
                                    value={marca}
                                    checked={marcasSeleccionadas.includes(marca)}
                                    onChange={(evento) => cambiarFiltro('marca', marca, evento.target.checked)}
                                />{' '}{marca}
                            </label>
                        ))}

                        <hr />
                        <form onSubmit={aplicarPrecio} noValidate>
                            <label htmlFor="precio-maximo" className="form-label">Precio máximo</label>
                            <input
                                id="precio-maximo"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Ej: 300000"
                                value={precioMaximo}
                                onChange={(evento) => setPrecioMaximo(evento.target.value)}
                            />
                            {error && <p className="text-danger" role="alert">{error}</p>}
                            <button type="submit" className="btn btn-dark mt-3">Filtrar</button>
                        </form>
                        <button id="limpiar-filtros" type="button" className="btn btn-outline-dark mt-2" onClick={limpiarFiltros}>
                            Limpiar filtros
                        </button>
                        <Link to="/Carrito" className="btn btn-outline-dark mt-2">Ver carrito</Link>
                    </div>
                </aside>

                <div className="resultados-catalogo">
                    <div className="barra-catalogo">
                        <label htmlFor="orden-catalogo">Ordenar por</label>
                        <select
                            id="orden-catalogo"
                            className="form-select selector-orden"
                            value={orden}
                            onChange={(evento) => cambiarOrden(evento.target.value)}
                        >
                            <option value="">Orden original</option>
                            <option value="precio-asc">Precio: menor a mayor</option>
                            <option value="precio-desc">Precio: mayor a menor</option>
                            <option value="nombre-asc">Nombre: A a Z</option>
                            <option value="nombre-desc">Nombre: Z a A</option>
                        </select>
                    </div>

                    <div className="catalogo-orden">
                        {resultado.length === 0 && <p role="status">No hay productos con estos filtros.</p>}
                        {resultado.map((producto) => (
                            <CardProducto
                                key={producto.id}
                                producto={producto}
                                cantidad={carrito.find((item) => item.id === producto.id)?.cantidad ?? 0}
                                onAgregarProducto={onAgregarProducto}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Productos
