import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verificarRol = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return;

      const adminEmails = [
        "elifredmason@gmail.com",
        "asistordenes@perfilesyservicios.com.ar",
      ];

      setIsAdmin(adminEmails.includes(user.email));
    };

    verificarRol();
  }, []);

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
  /*
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
  }; */

  // funcion para cargar datos e imagen en la taba de supabase
  const addTaskWithImage = async ({ nombre, desde, hasta, archivo }) => {
    try {
      if (!archivo) {
        setMessage("Archivo no seleccionado");
        return false;
      }

      const sanitizeFileName = (fileName) => {
        return fileName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9.\-_]/g, "_");
      };

      const sanitizedFileName = sanitizeFileName(archivo.name);
      const nombreArchivo = `${Date.now()}_${sanitizedFileName}`;

      // 1. Subir imagen
      const { error: uploadError } = await supabase.storage
        .from("planos")
        .upload(nombreArchivo, archivo);

      if (uploadError) {
        console.error("Error al subir imagen:", uploadError.message);
        setMessage("Error al subir imagen");
        return false;
      }

      // 2. Insertar en tabla
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Usuario no autenticado");
        console.error(userError);
        return false;
      }

      const { error: insertError } = await supabase.from("obras").insert([
        {
          nombre,
          desde,
          hasta,
          imagen: nombreArchivo,
          userId: user.id,
        },
      ]);

      if (insertError) {
        console.error("Error al guardar datos:", insertError.message);
        setMessage("Error al guardar datos");
        return false;
      }

      setMessage("Plano subido con éxito ✅");
      getTask();
      return true;
    } catch (err) {
      console.error("Error inesperado:", err);
      setMessage("Error inesperado");
      return false;
    }
  };

  // Función para eliminar tarea e imagen
  const deleteTaskWithImage = async (task) => {
    try {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar este plano?"
      );
      if (!confirmDelete) return;

      // 1. Eliminar imagen del Storage
      const { error: storageError } = await supabase.storage
        .from("planos")
        .remove([task.imagen]);

      if (storageError) {
        console.error(
          "Error al eliminar imagen del storage:",
          storageError.message
        );
        setMessage("Error al eliminar imagen");
        return false;
      }

      // 2. Eliminar registro de la base de datos
      const { error: dbError } = await supabase
        .from("obras")
        .delete()
        .eq("id", task.id);

      if (dbError) {
        console.error("Error al eliminar registro:", dbError.message);
        setMessage("Error al eliminar registro");
        return false;
      }

      setMessage("Plano eliminado correctamente ✅");
      getTask(); // recargar la lista
      return true;
    } catch (error) {
      console.error("Error inesperado al eliminar:", error);
      setMessage("Error inesperado");
      return false;
    }
  };

  // Generar URL pública
  const getImageUrl = (path) => {
    return `https://jzwjtbsrnmniztxltrnw.supabase.co/storage/v1/object/public/planos/${path}`;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        addTaskWithImage,
        loading,
        message,
        deleteTaskWithImage,
        getImageUrl,
        isAdmin,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
