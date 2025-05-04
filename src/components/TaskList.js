import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext"; // Ajusta el path si es necesario
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { tasks, getTask, loading } = useTask();

  useEffect(() => {
    getTask();
  }, []);

  function renderTask() {
    if (loading) return <p>Cargando...</p>;

    if (tasks.length === 0) return <p>No hay tareas aún.</p>;

    return (
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </ul>
    );
  }

  return <div>{renderTask()}</div>;
}
