import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import "./Header.css";

export function Header() {
    const { usuario, autenticado, cerrarSesion } = useAuth();
    const { cantidadTotal } = useCart();

    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header-container">

                <Link to="/" className="header-logo">
                    <span className="logo-icon">🎮</span>
                    <span className="logo-text">GameZone</span>
                </Link>

                <div className="header-search">
                    <input
                        type="text"
                        placeholder="Buscar juegos, tarjetas y más..."
                    />

                    <button type="button">
                        🔍
                    </button>
                </div>

                <div className="header-actions">

                    {autenticado ? (
                        <div className="header-user">

                            <Link
                                to="/mis-compras"
                                className="header-action"
                            >
                                <span className="action-icon">
                                    👤
                                </span>

                                <span className="action-content">
                                    <small>
                                        Hola, {usuario.nombre}
                                    </small>

                                    <strong>
                                        Mi cuenta
                                    </strong>
                                </span>
                            </Link>

                            <button
                                type="button"
                                className="header-logout"
                                onClick={manejarCerrarSesion}
                            >
                                Salir
                            </button>

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="header-action"
                        >
                            <span className="action-icon">
                                👤
                            </span>

                            <span className="action-content">
                                <small>
                                    Hola, jugador
                                </small>

                                <strong>
                                    Iniciar sesión
                                </strong>
                            </span>
                        </Link>
                    )}

                    <Link
                        to="/carrito"
                        className="header-cart"
                    >
                        <span className="cart-icon">
                            🛒
                        </span>

                        {cantidadTotal > 0 && (
                            <span className="cart-count">
                                {cantidadTotal}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </header>
    );
}