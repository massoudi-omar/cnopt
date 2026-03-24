import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../ctx/ThemeContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useAuth } from "../ctx/AuthContext";
import { useAlert } from "../ctx/AlertContext";
import { FiUser, FiFileText, FiBell, FiClipboard, FiHome, FiDollarSign, FiBriefcase, FiLogOut, FiActivity } from "react-icons/fi";

export default function Sidebar() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const { showAlert } = useAlert();


  // Dynamic accordion state
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Profile: true, // open Profile by default
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Close Profile menu if navigating outside /profile
  useEffect(() => {
    if (!location.pathname.startsWith("/profile")) {
      setOpenMenus((prev) => ({
        ...prev,
        Profile: false,
      }));
    }
  }, [location.pathname]);




  const handleLogout = () => {
    showAlert(() => {
      logout();
    });
  };

  useEffect(() => {
    setOpenMenus((prev) => ({
      ...prev,
      Profile: location.pathname.startsWith("/profile"),
    }));
  }, [location.pathname]);

  const baseItemStyle =
    "group relative w-full flex items-center py-2 px-6 rounded-lg text-lg font-medium mb-2 transition-colors";

  const textStyle =
    "flex-1 overflow-hidden whitespace-nowrap text-ellipsis";

  return (
    <nav
      className="hidden lg:flex flex-col w-64 rounded-xl"

    >
      {links.map((link) => {
        if (link.subLinks) {
          return (
            <div key={link.name}>
              <button
                onClick={() => toggleMenu(link.name)}
                className={`${baseItemStyle} text-left`}
                data-tooltip-id="sidebar-tooltip"
                data-tooltip-content={link.name}
                style={{
                  backgroundColor: theme.colors.background + "20",
                  color: theme.colors.background + "80",
                }}
              >
                {link.name}
              </button>

              <AnimatePresence>
                {openMenus[link.name] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 flex flex-col overflow-hidden "
                  >
                    {link.subLinks.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={baseItemStyle}
                        data-tooltip-id="sidebar-tooltip"
                        data-tooltip-content={sub.name}
                        style={({ isActive }) =>
                          isActive
                            ? {
                              backgroundColor: theme.colors.background,
                              color: theme.colors.secondaryText,
                            }
                            : {
                              backgroundColor: theme.colors.background + "20",
                              color: theme.colors.background + "80",
                            }
                        }
                      >
                        {sub.icon}
                        <span className={textStyle}>{sub.name}</span>
                      </NavLink>

                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={baseItemStyle}
            data-tooltip-id="sidebar-tooltip"
            data-tooltip-content={link.name}
            style={({ isActive }) =>
              isActive
                ? {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.secondaryText,
                }
                : {
                  backgroundColor: theme.colors.background + "20",
                  color: theme.colors.background + "80",
                }
            }
          >
            {link.icon}
            <span className={textStyle}>{link.name}</span>

          </NavLink>
        );
      })}

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className={baseItemStyle}
        data-tooltip-id="sidebar-tooltip"
        data-tooltip-content="Déconnexion"
        style={{
          backgroundColor: theme.colors.background + "20",
          color: "#EF4444",
        }}
      >
        <FiLogOut className="mr-3" />
        Déconnexion
      </button>

      <Tooltip
        id="sidebar-tooltip"
        place="right"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.secondaryText,
          borderRadius: "8px",
          padding: "6px 10px",
          fontSize: "13px",
          zIndex: 9999,
        }}
      />
    </nav>
  );
}



export const links = [
  {
    name: "Profile",
    icon: <FiUser className="mr-3" />,
    subLinks: [
      { name: "Informations personnelles", path: "/profile/informations-personnelles", icon: <FiUser className="mr-3" /> },
      { name: "Activité", path: "/profile/activities", icon: <FiActivity className="mr-3" /> },
    ],
  },
  { name: "Attestations", path: "/attestations", icon: <FiFileText className="mr-3" /> },
  { name: "Annonce", path: "/announce", icon: <FiHome className="mr-3" /> },
  { name: "Notifications", path: "/notifications", icon: <FiBell className="mr-3" /> },
  { name: "Pharmacies à vendre", path: "/pharmacies-à-vendre", icon: <FiClipboard className="mr-3" /> },
  { name: "Cotisation", path: "/cotisation", icon: <FiDollarSign className="mr-3" /> },
  { name: "Ma Pharmacie", path: "/ma-pharmacie", icon: <FiBriefcase className="mr-3" /> },
];
