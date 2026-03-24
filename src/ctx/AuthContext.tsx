import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Full Pharmacien type
export type Pharmacien = {
  NumeroInscription?: number;
  CIN?: string;
  CodeCNAM?: string;
  CodePCT?: string;
  CodeAppellation?: string;
  Nom?: string;
  NomArabe?: string;
  Prenom?: string;
  PrenomArabe?: string;
  NomJeuneFille?: string;
  NomJeuneFilleArabe?: string;
  AdressePersonnelle?: string;
  AdressePersonnelleArabe?: string;
  VilleAdressePersonnelle?: string;
  VilleAdressePersonnelleArabe?: string;
  GouvernoratPersonnel?: string;
  GouvernoratPersonnelArabe?: string;
  CodePostalPersonnel?: string;
  DateNaissance?: string;
  LieuNaissance?: string;
  LieuNaissanceArabe?: string;
  Nationalite?: string;
  NationaliteArabe?: string;
  TelFixePersonnel?: string;
  TelMobilePersonnel?: string;
  NumeroFaxPersonnel?: string;
  EmailPersonnel?: string;
  Faculte?: string;
  FaculteArabe?: string;
  DateDiplome?: string;
  NumeroDiplome?: string;
  OptionDiplome?: string;
  OptionDiplomeArabe?: string;
  DateEquivalence?: string;
  NumeroVisaMSP?: string;
  AutreTitre?: string;
  AutreTitreArabe?: string;
  Note?: string;
  DateOperation?: string;
  DateInscription?: string;
  CodeUtilisateur?: string;
  Decede: boolean;
  Desactive: boolean;
  MotDePasse?: string;
  CodeActivite?: string;
  PharmacieId?: number | null;
  PhotoId?: number;
};



type AuthContextType = {
  user: Pharmacien | null;
  login: (user: Pharmacien | any) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pharmacien | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
