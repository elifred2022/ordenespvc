import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import TaskCardLectura from "./TaskCardLectura"; // ⬅️ Importá el componente de solo lectura

export default function TaskList() {
  const { tasks, getTask, loading, isAdmin } = useTask(); // ⬅️ Trae isAdmin del contexto

  useEffect(() => {
    getTask();
  }, []);

  function renderTask() {
    if (loading) return <p>Cargando...</p>;
    if (tasks.length === 0) return <p>No hay tareas aún.</p>;

    return (
      <ul className="list-disc pl-5">
        {tasks.map((task) =>
          isAdmin ? (
            <TaskCard key={task.id} task={task} />
          ) : (
            <TaskCardLectura key={task.id} task={task} />
          )
        )}
      </ul>
    );
  }

  return <div>{renderTask()}</div>;
}
