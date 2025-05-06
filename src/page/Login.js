import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [mensajeLink, setMensajeLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      console.log("Check your email for the login link!");
    } catch (error) {
      console.error(error);
    }
    setEmail("");

    setMensajeLink("Le enviamos un link a su correo");
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
        navigate("/");
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
        />
        <button>Enviar</button>
      </form>
      <h2>{mensajeLink} </h2>
    </div>
  );
}

export default Login;
