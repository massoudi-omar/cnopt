import React, { useEffect, useState } from "react";
import dummyFileImage from "../../assets/images/mastercard.png";
import { useTheme } from "../../ctx/ThemeContext";
import { API } from "../../services/api";
import { useToast } from "../../ctx/ToastContext";
import { useAuth } from "../../ctx/AuthContext";
import { nodataImage } from "../../helpers/config";

interface PharmacieData {
  Id: any;
  Category: string;
  NomPharmacie: string;
  DateCreation: string;
  Adresse: string;
  Ville: string;
  Gouvernorat: string;
  onSale: boolean;
  sellerContact: string;
  sellingPrice: string;
  attachementId?: number;
}

export default function MyPharmacie() {
  const [pharmacie, setPharmacie] = useState<PharmacieData | null>(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [sellerContact, setSellerContact] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const { theme } = useTheme();
  const { user } = useAuth();

  // Fetch user's pharmacy data
  useEffect(() => {
    const getUserPharmacie = async () => {
      try {
        if (!user) return
        const data = await API.pharmacie.get(user.NumeroInscription);
        console.log(data, "my pharmacie");

        setPharmacie(data);
        setIsOnSale(data.onSale);
        setSellerContact(data.sellerContact || "");
        setSellingPrice(data.sellingPrice || "");
      } catch (err) {
        console.error(err);
      }
    };
    getUserPharmacie();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!pharmacie) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Id", pharmacie.Id);
      formData.append("onSale", isOnSale.toString());
      formData.append("contact", sellerContact);
      formData.append("prix", sellingPrice);
      if (file) formData.append("attachement", file);

      await API.pharmacie.update(formData);
      showToast("Enregistrement réussi !", "success");

    } catch (err) {
      showToast("Erreur lors de l'enregistrement.", "error");

    } finally {
      setLoading(false);
    }
  };

  if (!pharmacie)
    return (
      <div className="flex flex-col items-center justify-center py-12 opacity-80">
        <img
          src={nodataImage}
          alt="No notifications"
          className="w-40 h-40 object-contain mb-4"
        />

      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto">
          {/* Card */}
          <div className="rounded-2xl shadow-md border border-gray-100 space-y-6">

            {/* Header */}
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {pharmacie.NomPharmacie}
              </h2>
              <p className="text-sm text-gray-500">{pharmacie.Category}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Adresse" value={pharmacie.Adresse} />
              <Info label="Ville" value={pharmacie.Ville} />
              <Info label="Gouvernorat" value={pharmacie.Gouvernorat} />
              <Info
                label="Créée le"
                value={new Date(pharmacie.DateCreation).toLocaleDateString("fr-FR")}
              />
            </div>

            {/* Sale Toggle */}
            <div className="border-t pt-4 flex items-center justify-between">
              <span className="font-medium text-gray-700">Mettre en vente</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOnSale}
                  onChange={() => setIsOnSale(!isOnSale)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>

            {/* Sale Section */}
            {isOnSale && (
              <div className="space-y-4 border-t pt-4 animate-fadeIn">

                <InputField
                  label="Contact vendeur"
                  placeholder="Ex: Mohamed Ridha"
                  value={sellerContact}
                  onChange={setSellerContact}
                />

                <InputField
                  label="Prix de vente"
                  placeholder="Ex: 3000"
                  type="number"
                  value={sellingPrice}
                  onChange={setSellingPrice}
                />

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="font-medium text-gray-700">Fichier joint</label>

                  <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition">
                    <input type="file" onChange={handleFileChange} className="hidden" />
                    <span className="text-gray-500 text-sm">
                      Cliquez pour ajouter un fichier
                    </span>
                  </label>

                  {(file || pharmacie.attachementId) && (
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                      <img
                        src={file ? URL.createObjectURL(file) : dummyFileImage}
                        className="w-12 h-12 object-contain"
                        alt="attachment"
                      />
                      <span className="text-sm text-gray-600">
                        {file ? file.name : `Fichier existant #${pharmacie.attachementId}`}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white transition shadow-md disabled:opacity-50"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Info component
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

// InputField component
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
);