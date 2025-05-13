import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(); // ✅ función correcta

      if (error) {
        console.error("Error al procesar el login:", error.message);
        navigate("/login");
      } else {
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
