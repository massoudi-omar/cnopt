import { useTheme } from "../ctx/ThemeContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/images/footer-logo.png";
import FooterBg from "../assets/images/footer-background.png";

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer
            className="w-full py-12 px-6 mt-10 bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${FooterBg})`,
                color: theme.colors.secondaryText,
                backgroundColor:theme.colors.background
            }}
        >
        

            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* Column 1: Logo */}
                <div className="flex flex-col items-start">
                    <img src={Logo} alt="Logo" className="w-32 mb-4" />
                </div>

                {/* Column 2: Contact */}
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">Contactez-Nous</h3>
                    <p className="text-sm mb-1">Adresse</p>
                    <p className="text-sm mb-1">+(216) 71 79 57 22</p>
                    <p className="text-sm mb-1">info@cnopt.tn</p>
                    <p className="text-xs mt-2">© Copyright 2024 CNOPT. All rights reserved Lezarts.Digital</p>
                </div>

                {/* Column 3: Social */}
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">Suivez-Nous</h3>
                    <div className="flex gap-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
