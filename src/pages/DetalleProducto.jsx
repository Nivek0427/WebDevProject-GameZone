import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Header } from "../layout/Header";
import { Menu } from "../layout/Menu";
import { Footer } from "../layout/Footer";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

import { obtenerProducto } from "../services/productoService";
import "./DetalleProducto.css";

export function DetalleProducto() {
    const { id } = useParams();
    const { agregarAlCarrito } = useCart();
    const { mostrarNotificacion } = useNotification();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                setCargando(true);
                const data = await obtenerProducto(id);
                setProducto(data);
                setError("");
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información del juego.");
            } finally {
                setCargando(false);
            }
        };

        cargarProducto();
    }, [id]);

    const manejarAgregar = () => {
        if (!producto) return;

        agregarAlCarrito(producto);
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    };

    if (cargando) {
        return (
            <>
                <Header />
                <Menu />
                <main className="detalle-producto-loading">
                    Cargando juego...
                </main>
                <Footer />
            </>
        );
    }

    if (error || !producto) {
        return (
            <>
                <Header />
                <Menu />
                <main className="detalle-producto-loading">
                    <p>{error || "Juego no encontrado."}</p>
                    <Link to="/productos" className="detalle-producto-back-link">
                        Volver a productos
                    </Link>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Menu />

            <main className="detalle-producto-page">
                <Link to="/productos" className="detalle-producto-back-link">
                    ← Volver a productos
                </Link>

                <div className="detalle-producto-layout">
                    <div className="detalle-producto-image-wrap">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="detalle-producto-image"
                        />
                    </div>

                    <div className="detalle-producto-info">
                        <span className="detalle-producto-badge">
                            {producto.categoria || "Sin categoría"}
                        </span>

                        <h1>{producto.nombre}</h1>

                        <p className="detalle-producto-description">
                            {producto.descripcion}
                        </p>

                        <div className="detalle-producto-price-row">
                            <span className="detalle-producto-price">
                                ${Number(producto.precio).toLocaleString("es-CO")}
                            </span>
                        </div>

                        <div className="detalle-producto-actions">
                            <button
                                type="button"
                                className="detalle-producto-btn primary"
                                onClick={manejarAgregar}
                                disabled={Number(producto.stock) <= 0}
                            >
                                {Number(producto.stock) <= 0 ? "Sin stock" : "Agregar al carrito"}
                            </button>

                            <Link to="/productos" className="detalle-producto-btn secondary">
                                Ver más juegos
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
