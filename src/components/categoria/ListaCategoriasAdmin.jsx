import "./ListaCategoriasAdmin.css";

export function ListaCategoriasAdmin({
    categorias,
    onEditar
}) {
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}