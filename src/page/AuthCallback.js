import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      // Usamos getSessionFromUrl para procesar el magic link
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true, // Esto guarda la sesión en el almacenamiento del cliente
      });

      if (error) {
        console.error("Error al procesar el login:", error.message);
        navigate("/login"); // Redirige al login en caso de error
      } else {
        // Redirige a la página principal (o donde necesites después de la autenticación)
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
