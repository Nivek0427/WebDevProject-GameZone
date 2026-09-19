import "./ListaUsuariosAdmin.css";

export function ListaUsuariosAdmin({
    usuarios,
    onEditar,
    onEliminar
}) {
    const confirmarEliminar = (usuario) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar al usuario "${usuario.nombre}"?`
        );

        if (confirmar) {
            onEliminar(usuario);
        }
    };

    return (
        <div className="lista-usuarios">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Clave</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>

                            <td>{usuario.nombre}</td>

                            <td>{usuario.clave}</td>

                            <td>
                                {usuario.estado
                                    ? "Activo"
                                    : "Inactivo"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEditar(usuario)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        confirmarEliminar(usuario)
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