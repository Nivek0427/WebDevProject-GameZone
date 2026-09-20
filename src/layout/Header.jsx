import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, UserRound } from "lucide-react";
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

                <Link to="/" className="header-logo" aria-label="GameZone inicio">
                    <img src="/image/logo_header.PNG" alt="GameZone" />
                </Link>

                <div className="header-search">
                    <Search size={18} aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Buscar juegos, tarjetas y más..."
                        aria-label="Buscar productos"
                    />

                    <button type="button" aria-label="Buscar">Buscar</button>
                </div>

                <div className="header-actions">

                    {autenticado ? (
                        <div className="header-user">

                            <Link
                                to="/mis-compras"
                                className="header-action"
                            >
                                <span className="header-account-icon">
                                    <UserRound size={20} />
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
                            <span className="header-account-icon">
                                <UserRound size={20} />
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
                        <ShoppingCart size={22} />

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