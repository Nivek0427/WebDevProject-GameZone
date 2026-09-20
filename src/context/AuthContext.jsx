import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario");
        return guardado ? JSON.parse(guardado) : null;
    });

    const iniciarSesion = (usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setUsuario(usuario);
    };

    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                autenticado: !!usuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
