import { useEffect, useState } from "react";

import { obtenerOrdenes, crearOrden, actualizarOrden, eliminarOrden } from "../../services/ordenService";
import { obtenerClientes } from "../../services/clienteService";
import { obtenerEstadosOrden } from "../../services/estadoOrdenService";

import { ListaOrdenesAdmin } from "./ListaOrdenesAdmin";
import { FormularioOrden } from "./FormularioOrden";

import "./GestionOrdenes.css";

export function GestionOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [estadosOrden, setEstadosOrden] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [ordenEditar, setOrdenEditar] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            setError("");

            const [ordenesData, clientesData, estadosData] = await Promise.all([
                obtenerOrdenes(),
                obtenerClientes(),
                obtenerEstadosOrden()
            ]);

            setOrdenes(ordenesData);
            setClientes(clientesData);
            setEstadosOrden(estadosData);

        } catch (error) {
            console.error(error);
            setError("Error al cargar las órdenes");
        } finally {
            setCargando(false);
        }
    };

    const manejarGuardar = async (orden) => {
        try {
            setError("");

            if (ordenEditar) {
                const ordenActualizada = await actualizarOrden(
                    ordenEditar.id,
                    orden
                );

                setOrdenes((ordenesActuales) =>
                    ordenesActuales.map((item) =>
                        item.id === ordenEditar.id
                            ? ordenActualizada
                            : item
                    )
                );
            } else {
                const nuevaOrden = await crearOrden(orden);

                setOrdenes((ordenesActuales) => [
                    ...ordenesActuales,
                    nuevaOrden
                ]);
            }

            setOrdenEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
            setError("Error al guardar la orden");
        }
    };

    const manejarEditar = (orden) => {
        setOrdenEditar(orden);
        setMostrarFormulario(true);
    };

    const manejarEliminar = async (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de eliminar esta orden?"
        );

        if (!confirmar) {
            return;
        }

        try {
            setError("");

            await eliminarOrden(id);

            setOrdenes((ordenesActuales) =>
                ordenesActuales.filter((orden) => orden.id !== id)
            );

        } catch (error) {
            console.error(error);
            setError("Error al eliminar la orden");
        }
    };

    const manejarNuevaOrden = () => {
        setOrdenEditar(null);
        setMostrarFormulario(true);
    };

    const manejarCancelar = () => {
        setOrdenEditar(null);
        setMostrarFormulario(false);
    };

    if (cargando) {
        return (
            <div className="gestion-ordenes">
                <p>Cargando órdenes...</p>
            </div>
        );
    }

    return (
        <div className="gestion-ordenes">

            <div className="gestion-header">
                <div>
                    <h1>Gestión de Órdenes</h1>
                    <p>Administra las órdenes de GameZone.</p>
                </div>

                {!mostrarFormulario && (
                    <button
                        type="button"
                        onClick={manejarNuevaOrden}
                    >
                        Nueva orden
                    </button>
                )}
            </div>

            {error && (
                <p className="gestion-error">
                    {error}
                </p>
            )}

            {mostrarFormulario && (
                <FormularioOrden
                    orden={ordenEditar}
                    clientes={clientes}
                    estadosOrden={estadosOrden}
                    onGuardar={manejarGuardar}
                    onCancelar={manejarCancelar}
                />
            )}

            <ListaOrdenesAdmin
                ordenes={ordenes}
                clientes={clientes}
                estadosOrden={estadosOrden}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
            />

        </div>
    );
}