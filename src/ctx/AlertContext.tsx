import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { useTheme } from "./ThemeContext";

type AlertContextType = {
  showAlert: (onConfirm: () => void) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showAlert = (confirmCallback: () => void) => {
    setOnConfirm(() => confirmCallback);
    setVisible(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  const handleCancel = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {visible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
    <div
      className="rounded-xl w-full max-w-md p-5 shadow-md flex flex-col items-center animate-scaleIn"
      style={{
        color: theme.colors.secondaryText,
        backgroundColor: theme.colors.secondaryBackground,
      }}
    >
      {/* Title */}
      <h2
        className="text-lg font-semibold mb-2 text-center"
        style={{ color: theme.colors.primary }}
      >
        Se déconnecter
      </h2>

      {/* Message */}
      <p
        className="text-center text-sm sm:text-md mb-4"
        style={{ color: theme.colors.background }}
      >
        Êtes-vous sûr de vouloir vous déconnecter ?
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row w-full mt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCancel}
          className="flex-1 py-3 text-center font-medium text-blue-600 dark:text-blue-400 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700"
        >
          Annuler
        </button>

        <button
          onClick={handleConfirm}
          className="flex-1 py-3 text-center font-medium text-red-600 dark:text-red-400"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
)}

    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
