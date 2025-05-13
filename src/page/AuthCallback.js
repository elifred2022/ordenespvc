import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client"; // Asegurate que esto apunta a tu archivo de configuración de supabase

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      // Maneja los parámetros de la URL (tokens)
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      });

      if (error) {
        console.error("Error al procesar el login:", error.message);
        navigate("/login"); // Redirige al login en caso de error
      } else {
        // Redirige al Home o a la página deseada después de autenticarse
        navigate("/home");
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Procesando login...</h2>
      <p>Por favor espera un momento.</p>
    </div>
  );
}

export default AuthCallback;
