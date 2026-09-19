import "./ListaOrdenesAdmin.css";

export function ListaOrdenesAdmin({
    ordenes,
    clientes,
    estadosOrden,
    onEditar,
    onEliminar
}) {
    const obtenerNombreCliente = (id) => {
        const cliente = clientes.find(
            (cliente) => cliente.id === id
        );

        if (!cliente) {
            return "Sin cliente";
        }

        return `${cliente.nombre} ${cliente.apellido}`;
    };

    const obtenerNombreEstado = (id) => {
        const estado = estadosOrden.find(
            (estado) => estado.id === id
        );

        return estado ? estado.nombre : "Sin estado";
    };

    return (
        <div className="lista-ordenes">

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Método de pago</th>
                        <th>Total</th>
                        <th>Descuento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {ordenes.length === 0 ? (
                        <tr>
                            <td colSpan="8">
                                No hay órdenes registradas.
                            </td>
                        </tr>
                    ) : (
                        ordenes.map((orden) => (
                            <tr key={orden.id}>
                                <td>{orden.id}</td>

                                <td>
                                    {obtenerNombreCliente(orden.cliente)}
                                </td>

                                <td>{orden.fecha}</td>

                                <td>{orden.metodo_pago}</td>

                                <td>
                                    ${Number(orden.total).toLocaleString()}
                                </td>

                                <td>
                                    ${Number(orden.descuento).toLocaleString()}
                                </td>

                                <td>
                                    {obtenerNombreEstado(
                                        orden.estado_orden
                                    )}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() => onEditar(orden)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onEliminar(orden.id)}
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