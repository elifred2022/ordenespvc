import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import Login from "./page/Login";
import Home from "./page/Home";
import { TaskContextProvider } from "./context/TaskContext";
import AuthCallback from "./page/AuthCallback";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (session) {
        navigate("/"); // Navega a Home si hay una sesión válida
      } else {
        navigate("/login"); // Navega a Login si no hay sesión
      }
    });

    // Limpieza para evitar fugas de memoria
    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]); // Asegúrate de que 'navigate' esté en la lista de dependencias

  return (
    <div className="App">
      <TaskContextProvider>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
