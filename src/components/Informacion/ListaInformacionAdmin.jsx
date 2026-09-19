import "./ListaInformacionAdmin.css";

export function ListaInformacionAdmin({
    informaciones,
    onEditar,
    onEliminar
}) {
    return (
        <div className="lista-informacion">

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Horario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {informaciones.length === 0 ? (
                        <tr>
                            <td colSpan="6">
                                No hay información registrada.
                            </td>
                        </tr>
                    ) : (
                        informaciones.map((informacion) => (
                            <tr key={informacion.id}>
                                <td>{informacion.id}</td>

                                <td>
                                    {informacion.nombre}
                                </td>

                                <td>
                                    {informacion.telefono}
                                </td>

                                <td>
                                    {informacion.direccion}
                                </td>

                                <td>
                                    {informacion.horario}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEditar(informacion)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEliminar(informacion.id)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    );
}