import { useTheme } from "../../ctx/ThemeContext";
import { formatDateFR } from "../../helpers/help";

type TransactionItemProps = {
  date: string;
  transaction: string;
  amount: string;
};

export default function TransactionItem({ date, transaction, amount }: TransactionItemProps) {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg shadow-sm hover:shadow-md transition my-1"
      style={{ background: theme.colors.secondaryBackground, color: theme.colors.text }}
    >
      {/* Left */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm sm:text-base">
        <span className="font-medium opacity-80"  style={{ color: theme.colors.background }}>{formatDateFR(date)}</span>

        <span className=" break-words" style={{ color: theme.colors.text }}>
          Numéro de transaction: <span  style={{ color: theme.colors.background }}>

           # {transaction}
          </span>
        </span>
      </div>

      {/* Amount */}
      <div className="flex justify-end sm:justify-start">
        <span
          className="font-semibold px-4 sm:px-6 py-1 rounded-md text-sm sm:text-base"
          style={{
            background: theme.colors.primary,
            color: theme.colors.secondaryBackground
          }}
        >
          {amount} DT
        </span>
      </div>
    </div>
  );

}
