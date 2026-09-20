import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { crearOrden } from "../services/ordenService";
import { useNotification } from "../context/NotificationContext";
import "./Checkout.css";

export function Checkout() {
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const { carrito, total, vaciarCarrito } = useCart();

    const [metodoPago, setMetodoPago] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const { mostrarNotificacion } = useNotification();

    const confirmarCompra = async (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            setError("El carrito está vacío");
            mostrarNotificacion("El carrito está vacío", "error");
            return;
        }

        try {
            setGuardando(true);
            setError("");

            const detalle = carrito.map((item) => ({
                producto: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: Number(item.precio),
                subtotal: Number(item.precio) * item.cantidad
            }));

            await crearOrden({
                cliente: Number(usuario.id),
                usuario: Number(usuario.id),
                fecha: new Date().toISOString().split("T")[0],
                metodo_pago: metodoPago,
                total: Number(total),
                descuento: 0,
                detalle,
                estado_orden: 3
            });

            mostrarNotificacion(
                "¡Compra realizada correctamente!"
            );

            vaciarCarrito();
            navigate("/compra-exitosa");
        } catch (error) {
            console.error(error);
            setError("No fue posible registrar la orden");
            mostrarNotificacion(
                "No fue posible registrar la orden",
                "error"
            );
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>

            <div className="checkout-resumen">
                <h2>Resumen del pedido</h2>

                {carrito.map((item) => (
                    <div className="checkout-item" key={item.id}>
                        <span>
                            {item.nombre} x {item.cantidad}
                        </span>
                        <strong>
                            ${(Number(item.precio) * item.cantidad).toLocaleString()}
                        </strong>
                    </div>
                ))}

                <div className="checkout-total">
                    Total: ${total.toLocaleString()}
                </div>
            </div>

            <form onSubmit={confirmarCompra} className="checkout-form">
                <label htmlFor="metodo_pago">Método de pago</label>

                <select
                    id="metodo_pago"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    required
                >
                    <option value="">Seleccione</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="PSE">PSE</option>
                </select>

                {error && <p className="checkout-error">{error}</p>}

                <button type="submit" disabled={guardando}>
                    {guardando ? "Procesando..." : "Confirmar compra"}
                </button>
            </form>

            <Link to="/carrito">Volver al carrito</Link>
        </div>
    );
}
