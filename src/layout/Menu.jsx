import "./Menu.css";

export function Menu() {
    return (
        <nav className="menu">
            <div className="menu-container">

                <a href="#" className="menu-item menu-categories">
                    ☰ Categorías
                </a>


                <a href="#" className="menu-item">
                    Ofertas
                </a>

                <a href="#" className="menu-item">
                    Tarjetas de regalo
                </a>

                <a href="#" className="menu-item">
                    Ahora en tendencia
                </a>

                

            </div>
        </nav>
    );
}