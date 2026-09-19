import "./GameCard.css";

export function GameCard({ producto }) {

    const {
        nombre,
        imagen,
        precio,
        stock
    } = producto;

    return (
        <article className="game-card">

            <div className="game-card-image">
                <img
                    src={imagen}
                    alt={nombre}
                />

                {stock === 0 && (
                    <span className="game-card-stock">
                        Agotado
                    </span>
                )}
            </div>

            <div className="game-card-content">

                <h3 className="game-card-title">
                    {nombre}
                </h3>

                <div className="game-card-info">

                    <span className="game-card-label">
                        Videojuego
                    </span>

                    <span className="game-card-price">
                        ${Number(precio).toLocaleString("es-CO")}
                    </span>

                </div>

                <button
                    className="game-card-button"
                    disabled={stock === 0}
                >
                    {stock === 0
                        ? "Agotado"
                        : "Ver producto"
                    }
                </button>

            </div>

        </article>
    );
}