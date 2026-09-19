const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerOrdenes() {
    const response = await fetch(`${API_URL}/orden`);

    if (!response.ok) {
        throw new Error("Error al obtener las órdenes");
    }

    return await response.json();
}

export async function obtenerOrden(id) {
    const response = await fetch(`${API_URL}/orden/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la orden");
    }

    return await response.json();
}

export async function crearOrden(orden) {
    const response = await fetch(`${API_URL}/orden`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orden)
    });

    if (!response.ok) {
        throw new Error("Error al crear la orden");
    }

    return await response.json();
}

export async function actualizarOrden(id, orden) {
    const response = await fetch(`${API_URL}/orden/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orden)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la orden");
    }

    return await response.json();
}

export async function eliminarOrden(id) {
    const response = await fetch(`${API_URL}/orden/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la orden");
    }

    return true;
}