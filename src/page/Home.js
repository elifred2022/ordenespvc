import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTask } from "../context/TaskContext"; // ⬅️ Importá el contexto

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const { isAdmin } = useTask(); // ⬅️ Obtené el rol del usuario

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/login");
      } else {
        setUserEmail(user.email);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>
        Usuario logueado: <strong>{userEmail}</strong>
      </p>
      <p>
        Rol:{" "}
        <strong style={{ color: isAdmin ? "green" : "orange" }}>
          {isAdmin ? "Administrador" : "Lector"}
        </strong>
      </p>
      <button onClick={handleLogout}>Cerrar sesión</button>

      {/* Solo admins pueden ver el formulario */}
      {isAdmin && <TaskForm />}

      <TaskList />
    </div>
  );
}

export default Home;
