import { useTheme } from "../ctx/ThemeContext";
import logo from "../assets/logo.png";
import { useAuth } from "../ctx/AuthContext";
import { useAlert } from "../ctx/AlertContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiLogOut, FiXCircle } from "react-icons/fi";
import { links } from "./Sidebar";
import { API } from "../services/api";
import { bufferToBase64 } from "../helpers/help";
import { placeholderImage } from "../helpers/config";
//API.user.photo()
export default function ProtectedHeader() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const { showAlert } = useAlert();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photo, setPhoto] = useState();

  const handleLogout = () => {
    showAlert(() => {
      logout();
      setSidebarOpen(false);
    });
  };

  let fetchUserPhoto = async () => {
    try {
      let numInscri;
      if (user) numInscri = user.NumeroInscription
      let photo = await API.user.photo(numInscri)
      setPhoto(photo.data.data);

    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    fetchUserPhoto()
  }, [])


  const photoBase64 =
    photo
      ? `data:image/jpeg;base64,${bufferToBase64(photo)}`
      : null;

  return (
    <>
      {/* HEADER */}
      <header
        className="w-full py-8 lg:py-4 xl:py-2 shadow-md"
        style={{
          backgroundColor: theme.colors.secondaryBackground,
          color: theme.colors.text,
        }}
      >

        <div className="max-w-6xl mx-auto px-4 relative flex items-center justify-center ">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute left-4">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden absolute right-4"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={26} />
          </button>

          {/* Desktop Logo */}
          <div className="hidden lg:flex">
            <img src={logo} alt="Logo" className="h-16 mx-auto" />
          </div>

          {/* Desktop User Info */}
          <div className="hidden lg:flex absolute right-0 items-center space-x-3 mr-4 font-semibold">
            <span>{user?.Nom} {user?.Prenom}</span>
            <img
              src={photoBase64 || placeholderImage}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />

          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 transition ${sidebarOpen ? "visible" : "invisible"
          }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity ${sidebarOpen ? "opacity-40" : "opacity-0"
            }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 shadow-lg transform transition-transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ backgroundColor: "#f1f1f1", color: theme.colors.background }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center py-[26px] border-b"
            style={{ backgroundColor: theme.colors.background }}
          ></div>

          <div className="flex justify-between items-center px-3 pt-5 pb-4 border-b">
            <span className="font-bold">Menu</span>
            <FiXCircle
              size={22}
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <div className="p-4 space-y-4">
            {/* User Info */}
            <div
              className="flex items-center space-x-3 mb-4"
              style={{ color: theme.colors.text }}
            >
              <img    src={photoBase64 || placeholderImage} className="h-10 w-10 rounded-full" />
              <span className="font-semibold">
                {user?.Nom} {user?.Prenom}
              </span>
            </div>

            {/* Links */}
            {links.map((link, index) => (
              <div key={index}>
                {link.subLinks ? (
                  <>
                    <div className="font-semibold flex items-center mb-2">
                      {link.icon} {link.name}
                    </div>
                    <div className="ml-6 space-y-4">
                      {link.subLinks.map((sub, i) => (
                        <NavLink
                          key={i}
                          to={sub.path}
                          className="flex items-center text-sm hover:opacity-70"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {sub.icon}
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className="flex items-center hover:opacity-70"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center mt-6 py-2 rounded-lg font-medium hover:opacity-80 transition"
              style={{
                color: "#EF4444",
              }}
            >
              <FiLogOut className="mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
