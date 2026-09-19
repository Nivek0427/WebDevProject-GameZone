import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



import { Header } from "../layout/Header";
import { Menu } from "../layout/Menu";
import { ProductSection } from "../layout/ProductSection";
import { Footer } from "../layout/Footer";

import { obtenerProductos } from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";

export function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    const categoriaSeleccionada = searchParams.get("categoria");

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, [categoriaSeleccionada]);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            if (categoriaSeleccionada) {
                const productosFiltrados = data.filter(
                    (producto) =>
                        producto.categoria === categoriaSeleccionada
                );

                setProductos(productosFiltrados);
            } else {
                setProductos(data);
            }
        } catch (error) {
            console.error(error);
            setError("Error al cargar los productos");
        } finally {
            setCargando(false);
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
            setError("Error al cargar las categorías");
        }
    };

    return (
        <>
            <Header />

            <Menu />

            {cargando && (
                <p>Cargando productos...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!cargando && !error && (
                <ProductSection
                    title="Todos los juegos"
                    productos={productos}
                    categorias={categorias}
                />
            )}

            <Footer />
        </>
    );
}