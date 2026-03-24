import { useTheme } from "../../ctx/ThemeContext";

type InfoCardProps = {
  title: string;
  description?: string;
  data?: any[];
  selected: any[];
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function InfoCard({ title, description, data = [], selected, setSelected }: InfoCardProps) {
  const { theme } = useTheme();

  const formatDateFR = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");

    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const toggleSelection = (item: any) => {
    setSelected(prev =>
      prev.find(i => i.DateAffectationCotisation === item.DateAffectationCotisation)
        ? prev.filter(i => i.DateAffectationCotisation !== item.DateAffectationCotisation)
        : [...prev, item]
    );
  };

  const total = selected.reduce(
    (sum, item) => sum + parseFloat(item.MontantCotisation),
    0
  );

  return (
    <div
      className="flex-1 max-w-full p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-4 transition hover:shadow-xl"
      style={{
        background: theme.colors.secondaryBackground,
        color: theme.colors.text,
      }}
    >
      {data.length !== 0 && (
        <span className="text-sm md:text-lg font-medium">{title}</span>
      )}

      {data.length === 0 ? (
        <p className="text-sm sm:text-base text-center break-words md:mt-4">
          {description}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto custom-scrollbar">
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto_auto] items-center border-b py-2 gap-4 cursor-pointer"
                onClick={() => toggleSelection(item)}
              >
                <span className="font-medium opacity-80" style={{ color: theme.colors.background }}>
                  {formatDateFR(item.DateAffectationCotisation)}
                </span>
                <span className="text-sm font-bold" style={{ color: theme.colors.background }}>
                  {item.MontantCotisation} DT
                </span>
                <input
                  type="checkbox"
                  checked={selected.some(i => i.DateAffectationCotisation === item.DateAffectationCotisation)}
                  onChange={() => toggleSelection(item)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 accent-primary"
                />
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex flex-col gap-2 mt-4 border-t pt-3">
            <span className="text-sm md:text-lg font-medium">
              Montant à payer aujourd’hui :
            </span>

            <input
              type="text"
              disabled
              value={`${total.toFixed(0)} DT`}
              className="w-full px-3 py-2 rounded-md text-center font-semibold opacity-80"
              style={{
                color: theme.colors.text,
                border: `1px solid ${theme.colors.primary}`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}