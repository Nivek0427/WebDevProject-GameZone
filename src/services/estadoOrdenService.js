const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerEstadosOrden() {
    const response = await fetch(`${API_URL}/estado_orden`);

    if (!response.ok) {
        throw new Error("Error al obtener los estados de orden");
    }

    return await response.json();
}

export async function obtenerEstadoOrden(id) {
    const response = await fetch(
        `${API_URL}/estado_orden/${id}`
    );

    if (!response.ok) {
        throw new Error("Error al obtener el estado de orden");
    }

    return await response.json();
}

export async function crearEstadoOrden(estadoOrden) {
    const response = await fetch(`${API_URL}/estado_orden`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estadoOrden)
    });

    if (!response.ok) {
        throw new Error("Error al crear el estado de orden");
    }

    return await response.json();
}

export async function actualizarEstadoOrden(id, estadoOrden) {
    const response = await fetch(
        `${API_URL}/estado_orden/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(estadoOrden)
        }
    );

    if (!response.ok) {
        throw new Error("Error al actualizar el estado de orden");
    }

    return await response.json();
}

export async function eliminarEstadoOrden(id) {
    const response = await fetch(
        `${API_URL}/estado_orden/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Error al eliminar el estado de orden");
    }

    return true;
}