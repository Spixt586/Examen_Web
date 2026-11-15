// Colores de los contenedores de reciclaje según el material
const TONOS = [
    { clave: ["plast", "pet"], color: "#f2c230" },
    { clave: ["papel", "carton", "cartón"], color: "#2f6fb5" },
    { clave: ["vidrio", "cristal"], color: "#3fa86b" },
    { clave: ["metal", "lata", "aluminio"], color: "#7b8794" },
    { clave: ["organ", "compost"], color: "#8a5a34" },
    { clave: ["pila", "bateria", "batería"], color: "#d24a3c" }
];

export function tonoDeMaterial(material) {
    const texto = (material || "").toLowerCase();
    const encontrado = TONOS.find((t) => t.clave.some((c) => texto.includes(c)));
    return encontrado ? encontrado.color : "#2f7d4f";
}

function PuntoCard({ punto, maximo }) {
    const tono = tonoDeMaterial(punto.material);
    const nivel = maximo > 0 ? Math.max(4, Math.round((punto.capacidad / maximo) * 100)) : 0;

    return (
        <article className="punto" style={{ "--tono": tono }}>
            <div className="punto__tapa" aria-hidden="true" />

            <div className="punto__cuerpo">
                <p className="punto__material">
                    <span className="punto__punto" aria-hidden="true" />
                    {punto.material}
                </p>
                <h3 className="punto__nombre">{punto.nombre}</h3>
                <p className="punto__sector">{punto.sector}</p>

                <div className="nivel">
                    <div
                        className="nivel__pista"
                        role="img"
                        aria-label={`Capacidad ${punto.capacidad} de ${maximo} unidades del punto con más espacio`}
                    >
                        <div className="nivel__relleno" style={{ width: `${nivel}%` }} />
                    </div>
                    <p className="nivel__texto">
                        <strong>{punto.capacidad}</strong> unidades disponibles
                    </p>
                </div>
            </div>
        </article>
    );
}

export default PuntoCard;