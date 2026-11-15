import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import PuntoCard from "./PuntoCard";

function ListaPuntos({ recargar }) {
    const [puntos, setPuntos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelado = false;

        async function cargarPuntos() {
            setError("");
            try {
                const respuesta = await fetch(`${API_BASE_URL}/puntos`);
                if (!respuesta.ok) {
                    throw new Error("El servidor no pudo entregar los puntos");
                }
                const datos = await respuesta.json();
                if (!cancelado) setPuntos(datos);
            } catch (err) {
                if (!cancelado) {
                    setError(
                        err instanceof TypeError
                            ? "No hay conexión con el servidor. Revisa que el backend esté activo en el puerto 8080."
                            : err.message
                    );
                }
            } finally {
                if (!cancelado) setCargando(false);
            }
        }

        cargarPuntos();

        return () => {
            cancelado = true;
        };
    }, [recargar]);

    const maximo = puntos.reduce((mayor, p) => Math.max(mayor, p.capacidad), 0);

    return (
        <section className="listado" aria-label="Puntos de reciclaje registrados">
            <h2 className="listado__titulo">
                Puntos registrados
                {!cargando && !error && <span className="listado__total">{puntos.length}</span>}
            </h2>

            {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}
            {cargando && <p className="listado__vacio">Cargando puntos...</p>}

            {!cargando && !error && puntos.length === 0 && (
                <p className="listado__vacio">
                    Todavía no hay puntos. Registra el primero con el formulario.
                </p>
            )}

            <div className="rejilla">
                {puntos.map((p) => (
                    <PuntoCard key={p.id} punto={p} maximo={maximo} />
                ))}
            </div>
        </section>
    );
}

export default ListaPuntos;