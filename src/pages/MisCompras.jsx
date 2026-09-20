import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { obtenerOrdenes } from "../services/ordenService";
import { obtenerEstadosOrden } from "../services/estadoOrdenService";

import { Header } from "../layout/Header";
import { Menu } from "../layout/Menu";
import { Footer } from "../layout/Footer";

import "./MisCompras.css";

export function MisCompras() {

    const { usuario } = useAuth();

    const [ordenes, setOrdenes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            setError("");

            const [ordenesData, estadosData] = await Promise.all([
                obtenerOrdenes(),
                obtenerEstadosOrden()
            ]);

            const misOrdenes = ordenesData
                .filter(
                    (orden) =>
                        String(orden.usuario) === String(usuario.id)
                )
                .sort(
                    (a, b) =>
                        new Date(b.fecha) - new Date(a.fecha)
                );

            setOrdenes(misOrdenes);
            setEstados(estadosData);

        } catch (error) {

            console.error(error);

            setError(
                "No fue posible cargar tus compras."
            );

        } finally {
            setCargando(false);
        }
    };

    const obtenerEstado = (id) => {
        return estados.find(
            (estado) =>
                String(estado.id) === String(id)
        );
    };

    const obtenerDetalle = (detalle) => {
        if (Array.isArray(detalle)) {
            return detalle;
        }

        try {
            return JSON.parse(detalle);
        } catch (error) {
            console.error(
                "Error al interpretar detalle:",
                error
            );

            return [];
        }
    };

    return (
        <>
            <Header />

            <Menu />

            <main className="mis-compras">

                <div className="mis-compras-container">

                    <div className="mis-compras-header">

                        <div>
                            <h1>
                                Mis compras
                            </h1>

                            <p>
                                Consulta el historial de tus compras
                                realizadas en GameZone.
                            </p>
                        </div>

                        <Link
                            to="/productos"
                            className="mis-compras-volver"
                        >
                            Seguir comprando
                        </Link>

                    </div>

                    {cargando && (
                        <div className="mis-compras-mensaje">
                            Cargando tus compras...
                        </div>
                    )}

                    {error && (
                        <div className="mis-compras-error">
                            {error}
                        </div>
                    )}

                    {!cargando &&
                        !error &&
                        ordenes.length === 0 && (
                            <div className="mis-compras-vacio">

                                <div className="mis-compras-vacio-icon">
                                    🛒
                                </div>

                                <h2>
                                    Aún no tienes compras
                                </h2>

                                <p>
                                    Cuando realices una compra,
                                    aparecerá aquí.
                                </p>

                                <Link
                                    to="/productos"
                                    className="mis-compras-button"
                                >
                                    Ver productos
                                </Link>

                            </div>
                        )}

                    {!cargando &&
                        !error &&
                        ordenes.length > 0 && (

                            <div className="mis-compras-lista">

                                {ordenes.map((orden) => {

                                    const estado =
                                        obtenerEstado(
                                            orden.estado_orden
                                        );

                                    const detalle =
                                        obtenerDetalle(
                                            orden.detalle
                                        );

                                    return (
                                        <article
                                            className="compra-card"
                                            key={orden.id}
                                        >

                                            <div className="compra-card-header">

                                                <div>
                                                    <span className="compra-card-label">
                                                        Orden
                                                    </span>

                                                    <strong>
                                                        #{orden.id}
                                                    </strong>
                                                </div>

                                                <span
                                                    className="compra-estado"
                                                    style={{
                                                        backgroundColor:
                                                            estado?.color ||
                                                            "#666"
                                                    }}
                                                >
                                                    {estado?.nombre ||
                                                        "Sin estado"}
                                                </span>

                                            </div>

                                            <div className="compra-card-info">

                                                <div>
                                                    <span>
                                                        Fecha
                                                    </span>

                                                    <strong>
                                                        {orden.fecha}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Método de pago
                                                    </span>

                                                    <strong>
                                                        {orden.metodo_pago}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Total
                                                    </span>

                                                    <strong>
                                                        $
                                                        {Number(
                                                            orden.total
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </strong>
                                                </div>

                                            </div>

                                            <div className="compra-card-detalle">

                                                <h3>
                                                    Productos
                                                </h3>

                                                {detalle.map(
                                                    (
                                                        producto,
                                                        index
                                                    ) => (
                                                        <div
                                                            className="compra-producto"
                                                            key={`${orden.id}-${index}`}
                                                        >

                                                            <div>
                                                                <strong>
                                                                    {
                                                                        producto.nombre
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    Cantidad:{" "}
                                                                    {
                                                                        producto.cantidad
                                                                    }
                                                                </span>
                                                            </div>

                                                            <strong>
                                                                $
                                                                {Number(
                                                                    producto.subtotal
                                                                ).toLocaleString(
                                                                    "es-CO"
                                                                )}
                                                            </strong>

                                                        </div>
                                                    )
                                                )}

                                            </div>

                                        </article>
                                    );
                                })}

                            </div>
                        )}

                </div>

            </main>

            <Footer />
        </>
    );
}