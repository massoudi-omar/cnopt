import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ctx/AuthContext";
import AuthHeader from "../../components/AuthHeader";
import Hero from "../../components/Hero";
import heroBg from "../../assets/images/background.png";
import RegisterForm from "../../components/RegisterForm.tsx";
import { API } from "../../services/api";
import { useToast } from "../../ctx/ToastContext";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  const handleRegister = async (data: {
    birthDate: string;
    numInscri: string;
    numCIN: string;
    password: string;
    repeatPassword: string;
  }) => {
    // Password confirmation
    if (data.password !== data.repeatPassword) {
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }

    try {
      // Send all data to API
      const response = await API.auth.signup({
        NumeroInscription: data.numInscri,
        CIN: data.numCIN,
        MotDePasse: data.password,
        DateNaissance: data.birthDate, // add birth date
      });

      console.log("Signup response:", response);

      showToast("Inscription réussie !", "success");

    } catch (err: any) {
      const serverMessage = err?.response?.data?.message;

      if (serverMessage === "credentials incorrect") {
        showToast("Identifiants incorrects", "info");
      } else {
        showToast("Erreur lors de l'inscription", "error");
      }

      console.error("Registration error:", err);
    }
  };


  return (
    <>
      <AuthHeader />

      <div className="relative w-full">
        {/* Hero section */}
        <Hero
          title="Inscription"
          text="Saisissez vos informations pour vous inscrire à votre espace"
          backgroundImage={heroBg}
          backgroundColor="#03BCCD"
        />

        {/* Form positioned over hero, a bit lower */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-52 z-20 w-full max-w-xl px-4">
          <RegisterForm
            onRegister={handleRegister}
            linkText={"Déjà inscrit ? Se connecter"}
            linkPath={"/login"}
          />

        </div>
      </div>


    </>
  );
}
