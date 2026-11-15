import { useState } from "react";
import PuntoForm from "./pages/PuntoForm";
import ListaPuntos from "./pages/ListaPuntos";
import "./App.css";

const CODIGO_COLORES = [
    { nombre: "Plástico", color: "#f2c230" },
    { nombre: "Papel y cartón", color: "#2f6fb5" },
    { nombre: "Vidrio", color: "#3fa86b" },
    { nombre: "Metal", color: "#7b8794" },
    { nombre: "Orgánico", color: "#8a5a34" },
    { nombre: "Pilas", color: "#d24a3c" }
];

function App() {
    const [recargar, setRecargar] = useState(0);

    return (
        <div className="pagina">
            <header className="cabecera">
                <h1 className="cabecera__titulo">Puntos de reciclaje urbano</h1>
                <p className="cabecera__texto">
                    Registra dónde se recibe cada material y consulta cuánto espacio queda.
                </p>

                <ul className="codigo" aria-label="Código de colores por material">
                    {CODIGO_COLORES.map((c) => (
                        <li className="codigo__item" key={c.nombre} style={{ "--tono": c.color }}>
                            {c.nombre}
                        </li>
                    ))}
                </ul>
            </header>

            <main className="disposicion">
                <PuntoForm onRegistrado={() => setRecargar((n) => n + 1)} />
                <ListaPuntos recargar={recargar} />
            </main>
        </div>
    );
}

export default App;