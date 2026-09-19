import { useEffect, useState } from "react";

import "./FormularioProducto.css";

export function FormularioProducto({
    productoEditar,
    categorias,
    onGuardar,
    onCancelar
}) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [imagen, setImagen] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre);
            setDescripcion(productoEditar.descripcion);
            setStock(productoEditar.stock);
            setImagen(productoEditar.imagen);
            setPrecio(productoEditar.precio);
            setCategoria(productoEditar.categoria);
            setEstado(productoEditar.estado);
        } else {
            setNombre("");
            setDescripcion("");
            setStock("");
            setImagen("");
            setPrecio("");
            setCategoria("");
            setEstado(true);
        }
    }, [productoEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const producto = {
            nombre,
            descripcion,
            stock: Number(stock),
            imagen,
            precio: Number(precio),
            categoria,
            estado
        };

        onGuardar(producto);
    };

    return (
        <form
            className="formulario-producto"
            onSubmit={manejarSubmit}
        >
            <h2>
                {productoEditar
                    ? "Editar producto"
                    : "Nuevo producto"}
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
                    onChange={(e) =>
                        setDescripcion(e.target.value)
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Stock</label>

                <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Imagen</label>

                <input
                    type="text"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="https://..."
                    required
                />
            </div>

            <div className="form-group">
                <label>Precio</label>

                <input
                    type="number"
                    min="0"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Categoría</label>

                <select
                    value={categoria}
                    onChange={(e) =>
                        setCategoria(e.target.value)
                    }
                    required
                >
                    <option value="">
                        Seleccione una categoría
                    </option>

                    {categorias.map((categoria) => (
                        <option
                            key={categoria.id}
                            value={categoria.id}
                        >
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
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
                    {productoEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {productoEditar && (
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