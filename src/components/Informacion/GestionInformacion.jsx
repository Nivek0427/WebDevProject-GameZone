import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";

import {
    obtenerInformaciones,
    crearInformacion,
    actualizarInformacion,
    eliminarInformacion
} from "../../services/informacionService";

import { ListaInformacionAdmin } from "./ListaInformacionAdmin";
import { FormularioInformacion } from "./FormularioInformacion";

import "./GestionInformacion.css";

export function GestionInformacion() {
    const [informaciones, setInformaciones] = useState([]);
    const { mostrarNotificacion } = useNotification();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [informacionEditar, setInformacionEditar] = useState(null);

    useEffect(() => {
        cargarInformaciones();
    }, []);

    const cargarInformaciones = async () => {
        try {
            setCargando(true);
            setError("");

            const data = await obtenerInformaciones();

            setInformaciones(data);
        } catch (error) {
            console.error(error);
            setError("Error al cargar la información");
            mostrarNotificacion(
                "Error al cargar la información",
                "error"
            );
        } finally {
            setCargando(false);
        }
    };

    const manejarGuardar = async (informacion) => {
        try {
            setError("");

            if (informacionEditar) {
                const informacionActualizada =
                    await actualizarInformacion(
                        informacionEditar.id,
                        informacion
                    );

                setInformaciones((informacionesActuales) =>
                    informacionesActuales.map((item) =>
                        item.id === informacionEditar.id
                            ? informacionActualizada
                            : item
                    )
                );

                mostrarNotificacion(
                    "Información actualizada correctamente",
                    "success"
                );
            } else {
                const nuevaInformacion =
                    await crearInformacion(informacion);

                setInformaciones((informacionesActuales) => [
                    ...informacionesActuales,
                    nuevaInformacion
                ]);

                mostrarNotificacion(
                    "Información creada correctamente",
                    "success"
                );
            }

            setInformacionEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
            setError("Error al guardar la información");
            mostrarNotificacion(
                "Error al guardar la información",
                "error"
            );
        }
    };

    const manejarEditar = (informacion) => {
        setInformacionEditar(informacion);
        setMostrarFormulario(true);
    };

    const manejarEliminar = async (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de eliminar esta información?"
        );

        if (!confirmar) {
            return;
        }

        try {
            setError("");

            await eliminarInformacion(id);

            setInformaciones((informacionesActuales) =>
                informacionesActuales.filter(
                    (informacion) => informacion.id !== id
                )
            );

            mostrarNotificacion(
                "Información eliminada correctamente",
                "success"
            );

        } catch (error) {
            console.error(error);
            setError("Error al eliminar la información");
            mostrarNotificacion(
                "Error al eliminar la información",
                "error"
            );
        }
    };

    const manejarNuevaInformacion = () => {
        setInformacionEditar(null);
        setMostrarFormulario(true);
    };

    const manejarCancelar = () => {
        setInformacionEditar(null);
        setMostrarFormulario(false);
    };

    if (cargando) {
        return (
            <div className="gestion-informacion">
                <p>Cargando información...</p>
            </div>
        );
    }

    return (
        <div className="gestion-informacion">

            <div className="gestion-header">
                <div>
                    <h1>Gestión de Información</h1>

                    <p>
                        Administra la información de GameZone.
                    </p>
                </div>

                {!mostrarFormulario && (
                    <button
                        type="button"
                        onClick={manejarNuevaInformacion}
                    >
                        Nueva información
                    </button>
                )}
            </div>

            {error && (
                <p className="gestion-error">
                    {error}
                </p>
            )}

            {mostrarFormulario && (
                <FormularioInformacion
                    informacion={informacionEditar}
                    onGuardar={manejarGuardar}
                    onCancelar={manejarCancelar}
                />
            )}

            <ListaInformacionAdmin
                informaciones={informaciones}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
            />

        </div>
    );
}