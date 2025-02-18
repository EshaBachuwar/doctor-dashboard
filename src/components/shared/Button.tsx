"use client";
import { useTheme } from "@/context/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const { darkMode, toggleTheme } = useTheme();
  const baseStyles = "font-medium rounded-lg focus:outline-none focus:ring-2";

  const variants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-rose-600 text-rose-600 hover:bg-rose-50",
  };
  const darkVariants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-rose-600 text-rose-400 hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${
        darkMode ? darkVariants[variant] : variants[variant]
      } ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
