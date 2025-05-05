import { useState } from "react";
import { supabase } from "../supabase/client";

function TaskCard({ task }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen que se va a mostrar en el modal

  const handleDelete = () => {
    alert("eliminando");
  };

  const handleToggleDone = () => {
    alert("hecho");
  };

  const getImageUrl = (path) => {
    return `https://jzwjtbsrnmniztxltrnw.supabase.co/storage/v1/object/public/planos/${path}`;
  };

  const handleImageClick = () => {
    setModalImage(getImageUrl(task.imagen)); // Setea la URL de la imagen para el modal
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setModalImage(null); // Limpia la imagen mostrada en el modal
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
              {/* Ahora el <a> está dentro del <td> */}
              <a
                href="#"
                onClick={handleImageClick}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                {task.imagen}
              </a>
            </td>
            <td>
              <button onClick={handleDelete} style={{ marginRight: "0.5rem" }}>
                Delete
              </button>
              <button onClick={handleToggleDone}>Done</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal para ver la imagen en grande */}
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
          onClick={closeModal} // Cerrar el modal cuando se haga clic fuera de la imagen
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

export default TaskCard;
