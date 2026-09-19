import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Marca */}
                <div className="footer-brand">
                    <div className="footer-logo">                        
                        <strong>GameZone</strong>
                    </div>

                    <p>
                        Tu zona gamer. Descubre juegos, ofertas
                        y todo lo que necesitas para disfrutar
                        de tus videojuegos favoritos.
                    </p>

                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">◎</a>
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="Discord">◈</a>
                    </div>
                </div>

                {/* GameZone */}
                <div className="footer-column">
                    <h3>GameZone</h3>

                    <a href="#">Inicio</a>
                    <a href="#">Juegos</a>
                    <a href="#">Ofertas</a>
                    <a href="#">Tarjetas de regalo</a>
                </div>

                {/* Ayuda */}
                <div className="footer-column">
                    <h3>Ayuda</h3>

                    <a href="#">Preguntas frecuentes</a>
                    <a href="#">Contacto</a>
                    <a href="#">Términos y condiciones</a>
                    <a href="#">Política de privacidad</a>
                </div>

                {/* Contacto */}
                <div className="footer-column footer-contact">
                    <h3>Contáctanos</h3>

                    <p>
                        :round_pushpin: Bogotá, Colombia
                    </p>

                    <p>
                        :telephone_receiver: +57 300 000 0000
                    </p>

                    <p>
                        :envelope: contacto@gamezone.com
                    </p>

                    <p>
                        :clock1: Lun - Vie: 8:00 AM - 6:00 PM
                    </p>
                </div>

            </div>

            <div className="footer-bottom">

                <div className="footer-bottom-container">
                    <span>
                        © 2026 GameZone. Todos los derechos reservados.
                    </span>

                    <span>
                        Hecho para gamers
                    </span>
                </div>

            </div>

        </footer>
    );
}