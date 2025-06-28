import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mensajeLink, setMensajeLink] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Agregado para manejar errores de forma visible
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message antes de enviar
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo:
            "https://ordenespvc-q18zf5qe1-eliezer-martinezs-projects.vercel.app/",
        },
      });

      if (error) throw error;

      console.log("Check your email for the login link!");
      setMensajeLink("Le enviamos un link a su correo");
    } catch (error) {
      setErrorMessage("Hubo un error al enviar el link. Intenta nuevamente.");
      console.error(error);
    }

    setEmail(""); // Limpiar el email después de enviar
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log("Error fetching user:", error.message);
        return;
      }

      if (user) {
        navigate("/"); // Si hay un usuario, redirige a la página principal
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2> Ingrese su correo </h2>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="escribí tu email"
          value={email}
        />
        <button>Enviar</button>
      </form>

      {/* Mostrar mensaje de éxito o error */}
      {mensajeLink && <h2>{mensajeLink}</h2>}
      {errorMessage && <h3 style={{ color: "red" }}>{errorMessage}</h3>}
    </div>
  );
}

export default Login;
