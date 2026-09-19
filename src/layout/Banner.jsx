import Banner from './Banner.css';

export function Banner() {
    return (
        <section className="banner">
            <div className="banner-container">

                <div className="banner-content">
                    <span className="banner-tag">
                        GAMEZONE
                    </span>

                    <h1>
                        Tu próxima aventura
                        <br />
                        comienza aquí
                    </h1>

                    <p>
                        Descubre juegos, ofertas y las mejores
                        experiencias para gamers.
                    </p>

                    <button className="banner-button">
                        Ver juegos
                    </button>
                </div>

                <div className="banner-image">
                    <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
                        alt="Videojuegos"
                    />
                </div>

            </div>
        </section>
    );
}