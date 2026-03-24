import { useEffect, useState } from "react";
import { useTheme } from "../../ctx/ThemeContext";
import { useAuth } from "../../ctx/AuthContext";
import { API } from "../../services/api";
import { useToast } from "../../ctx/ToastContext";
import { getYear } from "../../helpers/help";

export default function AttestationsInfo() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [bonneReputation, setBonneReputation] = useState<any[]>();

  const getAttestationList = async () => {
    try {
      if (!user) return;
      const data = await API.user.attestationList(user.NumeroInscription);
      setBonneReputation(data.attestations.bonneReputation);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAttestationList();
  }, []);

  const handleDownload = async (
    type: string,
    year: string,
    lang: "FR" | "AR"
  ) => {
    if (!user) return;

    const key = `${type}_${year}_${lang}`;
    setLoadingKey(key);

    try {
      let apiType = type;

      if (type === "bonne_conduite") {
        apiType = lang === "AR" ? "réputation_ar" : "réputation";
      } else {
        apiType = lang === "AR" ? `${type}_ar` : type;
      }

      const file = await API.user.attestationFile(
        apiType,
        user.NumeroInscription,
        year
      );

      const blob = new Blob([file], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `attestation_${type}_${lang}_${year}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      showToast("Le paiement de la cotisation de cette année n'a pas été effectué.", "warning");
    } finally {
      setLoadingKey(null);
    }
  };

  const demande = async () => {
    try {
      if (!user) return;
      await API.user.demande(user.NumeroInscription);
      showToast("Demande envoyée avec succès", "success");
    } catch {
      showToast("Demande déjà envoyée", "info");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        <AttestationColumn
          title="Attestation d’exercice"
          type="exercice"
          years={["2025", "2026"]}
          handleDownload={handleDownload}
          loadingKey={loadingKey}
        />

        <AttestationColumn
          title="Attestation d’inscription"
          type="inscription"
          years={["2025", "2026"]}
          handleDownload={handleDownload}
          loadingKey={loadingKey}
        />
      </div>

      <hr className="border-gray-300 w-3/4 my-4" />

      <BonneConduite
        data={bonneReputation}
        type="bonne_conduite"
        handleDownload={handleDownload}
        demande={demande}
        loadingKey={loadingKey}
      />
    </div>
  );
}


type AttestationColumnProps = {
  title: string;
  type: "inscription" | "exercice";
  years: string[];
  handleDownload: (type: "inscription" | "exercice", year: string, lang: "FR" | "AR") => void;
  loadingKey: string | null;
};

export function AttestationColumn({ title, type, years, handleDownload, loadingKey }: AttestationColumnProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div
        className="w-full max-w-md text-center py-3 px-6 rounded-lg shadow-md border"
        style={{
          backgroundColor: theme.colors.text,
          borderColor: theme.colors.text,
          color: theme.colors.secondaryBackground,
        }}
      >
        {title}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <div className="flex flex-col gap-2 w-full">
          {years.map((year) => {
            const key = `${type}_${year}_FR`;
            const isLoading = loadingKey === key;

            return (
              <button
                key={key}
                disabled={isLoading}
                onClick={() => handleDownload(type, year, "FR")}
                className="w-full py-2 rounded-3xl shadow-sm flex justify-center"
                style={{
                  background: theme.colors.primary,
                  color: theme.colors.secondaryText,
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "..." : `Télécharger FR (${year})`}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 w-full">
          {years.map((year) => {
            const key = `${type}_${year}_AR`;
            const isLoading = loadingKey === key;

            return (
              <button
                key={key}
                disabled={isLoading}
                onClick={() => handleDownload(type, year, "AR")}
                className="w-full py-2 rounded-3xl shadow-sm flex justify-center"
                style={{
                  background: theme.colors.primary,
                  color: theme.colors.secondaryText,
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "..." : `Télécharger AR (${year})`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


type BonneConduiteProps = {
  data?: any[];
  type: string;
  handleDownload: (type: string, year: string, lang: "FR" | "AR") => void;
  demande: () => void;
  loadingKey: string | null;
};

export function BonneConduite({ data, type, handleDownload, demande, loadingKey }: BonneConduiteProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      <div
        className="w-full max-w-md text-center py-3 px-6 rounded-lg shadow-md border"
        style={{
          backgroundColor: theme.colors.secondaryBackground,
          borderColor: theme.colors.primary,
          color: theme.colors.text,
        }}
      >
        Attestation de bonne conduite
      </div>

      {data?.length === 0 ? (
        <button
          onClick={demande}
          className="mt-3 py-2 px-6 rounded-3xl shadow-sm"
          style={{
            background: theme.colors.primary,
            color: theme.colors.secondaryText,
          }}
        >
          Demande d'attestation
        </button>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-md mt-3">
          {data?.map((item: any) => {
            const year = getYear(item.DateDemande);

            if (item.Status === "Accepté") {
              const frKey = `${type}_${year}_FR`;
              const arKey = `${type}_${year}_AR`;

              return (
                <div key={item.ID} className="flex flex-col sm:flex-row gap-4">
                  <button
                    disabled={loadingKey === frKey}
                    onClick={() => handleDownload(type, year, "FR")}
                    className="w-full py-2 rounded-3xl shadow-sm flex justify-center"
                    style={{
                      background: theme.colors.primary,
                      color: theme.colors.secondaryText,
                      opacity: loadingKey === frKey ? 0.7 : 1,
                    }}
                  >
                    {loadingKey === frKey ? "..." : `Télécharger FR (${year})`}
                  </button>

                  <button
                    disabled={loadingKey === arKey}
                    onClick={() => handleDownload(type, year, "AR")}
                    className="w-full py-2 rounded-3xl shadow-sm flex justify-center"
                    style={{
                      background: theme.colors.primary,
                      color: theme.colors.secondaryText,
                      opacity: loadingKey === arKey ? 0.7 : 1,
                    }}
                  >
                    {loadingKey === arKey ? "..." : `Télécharger AR (${year})`}
                  </button>
                </div>
              );
            }

            if (item.Status === "Refusé") {
              return (
                <div
                  key={item.ID}
                  className="text-center text-sm mt-2 p-3 rounded-lg underline"
                  style={{ color: theme.colors.background }}
                >
                  Votre demande pour l'année {year} a été refusée.
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
