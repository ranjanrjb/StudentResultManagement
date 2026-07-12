import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../feature/theme/themeSlice";

const links = [
  { path: "/students", label: "Students" },
  { path: "/marks", label: "Marks" },
  { path: "/results", label: "Results" },
];

function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0 z-50
          w-60 min-h-screen
          bg-amber-700 dark:bg-zinc-900
          text-white
          p-6
          transform transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-8">Student Result</h2>
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  rounded-lg
                  px-4 py-3
                  md:px-6 md:py-4
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-amber-400 text-amber-950 dark:bg-white dark:text-black font-semibold shadow-sm"
                      : "hover:bg-amber-500 dark:hover:bg-gray-700"
                  }
                `
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="mt-auto pt-6">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="
                w-full
                rounded-lg
                border border-white/20
                bg-white/10
                hover:bg-white/20
                py-3
                transition-all duration-300
                font-medium
              "
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
