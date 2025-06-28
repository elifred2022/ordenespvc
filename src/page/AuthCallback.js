// src/page/AuthCallback.jsx
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSessionFromUrl(); // IMPORTANTE

      if (error) {
        console.error("Error procesando callback del magic link:", error);
      } else {
        console.log("Login exitoso con magic link");
        navigate("/home");
      }
    };

    handleCallback();
  }, [navigate]);

  return <p>Verificando sesión, por favor espera...</p>;
}

export default AuthCallback;
