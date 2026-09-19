//import "./ListaProductosAdmin.css";

export function ListaProductosAdmin({
    productos,
    categorias,
    onEditar,
    onEliminar
}) {
    const obtenerNombreCategoria = (idCategoria) => {
        const categoria = categorias.find(
            (categoria) => categoria.id === idCategoria
        );

        return categoria
            ? categoria.nombre
            : "Sin categoría";
    };

    const confirmarEliminar = (producto) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar el producto "${producto.nombre}"?`
        );

        if (confirmar) {
            onEliminar(producto);
        }
    };

    return (
        <div className="lista-productos">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>

                            <td>
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    width="60"
                                />
                            </td>

                            <td>{producto.nombre}</td>

                            <td>
                                {obtenerNombreCategoria(
                                    producto.categoria
                                )}
                            </td>

                            <td>{producto.stock}</td>

                            <td>
                                ${Number(producto.precio).toLocaleString("es-CO")}
                            </td>

                            <td>
                                {producto.estado
                                    ? "Activo"
                                    : "Inactivo"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEditar(producto)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        confirmarEliminar(producto)
                                    }
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}