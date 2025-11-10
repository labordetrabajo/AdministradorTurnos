import { useEffect, useState } from "react";
import "./App.css";
import fondoGestor from "./fondo-gestor.png";

function App() {
  const [turnos, setTurnos] = useState([]);
  const [atendiendo, setAtendiendo] = useState([]); // turnos que están siendo atendidos

  // Cargar turnos desde el backend
  const cargarTurnos = async () => {
    try {
      const res = await fetch("http://SERVIDOR-PC:3001/turnos");

      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
    }
  };

  // Estilos del contenedor con la imagen de fondo
  const containerStyle = {
    textAlign: "center",
    paddingTop: "5vh",
    backgroundImage: `url(${fondoGestor})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  // Estilo reutilizable para botones (fondo verde claro, fuente Totem, color y borde según el texto)
  const buttonStyle = {
    backgroundColor: "rgba(144, 238, 144, 0.35)", // verde claro semitransparente
    color: "inherit",                               // toma el mismo color que el resto (.texto)
    border: "2px solid currentColor",               // borde del mismo color que el texto (verde oscuro)
    fontFamily: '"Totem", sans-serif',              // usa Totem si está disponible
    fontSize: 28,
    padding: "8px 18px",
    borderRadius: 8,
    cursor: "pointer",
  };

  // Marcar turno como atendido (sin eliminarlo)
  const atenderTurno = async (id) => {
    try {
<<<<<<< HEAD
      await fetch(`http://SERVIDOR-PC:3001/turnos/${id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "atendido", mostrador: "Caja 1" })
      });

=======
      await fetch(`http://localhost:3001/turnos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "atendido", mostrador: "Caja 1" })
      });

>>>>>>> d78de8be67fe0c0b05649223f5acfad0e7552da4
      setAtendiendo((prev) => [...prev, id]); // agregar a la lista de atendiendo
    } catch (error) {
      console.error("Error al atender turno:", error);
    }
  };

  // Terminar turno (cambia estado a terminado)
  const terminarTurno = async (id) => {
    try {
      // 1️⃣ Actualizar el estado a "terminado" en el backend
<<<<<<< HEAD
      await fetch(`http://SERVIDOR-PC:3001/turnos/${id}`, {

=======
      await fetch(`http://localhost:3001/turnos/${id}`, {
>>>>>>> d78de8be67fe0c0b05649223f5acfad0e7552da4
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "terminado" })
      });

      // 2️⃣ Eliminar de la lista visible en frontend
      setTurnos((prev) => prev.filter((t) => t.id !== id));
      setAtendiendo((prev) => prev.filter((tid) => tid !== id));
    } catch (error) {
      console.error("Error al terminar turno:", error);
    }
  };

  useEffect(() => {
    cargarTurnos();
    const intervalo = setInterval(cargarTurnos, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={containerStyle}>
      <h1 className="texto" style={{ fontSize: 40 }}>Gestión de Turnos</h1>
      <table
      className="texto" 
        style={{
          margin: "0 auto",
          fontSize: 34,
          borderCollapse: "collapse",
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.12)", // semitransparente para ver fondo
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          borderRadius: 12,
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "3px solid black" }}>Número</th>
            <th style={{ borderBottom: "3px solid black" }}>Tipo</th>
            <th style={{ borderBottom: "3px solid black" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {turnos
            .filter((t) => t.estado === "pendiente" || atendiendo.includes(t.id))
            .map((t) => (
              <tr key={t.id} style={{
                  backgroundColor: atendiendo.includes(t.id)
                    ? "rgba(144,238,144,0.45)" // verde semitransparente cuando atiende
                    : "transparent",          // transparente para mostrar el fondo
                }}>
                  <td style={{ padding: 15, borderBottom: "1px solid rgba(128,128,128,0.35)", background: "transparent" }}>
                    {t.numero}
                  </td>
                  <td style={{ padding: 15, borderBottom: "1px solid rgba(128,128,128,0.35)", background: "transparent" }}>
                    {t.tipo.toUpperCase()}
                  </td>
                  <td style={{ padding: 15, borderBottom: "1px solid rgba(128,128,128,0.35)", background: "transparent" }}>
                  {atendiendo.includes(t.id) ? (
                    <button
                      style={buttonStyle}
                      onClick={() => terminarTurno(t.id)}
                    >
                      Terminado
                    </button>
                  ) : (
                    <button
                      style={buttonStyle}
                      onClick={() => atenderTurno(t.id)}
                    >
                      Atender
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
