const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerProductos() {
    const response = await fetch(`${API_URL}/producto`);

    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }

    return await response.json();
}

export async function obtenerProducto(id) {
    const response = await fetch(`${API_URL}/producto/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }

    return await response.json();
}

export async function crearProducto(producto) {
    const response = await fetch(`${API_URL}/producto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });

    if (!response.ok) {
        throw new Error("Error al crear el producto");
    }

    return await response.json();
}

export async function actualizarProducto(id, producto) {
    const response = await fetch(`${API_URL}/producto/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el producto");
    }

    return await response.json();
}

export async function eliminarProducto(id) {
    const response = await fetch(`${API_URL}/producto/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el producto");
    }

    return true;
}