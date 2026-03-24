import { useTheme } from "../../ctx/ThemeContext";

type AmountCardProps = {
  title: string;
  amount: string;
};

export default function AmountCard({ title, amount }: AmountCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className="flex-1 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-between hover:shadow-xl transition"
      style={{ background: theme.colors.secondaryBackground, color: theme.colors.text }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.primary }}>
        {title }
      </h3>

      <p
        className="text-2xl font-bold px-8 py-6 rounded-md"
        style={{ background: theme.colors.primary, color: theme.colors.secondaryBackground }}
      >
        {amount}
      </p>
    </div>
  );
}