import { useEffect, useState } from "react";
import "./FormularioCategoria.css";

export function FormularioCategoria({
    categoriaEditar,
    onGuardar,
    onCancelar
}) {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState(true);

    useEffect(() => {

        if (categoriaEditar) {
            setNombre(categoriaEditar.nombre);
            setDescripcion(categoriaEditar.descripcion);
            setEstado(categoriaEditar.estado);
        } else {
            setNombre("");
            setDescripcion("");
            setEstado(true);
        }

    }, [categoriaEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const categoria = {
            nombre,
            descripcion,
            estado
        };

        onGuardar(categoria);
    };

    return (
        <form
            className="formulario-categoria"
            onSubmit={manejarSubmit}
        >

            <h2>
                {categoriaEditar
                    ? "Editar categoría"
                    : "Nueva categoría"}
            </h2>

            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>

                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Estado</label>

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(e.target.value === "true")
                    }
                >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div>

            <div className="form-actions">

                <button type="submit">
                    {categoriaEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {categoriaEditar && (
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