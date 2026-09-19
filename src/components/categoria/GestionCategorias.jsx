import { useEffect, useState } from "react";

import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../../services/categoriaService";

import { ListaCategoriasAdmin } from "./ListaCategoriasAdmin";
import { FormularioCategoria } from "./FormularioCategoria";

import "./GestionCategorias.css";

export function GestionCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [categoriaEditar, setCategoriaEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardarCategoria = async (categoria) => {

        try {

            if (categoriaEditar) {

                const data = await actualizarCategoria(
                    categoriaEditar.id,
                    categoria
                );

                setCategorias(
                    categorias.map((item) =>
                        item.id === data.id
                            ? data
                            : item
                    )
                );

            } else {

                const data = await crearCategoria(categoria);

                setCategorias([
                    ...categorias,
                    data
                ]);
            }

            setCategoriaEditar(null);
            setMostrarFormulario(false);

        } catch (error) {
            console.error(error);
        }
    };

    const eliminar = async (categoria) => {
        try {
            await eliminarCategoria(categoria.id);

            setCategorias(
                categorias.filter(
                    (item) => item.id !== categoria.id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const editarCategoria = (categoria) => {
        setCategoriaEditar(categoria);
        setMostrarFormulario(true);
    };

    const nuevaCategoria = () => {
        setCategoriaEditar(null);
        setMostrarFormulario(true);
    };

    const cancelarFormulario = () => {
        setCategoriaEditar(null);
        setMostrarFormulario(false);
    };

    return (
        <section className="gestion-categorias">

            <div className="gestion-header">

                <div>
                    <h1>Gestión de categorías</h1>
                    <p>
                        Administra las categorías de GameZone.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={nuevaCategoria}
                >
                    + Nueva categoría
                </button>

            </div>

            {mostrarFormulario && (
                <FormularioCategoria
                    categoriaEditar={categoriaEditar}
                    onGuardar={guardarCategoria}
                    onCancelar={cancelarFormulario}
                />
            )}

            <ListaCategoriasAdmin
                categorias={categorias}
                onEditar={editarCategoria}
                onEliminar={eliminar}
            />

        </section>
    );
}