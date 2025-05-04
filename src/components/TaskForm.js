import React, { useState } from "react";

import { useTask } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskname] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [imagen, setImagen] = useState("");
  const { addTask, message } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addTask(taskName);
    if (success) setTaskname("");

    setTaskname("");
    setDesde("");
    setHasta("");

    console.log({ taskName, desde, hasta });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskname"
          placeholder="obra y numero"
          value={taskName}
          onChange={(e) => setTaskname(e.target.value)}
          required
        />
        <input
          type="date"
          name="desde"
          placeholder=""
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          required
        />
        <input
          type="date"
          name="hasta"
          placeholder=""
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          required
        />
        <input
          type="image"
          name="imagen"
          placeholder="obra y numero"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <button type="submit">Añadir</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default TaskForm;
