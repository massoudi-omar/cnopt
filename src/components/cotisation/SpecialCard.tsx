import { useTheme } from "../../ctx/ThemeContext";
import { useState } from "react";
import { API } from "../../services/api";
import { useToast } from "../../ctx/ToastContext";

type SpecialCardProps = {
  topButtonText: string;
  bottomButtonText: string;
  imageSrc: string;
  imageSrc2: string;
  total: number;
};

export default function SpecialCard({ topButtonText, bottomButtonText, imageSrc, imageSrc2, total }: SpecialCardProps) {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const amount = Number(total.toFixed(0));
      const res = await API.paiment.pay(amount);

      if (res && res.formUrl) {
        window.location.href = res.formUrl;
      } else {
        console.error("URL de paiement introuvable", res);
        showToast("Impossible d'initier le paiement. Veuillez réessayer.", "error");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      showToast("Une erreur est survenue lors du traitement du paiement.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex-1 mx-auto w-full max-w-full rounded-2xl shadow-lg"
      style={{
        background: `${theme.colors.text}20`,
        color: theme.colors.text,
      }}
    >
      {/* Top Button */}
      <button
        className="absolute left-1/2 transform -translate-x-1/2 z-10 px-3 sm:px-4 py-1.5 rounded-full font-semibold shadow-lg  text-xs sm:text-sm"
        style={{
          background: theme.colors.text,
          color: theme.colors.secondaryBackground,
          top: "-1.25rem",
        }}

      >
        {topButtonText}
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-6 gap-4 p-6 sm:p-8 text-center sm:text-left">
        {/* Checkbox */}
        <label className="relative flex items-center cursor-pointer mb-2 sm:mb-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span className="w-6 h-6 rounded-full border-4 border-gray-400 peer-checked:bg-black peer-checked:border-white transition" />
        </label>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <img src={imageSrc} alt="icon" className="w-16 h-16 object-contain" />
          <img src={imageSrc2} alt="icon" className="w-16 h-16 object-contain" />
        </div>
      </div>

      {/* Bottom Button */}
      <button
        className="absolute left-1/2 transform -translate-x-1/2 z-10 px-3 sm:px-4 py-1.5 rounded-full font-semibold shadow-lg text-xs sm:text-sm flex items-center justify-center gap-2"
        style={{
          background: theme.colors.background,
          color: theme.colors.secondaryBackground,
          bottom: "-1.25rem",
          opacity: (total == 0 || !checked || loading) ? 0.8 : 1
        }}
        onClick={handleClick}
        disabled={total == 0 || !checked || loading}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </>
        ) : (
          bottomButtonText
        )}
      </button>
    </div>
  );
}