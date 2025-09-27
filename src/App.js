import { useEffect, useState } from "react";

function App() {
  const [turnos, setTurnos] = useState([]);

  // Cargar turnos desde el backend
  const cargarTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3001/turnos");
      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
    }
  };
  

// Atender un turno (lo marca como atendido y refresca la lista)
const atenderTurno = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/turnos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: "atendido", mostrador: "Caja 1" }) // 👈 ya está bien
    });
    const data = await res.json();
    console.log("Turno actualizado:", data);
    cargarTurnos(); // 👈 refrescar al instante
  } catch (error) {
    console.error("Error al atender turno:", error);
  }
};




  // Al montar la app, cargo turnos y refresco cada 2s
  useEffect(() => {
    cargarTurnos();
    const intervalo = setInterval(cargarTurnos, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "5vh" }}>
      <h1 style={{ fontSize: 40 }}>Gestión de Turnos</h1>
      <table
        style={{
          margin: "0 auto",
          fontSize: 24,
          borderCollapse: "collapse",
          width: "80%",
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
            .filter((t) => t.estado === "pendiente") // mostrar solo pendientes
            .map((t) => (
              <tr key={t.id}>
                <td style={{ padding: 15, borderBottom: "1px solid gray" }}>
                  {t.numero}
                </td>
                <td style={{ padding: 15, borderBottom: "1px solid gray" }}>
                  {t.tipo.toUpperCase()}
                </td>
                <td style={{ padding: 15, borderBottom: "1px solid gray" }}>
                  <button
                    style={{ fontSize: 18, padding: "5px 15px" }}
                    onClick={() => atenderTurno(t.id)}
                  >
                    Atender
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
