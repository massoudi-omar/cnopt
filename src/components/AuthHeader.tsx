import { useTheme } from "../ctx/ThemeContext";
import logo from "../assets/logo.png"; 

export default function AuthHeader() {
  const { theme } = useTheme();

  return (
    <header
      className="w-full py-6 shadow-md"
      style={{ backgroundColor: theme.colors.secondaryBackground, color: theme.colors.text }}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
        {/* Logo centered */}
        <img src={logo} alt="Logo" className="h-16 w-auto" />
      </div>
    </header>
  );
}
