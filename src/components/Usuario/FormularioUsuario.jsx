import { useEffect, useState } from "react";

import "./FormularioUsuario.css";

export function FormularioUsuario({
    usuarioEditar,
    onGuardar,
    onCancelar
}) {
    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        if (usuarioEditar) {
            setNombre(usuarioEditar.nombre);
            setClave(usuarioEditar.clave);
            setEstado(usuarioEditar.estado);
        } else {
            setNombre("");
            setClave("");
            setEstado(true);
        }
    }, [usuarioEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const usuario = {
            nombre,
            clave,
            estado
        };

        onGuardar(usuario);
    };

    return (
        <form
            className="formulario-usuario"
            onSubmit={manejarSubmit}
        >
            <h2>
                {usuarioEditar
                    ? "Editar usuario"
                    : "Nuevo usuario"}
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
                <label>Clave</label>

                <input
                    type="password"
                    value={clave}
                    onChange={(e) =>
                        setClave(e.target.value)
                    }
                    required
                />
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
                    {usuarioEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {usuarioEditar && (
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