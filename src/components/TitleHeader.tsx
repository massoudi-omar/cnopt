import { useTheme } from "../ctx/ThemeContext";

type Props = {
  title?: string;
};

export default function TitleHeader({ title }: Props) {
  const { theme } = useTheme();

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      {/* Title */}
      <h1
        className="text-xl sm:text-2xl font-semibold text-center sm:text-left break-words"
        style={{ color: theme.colors.text }}
      >
        {title}
      </h1>

      {/* Line */}
      <div
        className="w-full sm:flex-1 h-[0.2px] rounded-full"
        style={{ backgroundColor: theme.colors.text }}
      />
    </div>
  );
}
