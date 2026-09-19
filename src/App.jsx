import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Inicio } from "./pages/Inicio";
import { Productos } from "./pages/Productos";

import { GestionCategorias } from "./components/categoria/GestionCategorias";
import { GestionProductos } from "./components/Producto/GestionProductos";
import { GestionClientes } from "./components/Cliente/GestionClientes";
import { GestionUsuarios } from "./components/Usuario/GestionUsuarios";
import { GestionEstadosOrden } from "./components/EstadoOrden/GestionEstadosOrden";
import { GestionOrdenes } from "./components/Orden/GestionOrdenes";
import { GestionInformacion } from "./components/Informacion/GestionInformacion";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/productos"
                    element={<Productos />}
                />

                <Route
                    path="/categorias"
                    element={<GestionCategorias />}
                />

                <Route
                    path="/productos/administrar"
                    element={<GestionProductos />}
                />

                <Route
                    path="/clientes"
                    element={<GestionClientes />}
                />

                <Route
                    path="/usuarios"
                    element={<GestionUsuarios />}
                />

                <Route
                    path="/estados-orden"
                    element={<GestionEstadosOrden />}
                />

                <Route
                    path="/ordenes"
                    element={<GestionOrdenes />}
                />

                <Route
                    path="/informacion"
                    element={<GestionInformacion />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
