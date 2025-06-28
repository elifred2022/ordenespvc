import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        console.error("Error procesando magic link:", error);
      } else {
        navigate("/home");
      }
    };

    handleCallback();
  }, [navigate]);

  return <p>Verificando sesión, por favor espera...</p>;
}

export default AuthCallback;
