import "./ListaCategoriasAdmin.css";

export function ListaCategoriasAdmin({
    categorias,
    onEditar,
    onEliminar
}) {

    const confirmarEliminar = (categoria) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar la categoría "${categoria.nombre}"?`
        );

        if (confirmar) {
            onEliminar(categoria);
        }
    };

    return (
        <div className="lista-categorias">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td>{categoria.descripcion}</td>

                            <td>
                                {categoria.estado
                                    ? "Activo"
                                    : "Inactivo"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() => onEditar(categoria)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        confirmarEliminar(categoria)
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