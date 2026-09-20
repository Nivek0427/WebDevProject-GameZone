import { Link } from "react-router-dom";
import "./CompraExitosa.css";

export function CompraExitosa() {
    return (
        <div className="compra-exitosa">
            <div className="compra-exitosa-card">
                <span>🎉</span>
                <h1>¡Compra realizada correctamente!</h1>
                <p>Tu pedido fue registrado exitosamente.</p>
                <Link to="/productos">Seguir comprando</Link>
            </div>
        </div>
    );
}
