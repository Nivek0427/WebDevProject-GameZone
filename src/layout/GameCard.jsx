import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

import "./GameCard.css";

export function GameCard({ producto, categorias }) {
    const { agregarAlCarrito } = useCart();
    const navigate = useNavigate();
    const { mostrarNotificacion } = useNotification();

    const categoria = categorias.find(
        (categoria) => categoria.id === producto.categoria
    );

    const manejarAgregar = () => {
        agregarAlCarrito(producto);

        mostrarNotificacion(
            `${producto.nombre} agregado al carrito`
        );
    };

    return (
        <article className="game-card">

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

            <div className="game-card-content">

                <h3 className="game-card-title">
                    {producto.nombre}
                </h3>

                <p className="game-card-description">
                    {producto.descripcion}
                </p>

                <div className="game-card-footer">

                    <div>
                        <span className="game-card-price">
                            ${Number(producto.precio).toLocaleString("es-CO")}
                        </span>

                        <span className="game-card-stock">
                            Stock: {producto.stock}
                        </span>
                    </div>

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
        </article>
    );
}