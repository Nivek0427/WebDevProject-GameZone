import { useEffect, useState } from "react";

import "./FormularioInformacion.css";

export function FormularioInformacion({
    informacion,
    onGuardar,
    onCancelar
}) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        telefono: "",
        direccion: "",
        horario: ""
    });

    useEffect(() => {
        if (informacion) {
            setFormulario({
                nombre: informacion.nombre || "",
                telefono: informacion.telefono || "",
                direccion: informacion.direccion || "",
                horario: informacion.horario || ""
            });
        } else {
            setFormulario({
                nombre: "",
                telefono: "",
                direccion: "",
                horario: ""
            });
        }
    }, [informacion]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        onGuardar(formulario);
    };

    return (
        <form
            className="formulario-informacion"
            onSubmit={manejarSubmit}
        >
            <h2>
                {informacion
                    ? "Editar información"
                    : "Nueva información"}
            </h2>

            <div className="form-group">
                <label htmlFor="nombre">
                    Nombre
                </label>

                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    placeholder="Nombre del negocio"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="telefono">
                    Teléfono
                </label>

                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    placeholder="Teléfono"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="direccion">
                    Dirección
                </label>

                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={manejarCambio}
                    placeholder="Dirección"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="horario">
                    Horario
                </label>

                <input
                    type="text"
                    id="horario"
                    name="horario"
                    value={formulario.horario}
                    onChange={manejarCambio}
                    placeholder="Ej: Lunes a viernes 8:00 AM - 6:00 PM"
                    required
                />
            </div>

            <div className="form-actions">
                <button type="submit">
                    {informacion ? "Actualizar" : "Guardar"}
                </button>

                <button
                    type="button"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}