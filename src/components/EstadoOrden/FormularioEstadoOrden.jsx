import { useEffect, useState } from "react";

import "./FormularioEstadoOrden.css";

export function FormularioEstadoOrden({
    estadoEditar,
    onGuardar,
    onCancelar
}) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("#ff6b00");
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        if (estadoEditar) {
            setNombre(estadoEditar.nombre);
            setDescripcion(estadoEditar.descripcion);
            setColor(estadoEditar.color);
            setEstado(estadoEditar.estado);
        } else {
            setNombre("");
            setDescripcion("");
            setColor("#ff6b00");
            setEstado(true);
        }
    }, [estadoEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const estadoOrden = {
            nombre,
            descripcion,
            color,
            estado
        };

        onGuardar(estadoOrden);
    };

    return (
        <form
            className="formulario-estado-orden"
            onSubmit={manejarSubmit}
        >
            <h2>
                {estadoEditar
                    ? "Editar estado de orden"
                    : "Nuevo estado de orden"}
            </h2>

            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>

                <textarea
                    value={descripcion}
                    onChange={(e) =>
                        setDescripcion(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Color</label>

                <div className="color-container">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) =>
                            setColor(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Estado</label>

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(
                            e.target.value === "true"
                        )
                    }
                >
                    <option value="true">
                        Activo
                    </option>

                    <option value="false">
                        Inactivo
                    </option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit">
                    {estadoEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {estadoEditar && (
                    <button
                        type="button"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}