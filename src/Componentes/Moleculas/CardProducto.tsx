import Boton from "../Atomos/Boton";


interface CardProp{
    id:number;
    titulo: string;
    descripcion:string;
    precio:number;
    imagen:string;

}



function CardProducto({id,titulo, descripcion, precio,imagen} : CardProp){
    return(
        <div className="card" style ={{width : '21rem'}}>
            <img
            src={imagen}
            className="card-img-top"
            alt={titulo}
            style={{height: '200px',objectFit:'contain'}}
        />

        <div className='card-body d-flex flex-column'>
            <h5 className='card-title'>
                {titulo}
            </h5>

            <p className='card-text'>
                {descripcion}
            </p>

            <p className='card-text'>
                {precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })}
            </p>
            <div className='mt-auto'>
            <Boton id={id} />
            </div>
        </div>
        

    </div>
    )
}



export default CardProducto;
     