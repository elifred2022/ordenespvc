import { useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskCardLectura({ task }) {
  const { getImageUrl } = useTask(); // Solo necesitamos obtener la URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = () => {
    setModalImage(getImageUrl(task.imagen));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <>
      <table border="1" cellPadding="8" style={{ marginBottom: "1rem" }}>
        <thead>
          <tr>
            <th>Obra</th>
            <th>Desde</th>
            <th>Hasta</th>
            <th>Plano</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{task.nombre}</td>
            <td>{task.desde}</td>
            <td>{task.hasta}</td>
            <td>
              <a
                href="#"
                onClick={handleImageClick}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                {task.imagen}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Plano Grande"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </>
  );
}

export default TaskCardLectura;
