import { createContext, useContext, useState } from "react";

import "./Notification.css";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notificacion, setNotificacion] = useState(null);

    const mostrarNotificacion = (mensaje, tipo = "success") => {
        setNotificacion({
            mensaje,
            tipo
        });

        setTimeout(() => {
            setNotificacion(null);
        }, 1500);
    };

    return (
        <NotificationContext.Provider
            value={{
                notificacion,
                mostrarNotificacion
            }}
        >
            {children}

            {notificacion && (
                <div className={`notification notification-${notificacion.tipo}`}>
                    <span className="notification-icon">
                        {notificacion.tipo === "success" ? "✓" : "✕"}
                    </span>

                    <span>
                        {notificacion.mensaje}
                    </span>
                </div>
            )}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}