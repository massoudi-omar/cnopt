import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTheme } from "../ctx/ThemeContext";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header
      className="w-full"
      style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryText }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-2">
        {/* Left: contact info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm md:text-base">
          <span>{"+(216) 71 79 57 22"}</span>
          <span>{"info@cnopt.tn"}</span>
        </div>

        {/* Right: Suivez-Nous + social icons */}
        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
          <span className="hidden sm:inline">Suivez-Nous</span>
          <div className="flex gap-2">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin style={{ color: theme.colors.primary }} size={18} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram style={{ color: theme.colors.secondary }} size={18} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook style={{ color: theme.colors.primary }} size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
