import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <header className="flex items-center justify-between px-6 h-14 bg-gray-950 border-b border-gray-800">

      {/* Left: Tagline */}
      <p className="text-sm text-gray-400 font-medium tracking-tight">
        Generative AI Code Review & Optimization Engine
      </p>

      {/* Right: User Info + Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
            JD
          </div>
          <span className="text-sm font-medium text-gray-200 hidden sm:inline">
            Demo User
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-100 hover:border-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
