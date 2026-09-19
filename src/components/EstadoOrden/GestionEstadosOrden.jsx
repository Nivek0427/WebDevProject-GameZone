import { useEffect, useState } from "react";

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

    useEffect(() => {
        cargarEstados();
    }, []);

    const cargarEstados = async () => {
        try {
            const data = await obtenerEstadosOrden();

            setEstados(data);
        } catch (error) {
            console.error(error);
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

            } else {

                const data = await crearEstadoOrden(
                    estadoOrden
                );

                setEstados([
                    ...estados,
                    data
                ]);
            }

            setEstadoEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
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

        } catch (error) {
            console.error(error);
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