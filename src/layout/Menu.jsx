import { useEffect, useState } from "react";

import { obtenerCategorias } from "../services/categoriaService";

import "./Menu.css";

export function Menu() {

    const [categorias, setCategorias] = useState([]);
    const [mostrarCategorias, setMostrarCategorias] = useState(false);

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
                                    <a
                                        href="#"
                                        key={categoria.id}
                                        className="category-dropdown-item"
                                    >
                                        {categoria.nombre}
                                    </a>
                                ))
                            )}

                        </div>
                    )}

                </div>

                <a href="#" className="menu-item">
                    Juegos 
                </a>

                <a href="#" className="menu-item">
                    Tarjetas de regalo
                </a>

                <a href="#" className="menu-item">
                    Ofertas
                </a>

                <a href="#" className="menu-item">
                    Ahora en tendencia
                </a>

            </div>

        </nav>
    );
}