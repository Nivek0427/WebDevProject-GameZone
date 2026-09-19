const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerClientes() {
    const response = await fetch(`${API_URL}/cliente`);

    if (!response.ok) {
        throw new Error("Error al obtener los clientes");
    }

    return await response.json();
}

export async function obtenerCliente(id) {
    const response = await fetch(`${API_URL}/cliente/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el cliente");
    }

    return await response.json();
}

export async function crearCliente(cliente) {
    const response = await fetch(`${API_URL}/cliente`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        throw new Error("Error al crear el cliente");
    }

    return await response.json();
}

export async function actualizarCliente(id, cliente) {
    const response = await fetch(`${API_URL}/cliente/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el cliente");
    }

    return await response.json();
}

export async function eliminarCliente(id) {
    const response = await fetch(`${API_URL}/cliente/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
    }

    return true;
}