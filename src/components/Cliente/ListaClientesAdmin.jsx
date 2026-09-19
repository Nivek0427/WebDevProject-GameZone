import "./ListaClientesAdmin.css";

export function ListaClientesAdmin({
    clientes,
    onEditar,
    onEliminar
}) {
    const confirmarEliminar = (cliente) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar al cliente "${cliente.nombre} ${cliente.apellido}"?`
        );

        if (confirmar) {
            onEliminar(cliente);
        }
    };

    return (
        <div className="lista-clientes">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.direccion}</td>

                            <td>
                                {cliente.estado
                                    ? "Activo"
                                    : "Inactivo"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEditar(cliente)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        confirmarEliminar(cliente)
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