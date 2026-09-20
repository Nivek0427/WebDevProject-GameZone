import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";

import {
    obtenerEstadosOrden,
    crearEstadoOrden,
    actualizarEstadoOrden,
    eliminarEstadoOrden
} from "../../services/estadoOrdenService";

import { ListaEstadosOrdenAdmin } from "./ListaEstadosOrdenAdmin";
import { FormularioEstadoOrden } from "./FormularioEstadoOrden";

import "./GestionEstadosOrden.css";

export function GestionEstadosOrden() {

    const [estados, setEstados] = useState([]);
    const [estadoEditar, setEstadoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { mostrarNotificacion } = useNotification();

    useEffect(() => {
        cargarEstados();
    }, []);

    const cargarEstados = async () => {
        try {
            const data = await obtenerEstadosOrden();

            setEstados(data);
        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al cargar los estados de orden",
                "error"
            );
        }
    };

    const guardarEstado = async (estadoOrden) => {
        try {
            if (estadoEditar) {

                const data = await actualizarEstadoOrden(
                    estadoEditar.id,
                    estadoOrden
                );

                setEstados(
                    estados.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

                mostrarNotificacion(
                    "Estado de orden actualizado correctamente",
                    "success"
                );

            } else {

                const data = await crearEstadoOrden(
                    estadoOrden
                );

                setEstados([
                    ...estados,
                    data
                ]);

                mostrarNotificacion(
                    "Estado de orden creado correctamente",
                    "success"
                );
            }

            setEstadoEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al guardar el estado de orden",
                "error"
            );
        }
    };

    const editarEstado = (estado) => {
        setEstadoEditar(estado);
        setMostrarFormulario(true);
    };

    const nuevoEstado = () => {
        setEstadoEditar(null);
        setMostrarFormulario(true);
    };

    const cancelarFormulario = () => {
        setEstadoEditar(null);
        setMostrarFormulario(false);
    };

    const eliminar = async (estado) => {
        try {
            await eliminarEstadoOrden(estado.id);

            setEstados(
                estados.filter(
                    (item) => item.id !== estado.id
                )
            );

            mostrarNotificacion(
                "Estado de orden eliminado correctamente",
                "success"
            );

        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al eliminar el estado de orden",
                "error"
            );
        }
    };

    return (
        <section className="gestion-estados-orden">

            <div className="gestion-header">

                <div>
                    <h1>Gestión de estados de orden</h1>

                    <p>
                        Administra los estados de las órdenes.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={nuevoEstado}
                >
                    + Nuevo estado
                </button>

            </div>

            {mostrarFormulario && (
                <FormularioEstadoOrden
                    estadoEditar={estadoEditar}
                    onGuardar={guardarEstado}
                    onCancelar={cancelarFormulario}
                />
            )}

            <ListaEstadosOrdenAdmin
                estados={estados}
                onEditar={editarEstado}
                onEliminar={eliminar}
            />

        </section>
    );
}