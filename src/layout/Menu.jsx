import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerCategorias } from "../services/categoriaService";

import "./Menu.css";

export function Menu() {

    const [categorias, setCategorias] = useState([]);
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarAdministracion, setMostrarAdministracion] = useState(false);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();

            setCategorias(data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    return (
        <nav className="menu">

            <div className="menu-container">

                <Link
                    to="/"
                    className="menu-item"
                >
                    Inicio
                </Link>

                {/* CATEGORÍAS */}

                <div className="menu-categories-wrapper">

                    <button
                        className="menu-item menu-categories"
                        onClick={() =>
                            setMostrarCategorias(!mostrarCategorias)
                        }
                    >
                        ☰ Categorías

                        <span className="categories-arrow">
                            {mostrarCategorias ? "▲" : "▼"}
                        </span>
                    </button>

                    {mostrarCategorias && (
                        <div className="categories-dropdown">

                            <div className="categories-dropdown-title">
                                Categorías
                            </div>

                            {categorias.length === 0 ? (
                                <div className="categories-empty">
                                    No hay categorías disponibles
                                </div>
                            ) : (
                                categorias.map((categoria) => (
                                    <Link
                                        to={`/productos?categoria=${categoria.id}`}
                                        key={categoria.id}
                                        className="category-dropdown-item"
                                        onClick={() =>
                                            setMostrarCategorias(false)
                                        }
                                    >
                                        {categoria.nombre}
                                    </Link>
                                ))
                            )}

                        </div>
                    )}

                </div>

                <Link
                    to="/productos"
                    className="menu-item"
                >
                    Juegos
                </Link>

                <Link
                    to="/productos"
                    className="menu-item"
                >
                    Ofertas
                </Link>

                <Link
                    to="/productos"
                    className="menu-item"
                >
                    Tarjetas de regalo
                </Link>

                {/* ADMINISTRACIÓN */}

                <div className="menu-admin-wrapper">

                    <button
                        className="menu-item menu-admin-button"
                        onClick={() =>
                            setMostrarAdministracion(
                                !mostrarAdministracion
                            )
                        }
                    >
                        ⚙ Administración

                        <span className="admin-arrow">
                            {mostrarAdministracion ? "▲" : "▼"}
                        </span>
                    </button>

                    {mostrarAdministracion && (
                        <div className="admin-dropdown">

                            <div className="admin-dropdown-title">
                                Administración
                            </div>

                            <Link
                                to="/productos/administrar"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Productos
                            </Link>

                            <Link
                                to="/categorias"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Categorías
                            </Link>

                            <Link
                                to="/clientes"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Clientes
                            </Link>

                            <Link
                                to="/usuarios"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Usuarios
                            </Link>

                            <Link
                                to="/ordenes"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Órdenes
                            </Link>

                            <Link
                                to="/estados-orden"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Estados de orden
                            </Link>

                            <Link
                                to="/informacion"
                                onClick={() =>
                                    setMostrarAdministracion(false)
                                }
                            >
                                Información
                            </Link>

                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}