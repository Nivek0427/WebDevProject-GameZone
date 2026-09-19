const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerUsuarios() {
    const response = await fetch(`${API_URL}/usuario`);

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}

export async function obtenerUsuario(id) {
    const response = await fetch(`${API_URL}/usuario/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el usuario");
    }

    return await response.json();
}

export async function crearUsuario(usuario) {
    const response = await fetch(`${API_URL}/usuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }

    return await response.json();
}

export async function actualizarUsuario(id, usuario) {
    const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
    }

    return await response.json();
}

export async function eliminarUsuario(id) {
    const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
    }

    return true;
}