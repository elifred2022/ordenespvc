function TaskCard({ task }) {
  const handleDelete = () => {
    alert("eliminando");
  };

  const handleToggleDone = () => {
    alert("hecho");
  };

  return (
    <div>
      <h3>{task.nombre} </h3>
      <h3>{task.desde} </h3>
      <h3>{task.hasta} </h3>
      <div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleToggleDone}>Done</button>
      </div>
    </div>
  );
}

export default TaskCard;
