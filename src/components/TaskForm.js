import { useState } from "react";
import { supabase } from "../supabase/client";

export default function TaskForm() {
  const [nombre, setNombre] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) return alert("Selecciona un archivo");

    const nombreArchivo = `${Date.now()}_${archivo.name}`;

    // 1. Subir imagen al bucket
    const { error: uploadError } = await supabase.storage
      .from("planos")
      .upload(nombreArchivo, archivo);

    if (uploadError) {
      console.error("Error al subir imagen:", uploadError.message);
      return;
    }

    // 2. Insertar datos en la tabla

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("obras").insert([
      {
        nombre,
        desde,
        hasta,
        imagen: nombreArchivo,
        userId: user.id, // ← aquí lo agregás
      },
    ]);

    if (insertError) {
      console.error("Error al guardar datos:", insertError.message);
      return;
    }

    console.log(nombreArchivo);

    // Limpiar formulario
    setNombre("");
    setDesde("");
    setHasta("");
    setArchivo(null);
    alert("Plano subido con éxito");
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
    </form>
  );
}
