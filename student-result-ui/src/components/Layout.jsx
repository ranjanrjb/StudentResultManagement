import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../feature/theme/themeSlice";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`flex min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-amber-50"}`}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
            ☰
          </button>

          <h1 className="font-bold text-lg">Student Result</h1>
        </div>

        <div className="p-4 lg:p-8 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
