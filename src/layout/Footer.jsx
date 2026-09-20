import { useEffect, useState } from "react";
import { obtenerInformaciones } from "../services/informacionService";
import { Clock3, MapPin, Phone } from "lucide-react";

import "./Footer.css";

export function Footer() {
    const [informacion, setInformacion] = useState(null);

    useEffect(() => {
        cargarInformacion();
    }, []);

    const cargarInformacion = async () => {
        try {
            const datos = await obtenerInformaciones();

            console.log("Información recibida:", datos);

            if (datos.length > 0) {
                setInformacion(datos[0]);
            }
        } catch (error) {
            console.error("Error al cargar información:", error);
        }
    };

    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">

                    <div className="footer-logo">
                        <img src="/image/logo_footer.png" alt="GameZone" />
                    </div>

                    <p>
                        Tu tienda de videojuegos y
                        entretenimiento digital.
                    </p>

                </div>

                <div className="footer-section">

                    <h3>
                        Información
                    </h3>

                    {informacion ? (
                        <>
                            <p>
                                <MapPin size={16} /> {informacion.direccion}
                            </p>

                            <p>
                                <Phone size={16} /> {informacion.telefono}
                            </p>

                            <p>
                                <Clock3 size={16} /> {informacion.horario}
                            </p>
                        </>
                    ) : (
                        <p>
                            Cargando información...
                        </p>
                    )}

                </div>

                <div className="footer-section">

                    <h3>
                        GameZone
                    </h3>

                    <p>
                        Juegos para todos
                        los jugadores.
                    </p>

                    <p>
                        Ofertas y entretenimiento
                        en un solo lugar.
                    </p>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 GameZone. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}