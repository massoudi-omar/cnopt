import { useEffect, useState } from "react";
import { useAuth } from "../../ctx/AuthContext";
import AuthHeader from "../../components/AuthHeader";
import Hero from "../../components/Hero";
import LoginForm from "../../components/LoginForm";
import heroBg from "../../assets/images/background.png";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ctx/ToastContext";

export default function Login() {
  const { login, user } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);


  const handleLogin = async (NumeroInscription: any, MotDePasse: any) => {
    setLoading(true);
    setError(null);

    try {
      const data = { NumeroInscription, MotDePasse };
      const response = await API.auth.signin(data);

      const user = {
        NumeroInscription: response.pharmacien.NumeroInscription,
        Nom: response.pharmacien.Nom,
        Prenom: response.pharmacien.Prenom,
        EmailPersonnel: response.pharmacien.EmailPersonnel,
        VilleAdressePersonnelle: response.pharmacien.VilleAdressePersonnelle,

      };

      login(user);
      showToast(response?.message, "success");


    } catch (err: any) {
      showToast(
        err?.response?.data?.message === "credentials incorrect"
          ? "Identifiants incorrects"
          : "Erreur lors de la connexion",
        "info"
      );

      setError(err?.response?.data?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />

      <Hero
        title="Connexion"
        text="Saisissez vos identifiants de connexion pour accéder à votre compte"
        backgroundImage={heroBg}
        backgroundColor="#00B16A"
      >
        <LoginForm
          onLogin={(NumeroInscription: any, MotDePasse: any) => handleLogin(NumeroInscription, MotDePasse)}
          loading={loading}
          error={error}
          linkText="Pas encore inscrit ? S'inscrire"
          linkPath="/inscription"
        />

      </Hero>
    </>
  );
}
