const API_URL = "https://6aa6bb3bd7765db985078eed.mockapi.io";

export async function obtenerInformaciones() {
    const response = await fetch(`${API_URL}/information`);

    if (!response.ok) {
        throw new Error("Error al obtener la información");
    }

    return await response.json();
}

export async function obtenerInformacion(id) {
    const response = await fetch(`${API_URL}/information/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la información");
    }

    return await response.json();
}

export async function crearInformacion(informacion) {
    const response = await fetch(`${API_URL}/information`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(informacion)
    });

    if (!response.ok) {
        throw new Error("Error al crear la información");
    }

    return await response.json();
}

export async function actualizarInformacion(id, informacion) {
    const response = await fetch(`${API_URL}/information/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(informacion)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la información");
    }

    return await response.json();
}

export async function eliminarInformacion(id) {
    const response = await fetch(`${API_URL}/information/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la información");
    }

    return true;
}