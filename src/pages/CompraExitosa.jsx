import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import "./CompraExitosa.css";

export function CompraExitosa() {

    const { mostrarNotificacion } = useNotification();

    useEffect(() => {
        mostrarNotificacion(
            "¡Compra realizada correctamente!"
        );
    }, []);

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
