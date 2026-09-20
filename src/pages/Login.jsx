import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { obtenerUsuarios } from "../services/usuarioService";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import "./Login.css";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { iniciarSesion } = useAuth();

    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");
    const { mostrarNotificacion } = useNotification();

    const manejarLogin = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const usuarios = await obtenerUsuarios();

            const usuario = usuarios.find(
                (item) =>
                    item.nombre === nombre &&
                    item.clave === clave &&
                    item.estado === true
            );

            if (!usuario) {
                setError("Usuario o contraseña incorrectos");

                mostrarNotificacion(
                    "Usuario o contraseña incorrectos",
                    "error"
                );

                return;
            }

            iniciarSesion(usuario);

            mostrarNotificacion(
                `Bienvenido, ${usuario.nombre}`
            );

            const destino = location.state?.from || "/";
            navigate(destino, { replace: true });
        } catch (error) {
            console.error(error);
            setError("Error al iniciar sesión");
            mostrarNotificacion(
                "No fue posible iniciar sesión. Inténtalo nuevamente",
                "error"
            );
        }
    };

    return (
        <div className="login">
            <div className="login-card">
                <div className="login-header">
                    <img
                        className="login-logo"
                        src="/image/logo_header.PNG"
                        alt="GameZone"
                    />
                    <p>Inicia sesión en tu cuenta</p>
                </div>

                <form onSubmit={manejarLogin}>
                    <div className="login-group">
                        <label htmlFor="nombre">Usuario</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-group">
                        <label htmlFor="clave">Contraseña</label>
                        <input
                            type="password"
                            id="clave"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>

                <Link to="/" className="login-back">
                    Volver a GameZone
                </Link>
            </div>
        </div>
    );
}
