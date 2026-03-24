import { useState, useMemo, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useTheme } from "../../ctx/ThemeContext";
import pdfPlaceholder from "../../assets/images/pdf-icon.png";
import { API } from "../../services/api";

type PdfItem = {
  id: number;
  titre: string;
  categorie: string;
};

function PdfCard({ pdf }: { pdf: PdfItem }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const res = await API.documents.download(pdf.id);
      const byteArray = new Uint8Array(res?.data?.data);

      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${pdf.titre}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl shadow-sm sm:shadow-md transition transform hover:scale-[1.02]"
      style={{
        background: theme.colors.secondaryBackground,
        color: theme.colors.text,
      }}
    >
      <div className="flex-shrink-0">
        <img
          src={pdfPlaceholder}
          alt={pdf.titre}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-gray-500">
          {pdf.titre}
        </h3>
      </div>

      <button
        disabled={loading}
        onClick={handleDownload}
        className="text-xl sm:text-2xl transition-colors hover:text-blue-500 disabled:opacity-50"
        style={{ color: theme.colors.background }}
      >
        {loading ? "..." : <FiDownload />}
      </button>
    </div>
  );
}

function FiltreCategorie({
  categories,
  selected,
  onChange,
}: {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <div className="mb-4 sm:mb-6 flex justify-end">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 sm:p-3 rounded-xl border shadow-sm sm:shadow-md w-full max-w-xs text-center cursor-pointer"
        style={{
          borderColor: theme.colors.primary,
          background: theme.colors.secondaryBackground,
          color: theme.colors.background,
        }}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Annonces() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [documents, setDocuments] = useState<PdfItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await API.documents.list();

        setCategories(data.categoryList);

        const mappedDocs = data.documentList.map((doc: any) => ({
          id: doc.ID,
          titre: doc.Name,
          categorie: doc.Category,
        }));

        setDocuments(mappedDocs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const filteredPdfs = useMemo(
    () =>
      selectedCategory
        ? documents.filter((p) => p.categorie === selectedCategory)
        : documents,
    [selectedCategory, documents]
  );

  return (
    <div className="mx-auto">
      <FiltreCategorie
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      {loading ? (
        <div className="text-center py-10">Chargement des documents...</div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredPdfs.map((pdf) => (
            <PdfCard key={pdf.id} pdf={pdf} />
          ))}
        </div>
      )}
    </div>
  );
}
