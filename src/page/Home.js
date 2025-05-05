import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/login"); // Redirige a login si no hay usuario
      } else {
        setUserEmail(user.email); // Guarda el email del usuario logueado
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
      <button onClick={handleLogout}>Logout</button>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Home;
