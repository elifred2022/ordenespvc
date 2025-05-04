function TaskCard({ task }) {
  const handleDelete = () => {
    alert("eliminando");
  };

  const handleToggleDone = () => {
    alert("hecho");
  };

  return (
    <div>
      <h1>{task.name} </h1>
      <div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleToggleDone}>Done</button>
      </div>
    </div>
  );
}

export default TaskCard;
