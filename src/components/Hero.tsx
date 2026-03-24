import { useTheme } from "../ctx/ThemeContext";
import type { ReactNode } from "react";

type HeroProps = {
  title?: string;
  text?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  children?: ReactNode;
};

export default function Hero({
  title,
  text,
  backgroundImage,
  backgroundColor,
  children,
}: HeroProps) {
  const { theme } = useTheme();

  return (
    <header
      className="w-full pt-20 pb-40 rounded-b-3xl relative flex flex-col items-center justify-center"
      style={{
        backgroundColor: backgroundColor || theme.colors.text,
        color: theme.colors.secondaryText,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability if there's a background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/25 rounded-b-3xl"></div>
      )}

      <div className="relative max-w-3xl text-center px-4 z-10">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
        )}
        {text && (
          <p className="text-base sm:text-lg md:text-xl text-center break-words">
            {text}
          </p>
        )}
      </div>

      {children && (
        <div className="absolute bottom-0 transform translate-y-1/2 w-full flex justify-center z-10 px-4">
          {children}
        </div>
      )}
    </header>
  );
}
