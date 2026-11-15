import { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";

const VACIO = { nombre: "", sector: "", material: "", capacidad: "" };

function PuntoForm({ onRegistrado }) {
    const [formulario, setFormulario] = useState(VACIO);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const [guardando, setGuardando] = useState(false);

    function manejarCambios(event) {
        const { name, value } = event.target;
        setFormulario((anterior) => ({ ...anterior, [name]: value }));
    }

    async function manejarEnvio(event) {
        event.preventDefault();
        setError("");
        setExito("");
        setGuardando(true);

        try {
            const respuesta = await fetch(`${API_BASE_URL}/puntos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: formulario.nombre.trim(),
                    sector: formulario.sector.trim(),
                    material: formulario.material.trim(),
                    capacidad: Number(formulario.capacidad)
                })
            });

            if (!respuesta.ok) {
                const texto = await respuesta.text();
                throw new Error(texto || "No se pudo registrar el punto");
            }

            setFormulario(VACIO);
            setExito("Punto registrado. Ya aparece en el listado.");
            onRegistrado();
        } catch (err) {
            setError(
                err instanceof TypeError
                    ? "No hay conexión con el servidor. Revisa que el backend esté activo en el puerto 8080."
                    : err.message
            );
        } finally {
            setGuardando(false);
        }
    }

    return (
        <form className="registro" onSubmit={manejarEnvio}>
            <h2 className="registro__titulo">Registrar un punto</h2>
            <p className="registro__ayuda">
                Completa los cuatro datos del punto de acopio.
            </p>

            <label className="campo" htmlFor="nombre">
                <span>Nombre del punto</span>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="EcoEstación Norte"
                    value={formulario.nombre}
                    onChange={manejarCambios}
                    required
                />
            </label>

            <label className="campo" htmlFor="sector">
                <span>Sector o barrio</span>
                <input
                    id="sector"
                    name="sector"
                    type="text"
                    placeholder="La Floresta"
                    value={formulario.sector}
                    onChange={manejarCambios}
                    required
                />
            </label>

            <label className="campo" htmlFor="material">
                <span>Material que recibe</span>
                <input
                    id="material"
                    name="material"
                    type="text"
                    list="materiales"
                    placeholder="Plástico"
                    value={formulario.material}
                    onChange={manejarCambios}
                    required
                />
                <datalist id="materiales">
                    <option value="Plástico" />
                    <option value="Papel y cartón" />
                    <option value="Vidrio" />
                    <option value="Metal" />
                    <option value="Orgánico" />
                    <option value="Pilas" />
                </datalist>
            </label>

            <label className="campo" htmlFor="capacidad">
                <span>Capacidad disponible (unidades)</span>
                <input
                    id="capacidad"
                    name="capacidad"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="120"
                    value={formulario.capacidad}
                    onChange={manejarCambios}
                    required
                />
            </label>

            <p className="mensaje mensaje--error" role="alert">{error}</p>
            <p className="mensaje mensaje--exito" role="status">{exito}</p>

            <button className="boton" type="submit" disabled={guardando} aria-busy={guardando}>
                {guardando ? "Guardando..." : "Guardar punto"}
            </button>
        </form>
    );
}

export default PuntoForm;