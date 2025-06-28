import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import Login from "./page/Login";
import Home from "./page/Home";
import AuthCallback from "./page/AuthCallback";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
