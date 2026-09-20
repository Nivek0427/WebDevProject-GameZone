import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

import "./GameCard.css";

export function GameCard({ producto, categorias }) {
    const { agregarAlCarrito } = useCart();
    const { mostrarNotificacion } = useNotification();

    const categoria = categorias.find(
        (categoria) => categoria.id === producto.categoria
    );

    const manejarAgregar = (event) => {
        event.preventDefault();
        event.stopPropagation();

        agregarAlCarrito(producto);

        mostrarNotificacion(
            `${producto.nombre} agregado al carrito`
        );
    };

    return (
        <article className="game-card">

            <Link
                to={`/productos/${producto.id}`}
                className="game-card-image-link"
                aria-label={`Ver detalles de ${producto.nombre}`}
            >
                <div className="game-card-image-container">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="game-card-image"
                    />

                    <span className="game-card-label">
                        {categoria ? categoria.nombre : "Sin categoría"}
                    </span>
                </div>
            </Link>

            <div className="game-card-content">

                <Link to={`/productos/${producto.id}`} className="game-card-title-link">
                    <h3 className="game-card-title">
                        {producto.nombre}
                    </h3>
                </Link>

                <p className="game-card-description">
                    {producto.descripcion}
                </p>

                <div className="game-card-footer">

                    <div>
                        <span className="game-card-price">
                            ${Number(producto.precio).toLocaleString("es-CO")}
                        </span>
                    </div>

                    <div className="game-card-actions">
                        <Link
                            to={`/productos/${producto.id}`}
                            className="game-card-button game-card-link-button"
                        >
                            Ver juego
                        </Link>

                        <button
                            type="button"
                            className="game-card-button"
                            onClick={manejarAgregar}
                            disabled={Number(producto.stock) <= 0}
                        >
                            🛒 Agregar
                        </button>
                    </div>

                </div>

            </div>
        </article>
    );
}