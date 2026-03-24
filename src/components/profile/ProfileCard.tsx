import { useTheme } from "../../ctx/ThemeContext";
import { bufferToBase64 } from "../../helpers/help";
import { placeholderImage } from "../../helpers/config";
import { API } from "../../services/api";
import { useState } from "react";
import { useToast } from "../../ctx/ToastContext";

export default function ProfileCard({ userProfile, fetchUserDetails }: any) {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const isLoading = !userProfile;

  const userInfo = {
    photo: userProfile?.photo || null,
    codeAppellation: userProfile?.codeAppellation || "M./Mme",
    nom: userProfile?.nom || "Nom inconnu",
    prenom: userProfile?.prenom || "Prénom inconnu",
    lieuNaissance: userProfile?.lieuNaissance || "Lieu de naissance inconnu",
    dateNaissance: userProfile?.dateNaissance
      ? userProfile.dateNaissance.split("T")[0]
      : "Date inconnue",
    numeroInscription: userProfile?.numeroInscription || "Numéro inconnu",
    cin: userProfile?.cin || "Numéro inconnu",
  };

  const photoBase64 =
    userProfile?.photo?.data?.data
      ? `data:image/jpeg;base64,${bufferToBase64(
          userProfile?.photo?.data?.data
        )}`
      : null;

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile) {
      showToast("Veuillez sélectionner une photo", "error");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("NumeroInscription", userInfo.numeroInscription);
      formData.append("Photo", selectedFile);

      await API.user.uploadPhoto(formData);

      showToast("Photo téléchargée avec succès !", "success");

      setSelectedFile(null);
      fetchUserDetails();
    } catch (err) {
      console.error(err);
      showToast("Échec du téléchargement de la photo", "error");
    } finally {
      setUploading(false);
    }
  };

  const updatePassword = async () => {
    if (!password.password || !password.confirmPassword) {
      showToast("Veuillez remplir tous les champs", "error");
      return;
    }

    if (password.password !== password.confirmPassword) {
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }

    try {
      const data = {
        MotDePasse: password.password,
        reMotDePasse: password.confirmPassword,
        NumeroInscription: userInfo.numeroInscription,
        CIN: userInfo?.cin,
      };

      await API.user.updatePassword(data);

      showToast("Mot de passe mis à jour avec succès !", "success");

      setPassword({ password: "", confirmPassword: "" });
      setShowPasswordSection(false);
    } catch (err) {
      console.error(err);
      showToast("Échec de la mise à jour du mot de passe", "error");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 md:gap-12">

        {/* PHOTO */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
          <div
            className="w-36 h-36 md:w-40 md:h-40 rounded-xl overflow-hidden border"
            style={{ borderColor: theme.colors.background + "20" }}
          >
            {isLoading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            ) : (
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : photoBase64 || placeholderImage
                }
                alt="profile"
                className="w-full h-full object-contain bg-[#383f7345]"
              />
            )}
          </div>

          {!isLoading && (
            <>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <div className="flex flex-col gap-2">
                <button
                  className="text-sm font-medium px-4 py-2 max-w-48 rounded-3xl transition"
                  style={{
                    background: theme.colors.text,
                    color: theme.colors.secondaryText,
                  }}
                  onClick={() =>
                    document.getElementById("fileInput")?.click()
                  }
                >
                  {selectedFile
                    ? "Changer la photo"
                    : "Sélectionner une photo"}
                </button>

                {selectedFile && (
                  <button
                    className="text-sm font-medium px-4 py-2 max-w-48 rounded-3xl transition"
                    style={{
                      background: theme.colors.background,
                      color: theme.colors.secondaryText,
                    }}
                    onClick={uploadPhoto}
                    disabled={uploading}
                  >
                    {uploading
                      ? "Téléchargement..."
                      : "Télécharger la photo"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6 w-full md:max-w-md items-center md:items-start">

          {/* Identity */}
          <div className="space-y-1 text-center md:text-left">
            {isLoading ? (
              <>
                <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-64 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-300 rounded animate-pulse" />
              </>
            ) : (
              <>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {userInfo.codeAppellation} {userInfo.prenom} {userInfo.nom}
                </h2>

                <p
                  style={{
                    color: theme.colors.background + 120,
                    fontWeight: "bold",
                  }}
                >
                  {userInfo.lieuNaissance} - {userInfo.dateNaissance}
                </p>

                <p
                  style={{
                    color: theme.colors.background + 120,
                    fontWeight: "bold",
                  }}
                >
                  Numero d'inscription Cnopt : {userInfo.numeroInscription}
                </p>
              </>
            )}
          </div>

          {/* Divider */}
          <div
            className="h-[1px] w-full"
            style={{
              background: theme.colors.primary,
              opacity: 0.2,
            }}
          />

          {/* PASSWORD DROPDOWN */}
          <div className="w-full">

            <button
              onClick={() =>
                setShowPasswordSection(!showPasswordSection)
              }
              className="flex justify-between items-center w-full rounded-3xl"
              style={{
                color: theme.colors.text,
              }}
            >
              <span className="font-semibold">
                Changer Mot de passe
              </span>

              <span
                className={`transition-transform duration-300 ${
                  showPasswordSection ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showPasswordSection
                  ? "max-h-96 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-4">

                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password.password}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      password: e.target.value,
                    })
                  }
                  className="px-4 py-2 rounded-3xl border outline-none w-full"
                />

                <input
                  type="password"
                  placeholder="Confirmer Mot de passe"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="px-4 py-2 rounded-3xl border outline-none w-full"
                />

                <button
                  className="px-4 py-2 rounded-3xl font-medium"
                  style={{
                    background: theme.colors.background,
                    color: theme.colors.secondaryText,
                  }}
                  onClick={updatePassword}
                >
                  Enregistrer
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}