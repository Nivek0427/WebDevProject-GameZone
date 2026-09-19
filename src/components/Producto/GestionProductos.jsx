import { useEffect, useState } from "react";

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../../services/productoService";

import { obtenerCategorias } from "../../services/categoriaService";

import { ListaProductosAdmin } from "./ListaProductosAdmin";
import { FormularioProducto } from "./FormularioProducto";

//import "./GestionProductos.css";

export function GestionProductos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardarProducto = async (producto) => {
        try {
            if (productoEditar) {

                const data = await actualizarProducto(
                    productoEditar.id,
                    producto
                );

                setProductos(
                    productos.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

            } else {

                const data = await crearProducto(producto);

                setProductos([
                    ...productos,
                    data
                ]);
            }

            setProductoEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
        }
    };

    const editarProducto = (producto) => {
        setProductoEditar(producto);
        setMostrarFormulario(true);
    };

    const nuevoProducto = () => {
        setProductoEditar(null);
        setMostrarFormulario(true);
    };

    const cancelarFormulario = () => {
        setProductoEditar(null);
        setMostrarFormulario(false);
    };

    const eliminar = async (producto) => {
        try {
            await eliminarProducto(producto.id);

            setProductos(
                productos.filter(
                    (item) => item.id !== producto.id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="gestion-productos">

            <div className="gestion-header">

                <div>
                    <h1>Gestión de productos</h1>

                    <p>
                        Administra los productos de GameZone.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={nuevoProducto}
                >
                    + Nuevo producto
                </button>

            </div>

            {mostrarFormulario && (
                <FormularioProducto
                    productoEditar={productoEditar}
                    categorias={categorias}
                    onGuardar={guardarProducto}
                    onCancelar={cancelarFormulario}
                />
            )}

            <ListaProductosAdmin
                productos={productos}
                categorias={categorias}
                onEditar={editarProducto}
                onEliminar={eliminar}
            />

        </section>
    );
}