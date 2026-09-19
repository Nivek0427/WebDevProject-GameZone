import "./ListaEstadosOrdenAdmin.css";

export function ListaEstadosOrdenAdmin({
    estados,
    onEditar,
    onEliminar
}) {
    const confirmarEliminar = (estado) => {
        const confirmar = window.confirm(
            `¿Está seguro de eliminar el estado "${estado.nombre}"?`
        );

        if (confirmar) {
            onEliminar(estado);
        }
    };

    return (
        <div className="lista-estados-orden">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Color</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {estados.map((estado) => (
                        <tr key={estado.id}>
                            <td>{estado.id}</td>

                            <td>{estado.nombre}</td>

                            <td>{estado.descripcion}</td>

                            <td>
                                <span
                                    className="estado-color"
                                    style={{
                                        backgroundColor: estado.color
                                    }}
                                    title={estado.color || "Sin color"}
                                    aria-label={estado.color || "Sin color"}
                                />
                            </td>

                            <td>
                                {estado.estado
                                    ? "Activo"
                                    : "Inactivo"}
                            </td>

                            <td className="acciones-cell">
                                <button
                                    type="button"
                                    className="btn-editar"
                                    onClick={() =>
                                        onEditar(estado)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    className="btn-eliminar"
                                    onClick={() =>
                                        confirmarEliminar(estado)
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