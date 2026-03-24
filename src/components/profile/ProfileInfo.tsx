
import { useEffect, useState } from "react";
import { useTheme } from "../../ctx/ThemeContext";
import { API } from "../../services/api";
import { useToast } from "../../ctx/ToastContext";

export default function ProfileInfo({ personnelInformations }: any) {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const { showToast } = useToast();



  const [form, setForm] = useState({
    birthDate: "Date inconnue",
    birthPlace: "Lieu de naissance inconnu",
    birthPlaceAR: "مكان الولادة غير معروف",
    nationality: "Nationalité inconnue",
    nationalityAR: "الجنسية غير معروفة",
    email: "Email inconnu",
    governorate: "Gouvernorat inconnu",
    governorateAR: "الولاية غير معروفة",
    city: "Ville inconnue",
    cityAR: "المدينة غير معروفة",
    address: "Adresse inconnue",
    addressAR: "العنوان غير معروف",
    phoneFix: "Téléphone inconnu",
    phoneMobile: "Téléphone inconnu",
    numeroInscription: "Num inconnu",
  });

  // Update form when personnelInformations arrives
  useEffect(() => {
    if (personnelInformations) {
      setForm((prev) => ({
        ...prev,
        birthDate: (personnelInformations.dateNaissance)?.split('T')[0] || prev.birthDate,
        birthPlace: personnelInformations.lieuNaissance || prev.birthPlace,
        birthPlaceAR: personnelInformations.lieuNaissanceArabe || prev.birthPlaceAR,
        nationality: personnelInformations.nationalite || prev.nationality,
        nationalityAR: personnelInformations.nationaliteArabe || prev.nationalityAR,

        email: personnelInformations.emailPersonnel || prev.email,
        governorate: personnelInformations.gouvernoratPersonnel || prev.governorate,
        governorateAR: personnelInformations.gouvernoratPersonnelArabe || prev.governorateAR,
        city: personnelInformations.villeAdressePersonnelle || prev.city,
        cityAR: personnelInformations.villeAdressePersonnelleArabe || prev.cityAR,
        address: personnelInformations.adressePersonnelle || prev.address,
        addressAR: personnelInformations.aressePersonnelleArabe || prev.addressAR,
        phoneFix: personnelInformations.telFixePersonnel || prev.phoneFix,
        phoneMobile: personnelInformations.telMobilePersonnel || prev.phoneMobile,
        numeroInscription: personnelInformations.numeroInscription || prev.numeroInscription,
      }));
    }
  }, [personnelInformations]);


  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = async () => {
    if (editing) {
      let isoDate: string;
      if (form.birthDate) {
        const dateObj = new Date(form.birthDate);
        isoDate = dateObj.toISOString();
      } else {
        isoDate = new Date().toISOString();
      }

      const mappedData = {
        DateNaissance: isoDate,
        LieuNaissance: form.birthPlace,
        LieuNaissanceArabe: form.birthPlaceAR,
        Nationalite: form.nationality,
        NationaliteArabe: form.nationalityAR,
        EmailPersonnel: form.email,
        GouvernoratPersonnel: form.governorate,
        GouvernoratPersonnelArabe: form.governorateAR,
        VilleAdressePersonnelle: form.city,
        VilleAdressePersonnelleArabe: form.cityAR,
        AdressePersonnelle: form.address,
        AdressePersonnelleArabe: form.addressAR,
        TelFixePersonnel: form.phoneFix,
        TelMobilePersonnel: form.phoneMobile,
        NumeroInscription: form.numeroInscription,
      };


      try {
        await API.user.update(mappedData);
        showToast("Informations mises à jour avec succès !", "success");
      } catch (err) {
        console.error("Erreur lors de la mise à jour :", err);
        showToast("Échec de la mise à jour des informations", "error");
      }
    }

    setEditing((prev) => !prev); // toggle edit mode
  };

  // Section fields
  const section1 = [
    { label: "Date de naissance", key: "birthDate", fullWidth: true },
    { label: "Lieu de naissance", key: "birthPlace" },
    { label: "مكان الولادة", key: "birthPlaceAR" },
    { label: "Nationalité", key: "nationality" },
    { label: "الجنسية", key: "nationalityAR" },
  ];

  const section2 = [
    { label: "Email Personnel", key: "email", fullWidth: true },
    { label: "Gouvernorat", key: "governorate" },
    { label: "الولاية", key: "governorateAR" },
    { label: "Ville", key: "city" },
    { label: "المدينة", key: "cityAR" },
    { label: "Adresse", key: "address" },
    { label: "العنوان", key: "addressAR" },
    { label: "Telephone Fix", key: "phoneFix" },
    { label: "Telephone Mobile", key: "phoneMobile" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full mx-auto">
      {/* Section 1 */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold" style={{ color: theme.colors.background }}>
          Information personnelle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section1.map((f) => (
            <FormInput
              key={f.key}
              label={f.label}
              value={form[f.key as keyof typeof form]}
              disabled={!editing}
              onChange={(val) => handleChange(f.key, val)}
              fullWidth={f.fullWidth}
              color={theme.colors.text}
            />
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold" style={{ color: theme.colors.background }}>
          Coordonnées personnelles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section2.map((f) => (
            <FormInput
              key={f.key}
              label={f.label}
              value={form[f.key as keyof typeof form]}
              disabled={!editing}
              onChange={(val) => handleChange(f.key, val)}
              fullWidth={f.fullWidth}
              color={theme.colors.text}
            />
          ))}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-4">
        <button
          onClick={handleEditClick}
          className="px-24 py-2 rounded-3xl font-medium align-center"
          style={{ background: theme.colors.background, color: theme.colors.secondaryText }}
        >
          {editing ? "Enregistrer" : "Modifier"}
        </button>
      </div>
    </div>
  );
}





type FormInputProps = {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  color?: any;
};

export function FormInput({ label, value, disabled, onChange, fullWidth, color }: FormInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
      <label style={{ color: color }} className="font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 rounded-3xl border outline-none ${disabled ? " bg-gray-100" : "border-gray-400"
          }`}
      />
    </div>
  );
}
