import { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function TaskForm() {
  const [nombre, setNombre] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [archivo, setArchivo] = useState(null);

  const { addTaskWithImage, message } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exito = await addTaskWithImage({ nombre, desde, hasta, archivo });

    if (exito) {
      setNombre("");
      setDesde("");
      setHasta("");
      setArchivo(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Subir nuevo plano</h3>
      <input
        type="text"
        placeholder="Nombre de la obra"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="date"
        value={desde}
        onChange={(e) => setDesde(e.target.value)}
        required
      />
      <input
        type="date"
        value={hasta}
        onChange={(e) => setHasta(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setArchivo(e.target.files[0])}
        required
      />
      <button type="submit">Subir plano</button>
      {message && <p>{message}</p>}
    </form>
  );
}
