import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const handleLoginSuccess = async (response) => {
    try {
      if (!response.credential) {
        console.error("Nessuna utenza è stata ricevuta da Google");
        return;
      }

      //token al backend
      const res = await axios.post(
        "http://localhost:4000/api/users/google",
        { credential: response.credential }
      );

      console.log("Login avvenuto:", res.data);

      //decodifica token JWT
      const decoded = jwtDecode(res.data.token);
      console.log("📄 Token decodificato:", decoded);

      //salvataggio token
      localStorage.setItem("token", res.data.token);

      alert(`Benvenuto ${res.data.name}!`);

      //ritorno in homepage
      window.location.href = "/";
    } catch (error) {
      console.error("Errore durante il login Google:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Accedi con Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Errore nel login Google")}
      />
    </div>
  );
}

export default Login;
