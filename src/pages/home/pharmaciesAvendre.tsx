import { BsDownload } from "react-icons/bs";
import { useTheme } from "../../ctx/ThemeContext";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import { nodataImage } from "../../helpers/config";

type Pharmacy = {
  Id: number;
  NomPharmacie: string;
  Adresse?: string;
  Gouvernorat?: string;
  sellingPrice?: string | number;
  sellerContact?: string;
  Attachement?: any;
};

export default function PharmaciesTable() {
  const { theme } = useTheme();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  // Fetch pharmacies from API
  const fetchPharmacies = async () => {
    try {
      const data: Pharmacy[] = await API.pharmacie.list();
      setPharmacies(data);
    } catch (err) {
      console.error("Erreur lors du chargement des pharmacies:", err);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

const handleDownload = async (pharma: Pharmacy) => {
  try {
    if (!pharma.Attachement || !pharma.Attachement.data?.data) return;

    const buffer = pharma.Attachement.data.data;
    const byteArray = new Uint8Array(buffer);

    // Type-safe MIME mapping
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    // Use extension from Attachement
    const ext = pharma.Attachement.extension?.toLowerCase() || "";
    const mimeType = mimeTypes[ext] || "application/octet-stream";

    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  } catch (err) {
    console.error("Erreur lors du téléchargement:", err);
  }
};
  if (!pharmacies.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 opacity-80">
        <img
          src={nodataImage}
          alt="No notifications"
          className="w-40 h-40 object-contain mb-4"
        />

      </div>
    )

  }

  return (
    <div className="mx-auto w-full">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden shadow-md table-auto">
          <thead style={{ background: theme.colors.primary, color: theme.colors.secondaryBackground }}>
            <tr>
              <th className="py-3 px-4 text-left">Nom de la pharmacie</th>
              <th className="py-3 px-4 text-left">Adresse</th>
              <th className="py-3 px-4 text-left">Gouvernorat</th>
              <th className="py-3 px-4 text-left">Prix</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Fichier</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.length > 0 ? (
              pharmacies.map((pharma) => (
                <tr key={pharma.Id} className="hover:bg-gray-100 transition" style={{ color: theme.colors.background }}>
                  <td className="py-3 px-4">{pharma.NomPharmacie}</td>
                  <td className="py-3 px-4">{pharma.Adresse || "--"}</td>
                  <td className="py-3 px-4">{pharma.Gouvernorat || "--"}</td>
                  <td className="py-3 px-4">{pharma.sellingPrice ? `${pharma.sellingPrice} TND` : "--"}</td>
                  <td className="py-3 px-4">{pharma.sellerContact || "--"}</td>
                  <td className="py-3 px-4">
                    {pharma.Attachement ? (
                      <button
                        style={{ color: theme.colors.primary }}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        onClick={() => handleDownload(pharma)}
                      >
                        <BsDownload size={20} />
                      </button>
                    ) : (
                      <span style={{ color: theme.colors.secondaryText }}>--</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center" style={{ color: theme.colors.primary }}>
                  Aucune pharmacie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {pharmacies.map((pharma) => (
          <div
            key={pharma.Id}
            className="flex flex-col gap-1 p-4 rounded-lg shadow-md border"
            style={{ background: theme.colors.secondaryBackground, color: theme.colors.background }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base">{pharma.NomPharmacie}</h3>
              {pharma?.Attachement?.ID ? (
                <button
                  style={{ color: theme.colors.primary }}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  onClick={() => handleDownload(pharma)}
                >
                  <BsDownload size={20} />
                </button>
              ) : (
                <span style={{ color: theme.colors.secondaryText }}>--</span>
              )}
            </div>
            <p><span className="font-medium">Adresse:</span> {pharma.Adresse || "--"}</p>
            <p><span className="font-medium">Gouvernorat:</span> {pharma.Gouvernorat || "--"}</p>
            <p><span className="font-medium">Prix:</span> {pharma.sellingPrice ? `${pharma.sellingPrice} TND` : "--"}</p>
            <p><span className="font-medium">Contact:</span> {pharma.sellerContact || "--"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}