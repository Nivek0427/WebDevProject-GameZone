import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem("carrito");
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito((actual) => {
            const existente = actual.find((item) => item.id === producto.id);

            if (existente) {
                return actual.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...actual, { ...producto, cantidad: 1 }];
        });
    };

    const aumentarCantidad = (id) => {
        setCarrito((actual) =>
            actual.map((item) =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    };

    const disminuirCantidad = (id) => {
        setCarrito((actual) =>
            actual
                .map((item) =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((actual) => actual.filter((item) => item.id !== id));
    };

    const vaciarCarrito = () => setCarrito([]);

    const total = carrito.reduce(
        (acumulado, item) =>
            acumulado + Number(item.precio) * item.cantidad,
        0
    );

    const cantidadTotal = carrito.reduce(
        (acumulado, item) => acumulado + item.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{
                carrito,
                total,
                cantidadTotal,
                agregarAlCarrito,
                aumentarCantidad,
                disminuirCantidad,
                eliminarDelCarrito,
                vaciarCarrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
