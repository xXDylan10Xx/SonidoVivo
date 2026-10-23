
import { Link } from "react-router-dom";

interface BotonProps{
    id:number;
}


function Boton({id}: BotonProps){
    return (
        <Link to={`/productos/${id}`}
        className="btn btn-primary"
        >Ver producto</Link>
    )

}


export default Boton;

