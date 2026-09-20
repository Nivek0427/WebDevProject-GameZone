import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

import "./Carrito.css";

export function Carrito() {
    const {
        carrito,
        total,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito
    } = useCart();

    const { autenticado } = useAuth();

    const navigate = useNavigate();
    const { mostrarNotificacion } = useNotification();

    const irAlCheckout = () => {
        if (!autenticado) {
            navigate("/login", {
                state: {
                    from: "/checkout"
                }
            });

            return;
        }

        navigate("/checkout");
    };

    if (carrito.length === 0) {
        return (
            <div className="carrito-page">

                <div className="carrito-container">

                    <div className="carrito-vacio">
                        <div className="carrito-vacio-icon">
                            🛒
                        </div>

                        <h1>
                            Tu carrito está vacío
                        </h1>

                        <p>
                            Agrega algunos juegos para comenzar tu compra.
                        </p>

                        <Link
                            to="/productos"
                            className="carrito-button"
                        >
                            Ver productos
                        </Link>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="carrito-page">

            <div className="carrito-container">

                <div className="carrito-header">
                    <h1>Mi carrito</h1>

                    <button
                        type="button"
                        className="carrito-vaciar"
                        onClick={() => {
                            vaciarCarrito();

                            mostrarNotificacion(
                                "Carrito vaciado correctamente"
                            );
                        }}
                    >
                        Vaciar carrito
                    </button>
                </div>

                <div className="carrito-content">

                    <div className="carrito-productos">

                        {carrito.map((producto) => (
                            <div
                                className="carrito-item"
                                key={producto.id}
                            >

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="carrito-item-image"
                                />

                                <div className="carrito-item-info">

                                    <h3>
                                        {producto.nombre}
                                    </h3>

                                    <p>
                                        ${Number(producto.precio).toLocaleString("es-CO")}
                                    </p>

                                </div>

                                <div className="carrito-item-cantidad">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            disminuirCantidad(producto.id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {producto.cantidad}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            aumentarCantidad(producto.id)
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <div className="carrito-item-total">
                                    $
                                    {(
                                        Number(producto.precio) *
                                        producto.cantidad
                                    ).toLocaleString("es-CO")}
                                </div>

                                <button
                                    type="button"
                                    className="carrito-item-eliminar"
                                    onClick={() => {
                                        eliminarDelCarrito(producto.id);

                                        mostrarNotificacion(
                                            `${producto.nombre} eliminado del carrito`
                                        );
                                    }}
                                >
                                    🗑
                                </button>

                            </div>
                        ))}

                    </div>

                    <aside className="carrito-resumen">

                        <h2>
                            Resumen
                        </h2>

                        <div className="carrito-resumen-linea">
                            <span>
                                Productos
                            </span>

                            <span>
                                {carrito.reduce(
                                    (total, producto) =>
                                        total + producto.cantidad,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="carrito-resumen-total">
                            <span>
                                Total
                            </span>

                            <strong>
                                ${total.toLocaleString("es-CO")}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="carrito-checkout"
                            onClick={irAlCheckout}
                        >
                            Continuar compra
                        </button>

                    </aside>

                </div>

            </div>

        </div>
    );
}