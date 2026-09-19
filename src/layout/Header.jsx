import "./Header.css";

export function Header() {
    return (
        <header className="header">
            <div className="header-container">

                {/* Logo */}
                <div className="header-logo">
                    <span className="logo-icon">🎮</span>
                    <span className="logo-text">GameZone</span>
                </div>

                {/* Buscador */}
                <div className="header-search">
                    <input
                        type="text"
                        placeholder="Buscar juegos, tarjetas y más..."
                    />

                    <button type="button">
                        🔍
                    </button>
                </div>

                {/* Acciones */}
                <div className="header-actions">

                    <button className="header-action" type="button">
                        <span className="action-icon">👤</span>

                        <span className="action-content">
                            <small>Hola, jugador</small>
                            <strong>Mi cuenta</strong>
                        </span>
                    </button>

                    <button className="header-cart" type="button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">0</span>
                    </button>

                </div>

            </div>
        </header>
    );
}
