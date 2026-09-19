import { useEffect, useState } from "react";

import {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from "../../services/clienteService";

import { ListaClientesAdmin } from "./ListaClientesAdmin";
import { FormularioCliente } from "./FormularioCliente";

import "./GestionClientes.css";

export function GestionClientes() {

    const [clientes, setClientes] = useState([]);
    const [clienteEditar, setClienteEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            const data = await obtenerClientes();

            setClientes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardarCliente = async (cliente) => {
        try {
            if (clienteEditar) {

                const data = await actualizarCliente(
                    clienteEditar.id,
                    cliente
                );

                setClientes(
                    clientes.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

            } else {

                const data = await crearCliente(cliente);

                setClientes([
                    ...clientes,
                    data
                ]);
            }

            setClienteEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
        }
    };

    const editarCliente = (cliente) => {
        setClienteEditar(cliente);
        setMostrarFormulario(true);
    };

    const nuevoCliente = () => {
        setClienteEditar(null);
        setMostrarFormulario(true);
    };

    const cancelarFormulario = () => {
        setClienteEditar(null);
        setMostrarFormulario(false);
    };

    const eliminar = async (cliente) => {
        try {
            await eliminarCliente(cliente.id);

            setClientes(
                clientes.filter(
                    (item) => item.id !== cliente.id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="gestion-clientes">

            <div className="gestion-header">

                <div>
                    <h1>Gestión de clientes</h1>

                    <p>
                        Administra los clientes de GameZone.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={nuevoCliente}
                >
                    + Nuevo cliente
                </button>

            </div>

            {mostrarFormulario && (
                <FormularioCliente
                    clienteEditar={clienteEditar}
                    onGuardar={guardarCliente}
                    onCancelar={cancelarFormulario}
                />
            )}

            <ListaClientesAdmin
                clientes={clientes}
                onEditar={editarCliente}
                onEliminar={eliminar}
            />

        </section>
    );
}