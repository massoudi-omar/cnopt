import { useState } from "react";
import { useTheme } from "../ctx/ThemeContext";

type RegisterFormProps = {
    onRegister: (data: {
        birthDate: string;
        numInscri: string;
        numCIN: string;
        password: string;
        repeatPassword: string;
    }) => void;
    linkText: string;
    linkPath: string;
};

export default function RegisterForm({ onRegister, linkText, linkPath }: RegisterFormProps) {
    const { theme } = useTheme();

    const [step, setStep] = useState(1); // Step 1 or 2
    const [birthDate, setBirthDate] = useState("");
    const [numInscri, setNumInscri] = useState("");
    const [numCIN, setNumCIN] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = () => {
        onRegister({ birthDate, numInscri, numCIN, password, repeatPassword });
    };

    return (
        <div
            className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative z-10"
            style={{ backgroundColor: theme.colors.secondaryBackground }}
        >
            {/* Step 1: First 3 inputs */}
            {step === 1 && (
                <div className="flex flex-col gap-4">
                    <input
                        value={birthDate}
                        placeholder="Date de naissance"
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: theme.colors.primary + "40", color: theme.colors.background }}
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                        placeholder="Numéro d'inscription"
                        value={numInscri}
                        onChange={(e) => setNumInscri(e.target.value)}
                        className="px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: theme.colors.primary + "40", color: theme.colors.background }}
                    />
                    <input
                        placeholder="Num CIN"
                        value={numCIN}
                        onChange={(e) => setNumCIN(e.target.value)}
                        className="px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: theme.colors.primary + "40", color: theme.colors.background }}
                    />
                    <button
                        onClick={handleNext}
                        className="mt-4 py-2 rounded-3xl font-semibold hover:opacity-90 transition-opacity w-full"
                        style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryText }}
                    >
                        Suivant
                    </button>
                </div>
            )}

            {/* Step 2: Last 2 inputs */}
            {step === 2 && (
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: theme.colors.primary + "40", color: theme.colors.background }}
                    />
                    <input
                        type="password"
                        placeholder="Répéter mot de passe"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="px-4 py-2 rounded-3xl border focus:outline-none focus:ring-2 transition-colors"
                        style={{ borderColor: theme.colors.primary + "40", color: theme.colors.background }}
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleBack}
                            className="py-2 px-6 rounded-3xl font-semibold hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: theme.colors.text, color: theme.colors.secondaryText }}
                        >
                            Retour
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-6 rounded-3xl font-semibold hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryText }}
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            )}

            {/* Text link under form */}
            {linkText && linkPath && (
                <a
                    href={linkPath}
                    className="text-sm mt-4 block text-center hover:underline"
                    style={{ color: theme.colors.primary }}
                >
                    {linkText}
                </a>
            )}
        </div>
    );
}
