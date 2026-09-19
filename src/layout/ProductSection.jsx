import { GameCard } from "./GameCard";
import "./ProductSection.css";

export function ProductSection({ title, productos }) {
    return (
        <section className="product-section">

            <div className="product-section-header">
                <h2>{title}</h2>

                <button type="button">
                    Ver todos
                </button>
            </div>

            <div className="product-section-grid">

                {productos.map((producto) => (
                    <GameCard
                        key={producto.id}
                        producto={producto}
                    />
                ))}

            </div>

        </section>
    );
}