import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";

import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../../services/usuarioService";

import { ListaUsuariosAdmin } from "./ListaUsuariosAdmin";
import { FormularioUsuario } from "./FormularioUsuario";

import "./GestionUsuarios.css";

export function GestionUsuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { mostrarNotificacion } = useNotification();

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerUsuarios();

            setUsuarios(data);
        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al cargar los usuarios",
                "error"
            );
        }
    };

    const guardarUsuario = async (usuario) => {
        try {
            if (usuarioEditar) {

                const data = await actualizarUsuario(
                    usuarioEditar.id,
                    usuario
                );

                setUsuarios(
                    usuarios.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

                mostrarNotificacion(
                    "Usuario actualizado correctamente",
                    "success"
                );

            } else {

                const data = await crearUsuario(usuario);

                setUsuarios([
                    ...usuarios,
                    data
                ]);

                mostrarNotificacion(
                    "Usuario creado correctamente",
                    "success"
                );
            }

            setUsuarioEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al guardar el usuario",
                "error"
            );
        }
    };

    const editarUsuario = (usuario) => {
        setUsuarioEditar(usuario);
        setMostrarFormulario(true);
    };

    const nuevoUsuario = () => {
        setUsuarioEditar(null);
        setMostrarFormulario(true);
    };

    const cancelarFormulario = () => {
        setUsuarioEditar(null);
        setMostrarFormulario(false);
    };

    const eliminar = async (usuario) => {
        try {
            await eliminarUsuario(usuario.id);

            setUsuarios(
                usuarios.filter(
                    (item) => item.id !== usuario.id
                )
            );

            mostrarNotificacion(
                "Usuario eliminado correctamente",
                "success"
            );

        } catch (error) {
            console.error(error);
            mostrarNotificacion(
                "Error al eliminar el usuario",
                "error"
            );
        }
    };

    return (
        <section className="gestion-usuarios">

            <div className="gestion-header">

                <div>
                    <h1>Gestión de usuarios</h1>

                    <p>
                        Administra los usuarios de GameZone.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={nuevoUsuario}
                >
                    + Nuevo usuario
                </button>

            </div>

            {mostrarFormulario && (
                <FormularioUsuario
                    usuarioEditar={usuarioEditar}
                    onGuardar={guardarUsuario}
                    onCancelar={cancelarFormulario}
                />
            )}

            <ListaUsuariosAdmin
                usuarios={usuarios}
                onEditar={editarUsuario}
                onEliminar={eliminar}
            />

        </section>
    );
}