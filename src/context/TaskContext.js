import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getTask = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Usuario no autenticado");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("obras")
        .select("*")
        //.eq("done", false) // Puedes ajustar según necesites
        .order("id", { ascending: true });

      if (error) throw error;

      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (nombre, desde, hasta) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Usuario no autenticado");
        console.error(userError);
        return false;
      }

      const { error } = await supabase.from("obras").insert({
        nombre: nombre,
        desde: desde,
        hasta: hasta,
        userId: user.id,
      });

      if (error) {
        setMessage("Error al guardar tarea");
        console.error(error);
        return false;
      }

      setMessage("Tarea añadida ✅");
      getTask(); // recarga tareas después de agregar
      return true;
    } catch (err) {
      console.error("Error inesperado:", err);
      return false;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, getTask, addTask, loading, message }}>
      {children}
    </TaskContext.Provider>
  );
};
