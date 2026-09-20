import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export function ProtectedRoute({ requireAdmin = false }) {
    const { autenticado, esAdmin } = useAuth();
    const location = useLocation();
    const { mostrarNotificacion } = useNotification();

    if (!autenticado) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    if (requireAdmin && !esAdmin) {
        mostrarNotificacion(
            "No tienes permisos para acceder al panel de administración",
            "error"
        );

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
