const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerCategorias() {
    const response = await fetch(`${API_URL}/categoria`);

    if (!response.ok) {
        throw new Error("Error al obtener las categorías");
    }

    return await response.json();
}

export async function obtenerCategoria(id) {
    const response = await fetch(`${API_URL}/categoria/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la categoría");
    }

    return await response.json();
}

export async function crearCategoria(categoria) {
    const response = await fetch(`${API_URL}/categoria`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    });

    if (!response.ok) {
        throw new Error("Error al crear la categoría");
    }

    return await response.json();
}

export async function actualizarCategoria(id, categoria) {
    const response = await fetch(`${API_URL}/categoria/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
    }

    return await response.json();
}

export async function eliminarCategoria(id) {
    const response = await fetch(`${API_URL}/categoria/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
    }

    return true;
}