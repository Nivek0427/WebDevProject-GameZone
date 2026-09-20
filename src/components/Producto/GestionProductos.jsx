import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../context/NotificationContext";

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../../services/productoService";

import { obtenerCategorias } from "../../services/categoriaService";

import { ListaProductosAdmin } from "./ListaProductosAdmin";
import { FormularioProducto } from "./FormularioProducto";

import "./GestionProductos.css";

export function GestionProductos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const formularioRef = useRef(null);

    const { mostrarNotificacion } = useNotification();

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();

            setProductos(data);

        } catch (error) {

            console.error(
                "Error al cargar productos:",
                error
            );

            mostrarNotificacion(
                "Error al cargar los productos",
                "error"
            );
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();

            setCategorias(data);

        } catch (error) {

            console.error(
                "Error al cargar categorías:",
                error
            );

            mostrarNotificacion(
                "Error al cargar las categorías",
                "error"
            );
        }
    };

    const desplazarAlFormulario = () => {
        setTimeout(() => {

            formularioRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);
    };

    const nuevoProducto = () => {

        setProductoEditar(null);

        setMostrarFormulario(true);

        desplazarAlFormulario();
    };

    const editarProducto = (producto) => {

        setProductoEditar(producto);

        setMostrarFormulario(true);

        desplazarAlFormulario();
    };

    const cancelarFormulario = () => {

        setProductoEditar(null);

        setMostrarFormulario(false);
    };

    const guardarProducto = async (producto) => {

        try {

            if (productoEditar) {

                const data = await actualizarProducto(
                    productoEditar.id,
                    producto
                );

                setProductos((actuales) =>
                    actuales.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

                mostrarNotificacion(
                    "Producto actualizado correctamente"
                );

            } else {

                const data = await crearProducto(producto);

                setProductos((actuales) => [
                    ...actuales,
                    data
                ]);

                mostrarNotificacion(
                    "Producto creado correctamente"
                );
            }

            setProductoEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(
                "Error al guardar producto:",
                error
            );

            mostrarNotificacion(
                "Error al guardar el producto",
                "error"
            );
        }
    };

    const eliminar = async (producto) => {

        try {

            await eliminarProducto(producto.id);

            setProductos((actuales) =>
                actuales.filter(
                    (item) => item.id !== producto.id
                )
            );

            mostrarNotificacion(
                "Producto eliminado correctamente"
            );

        } catch (error) {

            console.error(
                "Error al eliminar producto:",
                error
            );

            mostrarNotificacion(
                "Error al eliminar el producto",
                "error"
            );
        }
    };

    return (
        <section className="gestion-productos">

            <div className="gestion-header">

                <div>
                    <h1>
                        Gestión de productos
                    </h1>

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
                <div
                    ref={formularioRef}
                    className="gestion-productos-formulario"
                >
                    <FormularioProducto
                        productoEditar={productoEditar}
                        categorias={categorias}
                        onGuardar={guardarProducto}
                        onCancelar={cancelarFormulario}
                    />
                </div>
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