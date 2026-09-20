import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { NotificationProvider } from "./context/NotificationContext";

import { Inicio } from "./pages/Inicio";
import { Productos } from "./pages/Productos";
import { DetalleProducto } from "./pages/DetalleProducto";
import { Login } from "./pages/Login";
import { Carrito } from "./pages/Carrito";
import { Checkout } from "./pages/Checkout";
import { CompraExitosa } from "./pages/CompraExitosa";
import { MisCompras } from "./pages/MisCompras";

import { GestionCategorias } from "./components/categoria/GestionCategorias";
import { GestionProductos } from "./components/Producto/GestionProductos";
import { GestionClientes } from "./components/Cliente/GestionClientes";
import { GestionUsuarios } from "./components/Usuario/GestionUsuarios";
import { GestionEstadosOrden } from "./components/EstadoOrden/GestionEstadosOrden";
import { GestionOrdenes } from "./components/Orden/GestionOrdenes";
import { GestionInformacion } from "./components/Informacion/GestionInformacion";

import "./responsive.css";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <NotificationProvider>

                    <Routes>

                        {/* Rutas públicas */}
                        <Route
                            path="/"
                            element={<Inicio />}
                        />

                        <Route
                            path="/productos"
                            element={<Productos />}
                        />

                        <Route
                            path="/productos/:id"
                            element={<DetalleProducto />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/carrito"
                            element={<Carrito />}
                        />

                        {/* Rutas protegidas para cualquier usuario autenticado */}
                        <Route element={<ProtectedRoute />}>

                            <Route
                                path="/checkout"
                                element={<Checkout />}
                            />

                            <Route
                                path="/compra-exitosa"
                                element={<CompraExitosa />}
                            />

                            <Route
                                path="/mis-compras"
                                element={<MisCompras />}
                            />

                        </Route>

                        {/* Rutas protegidas solo para administradores */}
                        <Route element={<ProtectedRoute requireAdmin />}>

                            <Route
                                path="/productos/administrar"
                                element={<GestionProductos />}
                            />

                            <Route
                                path="/categorias"
                                element={<GestionCategorias />}
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
                                path="/ordenes"
                                element={<GestionOrdenes />}
                            />

                            <Route
                                path="/estados-orden"
                                element={<GestionEstadosOrden />}
                            />

                            <Route
                                path="/informacion"
                                element={<GestionInformacion />}
                            />

                        </Route>

                    </Routes>
                </NotificationProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;