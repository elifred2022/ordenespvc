import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      });

      if (error) {
        console.error("Error al procesar el login:", error.message);
      } else {
        // Redirige al home o a donde quieras
        navigate("/home");
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Procesando login...</h2>
      <p>Por favor espera unos segundos.</p>
    </div>
  );
}

export default AuthCallback;
