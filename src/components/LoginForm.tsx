import { useState } from "react";
import { useTheme } from "../ctx/ThemeContext";

export default function LoginForm({ onLogin, loading, linkText, linkPath }: any) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative z-10"
      style={{ backgroundColor: theme.colors.secondaryBackground }}
    >
      <div className="flex flex-col gap-4 items-center">
        <input
          placeholder="Numéro d'inscription"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
          style={{
            borderColor: theme.colors.primary + 40,
            color: theme.colors.background,
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
          style={{
            borderColor: theme.colors.primary + 40,
            color: theme.colors.background,
          }}
        />
        <button
          onClick={() => onLogin(email, password)}
          className="py-2 rounded-3xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
          style={{
            width: "50%",
            backgroundColor: theme.colors.background,
            color: theme.colors.secondaryText,
          }}
          disabled={loading}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            "Se connecter"
          )}
        </button>
        {linkText && linkPath && (
          <a
            href={linkPath}
            className="text-sm mt-2 hover:underline"
            style={{ color: theme.colors.primary }}
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
