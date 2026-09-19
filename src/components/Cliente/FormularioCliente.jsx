import { useEffect, useState } from "react";

import "./FormularioCliente.css";

export function FormularioCliente({
    clienteEditar,
    onGuardar,
    onCancelar
}) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        if (clienteEditar) {
            setNombre(clienteEditar.nombre);
            setApellido(clienteEditar.apellido);
            setCorreo(clienteEditar.correo);
            setTelefono(clienteEditar.telefono);
            setDireccion(clienteEditar.direccion);
            setEstado(clienteEditar.estado);
        } else {
            setNombre("");
            setApellido("");
            setCorreo("");
            setTelefono("");
            setDireccion("");
            setEstado(true);
        }
    }, [clienteEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const cliente = {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            estado
        };

        onGuardar(cliente);
    };

    return (
        <form
            className="formulario-cliente"
            onSubmit={manejarSubmit}
        >
            <h2>
                {clienteEditar
                    ? "Editar cliente"
                    : "Nuevo cliente"}
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
                <label>Apellido</label>

                <input
                    type="text"
                    value={apellido}
                    onChange={(e) =>
                        setApellido(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Correo</label>

                <input
                    type="email"
                    value={correo}
                    onChange={(e) =>
                        setCorreo(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Teléfono</label>

                <input
                    type="text"
                    value={telefono}
                    onChange={(e) =>
                        setTelefono(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Dirección</label>

                <input
                    type="text"
                    value={direccion}
                    onChange={(e) =>
                        setDireccion(e.target.value)
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
                    {clienteEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {clienteEditar && (
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