import Image from "next/image";
import { Button } from "../shared/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
export const Navbar: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("monthVisitCount");
        localStorage.removeItem("todayVisitCount");
        localStorage.removeItem("weekVisitCount");
        localStorage.removeItem("theme");

        dispatch({ type: "AUTH/LOGOUT" });

        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <nav className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="" width={64} height={32} />
            <span className="text-2xl font-bold text-rose-600">Care Net</span>
          </div>
          <div className="flex items-center">
            <Button
              onClick={handleLogout}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              Logout
            </Button>
            <Button
              onClick={toggleTheme}
              variant="outline"
              className="px-3 py-1 m-1 duration-300 "
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
