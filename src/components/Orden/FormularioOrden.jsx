import { useEffect, useState } from "react";

import "./FormularioOrden.css";

export function FormularioOrden({
    orden,
    clientes,
    estadosOrden,
    onGuardar,
    onCancelar
}) {
    const [formulario, setFormulario] = useState({
        cliente: "",
        fecha: "",
        metodo_pago: "",
        total: "",
        descuento: "",
        detalle: "",
        estado_orden: ""
    });

    useEffect(() => {
        if (orden) {
            setFormulario({
                cliente: orden.cliente || "",
                fecha: orden.fecha || "",
                metodo_pago: orden.metodo_pago || "",
                total: orden.total || "",
                descuento: orden.descuento || "",
                detalle: orden.detalle || "",
                estado_orden: orden.estado_orden || ""
            });
        } else {
            setFormulario({
                cliente: "",
                fecha: "",
                metodo_pago: "",
                total: "",
                descuento: "",
                detalle: "",
                estado_orden: ""
            });
        }
    }, [orden]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const datosOrden = {
            cliente: formulario.cliente,
            fecha: formulario.fecha,
            metodo_pago: formulario.metodo_pago,
            total: Number(formulario.total),
            descuento: Number(formulario.descuento),
            detalle: formulario.detalle,
            estado_orden: formulario.estado_orden
        };

        onGuardar(datosOrden);
    };

    return (
        <form
            className="formulario-orden"
            onSubmit={manejarSubmit}
        >
            <h2>
                {orden ? "Editar orden" : "Nueva orden"}
            </h2>

            <div className="form-group">
                <label htmlFor="cliente">
                    Cliente
                </label>

                <select
                    id="cliente"
                    name="cliente"
                    value={formulario.cliente}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">
                        Seleccione un cliente
                    </option>

                    {clientes.map((cliente) => (
                        <option
                            key={cliente.id}
                            value={cliente.id}
                        >
                            {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="fecha">
                    Fecha
                </label>

                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formulario.fecha}
                    onChange={manejarCambio}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="metodo_pago">
                    Método de pago
                </label>

                <select
                    id="metodo_pago"
                    name="metodo_pago"
                    value={formulario.metodo_pago}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">
                        Seleccione un método
                    </option>

                    <option value="Efectivo">
                        Efectivo
                    </option>

                    <option value="Tarjeta">
                        Tarjeta
                    </option>

                    <option value="Transferencia">
                        Transferencia
                    </option>

                    <option value="PSE">
                        PSE
                    </option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="total">
                    Total
                </label>

                <input
                    type="number"
                    id="total"
                    name="total"
                    value={formulario.total}
                    onChange={manejarCambio}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="descuento">
                    Descuento
                </label>

                <input
                    type="number"
                    id="descuento"
                    name="descuento"
                    value={formulario.descuento}
                    onChange={manejarCambio}
                    min="0"
                />
            </div>

            <div className="form-group">
                <label htmlFor="detalle">
                    Detalle
                </label>

                <textarea
                    id="detalle"
                    name="detalle"
                    value={formulario.detalle}
                    onChange={manejarCambio}
                    placeholder="Detalle de la orden"
                />
            </div>

            <div className="form-group">
                <label htmlFor="estado_orden">
                    Estado de la orden
                </label>

                <select
                    id="estado_orden"
                    name="estado_orden"
                    value={formulario.estado_orden}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">
                        Seleccione un estado
                    </option>

                    {estadosOrden.map((estado) => (
                        <option
                            key={estado.id}
                            value={estado.id}
                        >
                            {estado.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-actions">
                <button type="submit">
                    {orden ? "Actualizar" : "Guardar"}
                </button>

                <button
                    type="button"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}