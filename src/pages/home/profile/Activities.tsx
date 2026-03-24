import { useEffect, useState } from "react";
import { useAuth } from "../../../ctx/AuthContext";
import { useTheme } from "../../../ctx/ThemeContext";
import { API } from "../../../services/api";

export default function ActivitiesInfo() {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [userActivities, setUserActivities] = useState<any>(null);

  const getUserActivities = async () => {
    if (!user) return;
    try {
      const data = await API.user.activitiesInfo(user.NumeroInscription);
      setUserActivities({
        LibelleActivite: data?.Activite?.LibelleActivite || "Activité inconnue",
        Adresse: data?.AdresseActivite || "Adresse inconnue",
        Ville: data?.VilleAdresseActivite || "Ville inconnue",
        Gouvernorat: data?.GouvernoratActivite || "Gouvernorat inconnu",
        Fax: data?.FaxActivite || "Fax inconnu",
        Mobile: data?.TelMobileActivite || "Mobile inconnu",
        AdresseAR: data?.AdresseActiviteArabe || "العنوان غير معروف",
        VilleAR: data?.VilleAdresseActiviteArabe || "المدينة غير معروفة",
        GouvernoratAR: data?.GouvernoratActiviteArabe || "الولاية غير معروفة",
        Email: data?.EmailActivite || "Email inconnu",
        Fixe: data?.TelFixeActivite || "Fixe inconnu",
        DateDebutActivite: data?.DateDebutActivite || "Date inconnue",
      });
    } catch (err) {
      console.error("Error loading activities:", err);
    } 
  };

  useEffect(() => {
    getUserActivities();
  }, [user]);

  // Use placeholders while loading
  const fields = [
    { label: "Libelle Activité", value: userActivities?.LibelleActivite || "Chargement..." },
    { label: "Adresse", value: userActivities?.Adresse || "Chargement..." },
    { label: "Ville", value: userActivities?.Ville || "Chargement..." },
    { label: "Gouvernorat", value: userActivities?.Gouvernorat || "Chargement..." },
    { label: "Fax", value: userActivities?.Fax || "Chargement..." },
    { label: "Mobile", value: userActivities?.Mobile || "Chargement..." },
    { label: "العنوان", value: userActivities?.AdresseAR || "جارٍ التحميل..." },
    { label: "المدينة", value: userActivities?.VilleAR || "جارٍ التحميل..." },
    { label: "الولاية", value: userActivities?.GouvernoratAR || "جارٍ التحميل..." },
    { label: "Email", value: userActivities?.Email || "Chargement..." },
    { label: "Fixe", value: userActivities?.Fixe || "Chargement..." },
    { label: "Date Début Activité", value: userActivities?.DateDebutActivite || "Chargement..." },
  ];

  return (
    <div className="w-full mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {fields.map((f, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span
              className="font-medium w-full sm:w-44 md:w-48 break-words"
              style={{ color: theme.colors.text }}
            >
              {f.label}:
            </span>
            <span
              className="w-full break-words"
              style={{ color: theme.colors.background }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
