import { useNavigate } from "react-router-dom";
import useAuth from "../context/Auth/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const onLogout = async() => {
    logout();
    setDropdownOpen(false);
  }

  const onLoginClick = () => {
    navigate("/login");
  };

  const onRegisterClick = () => {
    navigate("/register");
  };
  return (
    <nav className="sticky top-0 z-40 bg-[#0d0d0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <span className="font-display font-800 text-xl tracking-tight text-white">
        pulse<span className="text-[#e8ff47]">.</span>
      </span>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        {!isAuthenticated && (
          <>
            <button
              onClick={onRegisterClick}
              className="px-5 py-2 bg-transparent border border-white/15 text-white/70 text-sm font-semibold rounded-xl hover:border-white/30 hover:text-white active:scale-95 transition-all duration-200"
            >
              Register
            </button>
            <button
              onClick={onLoginClick}
              className="px-5 py-2 bg-[#e8ff47] text-black text-sm font-semibold rounded-xl hover:bg-[#f0ff6a] active:scale-95 transition-all duration-200"
            >
              Log In
            </button>
          </>
        )}
        {isAuthenticated && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-200"
            >
              <div className="w-7 h-7 rounded-lg bg-[#e8ff47]/10 border border-[#e8ff47]/20 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8ff47"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-white/40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111114] border border-white/10 rounded-2xl shadow-xl shadow-black/40 overflow-hidden z-50">
                {/* Profile */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-150">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </span>
                  My Profile
                </button>

                {/* About */}
                <button
                  onClick={() => {
                    navigate("/about");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-150">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line
                        x1="12"
                        y1="8"
                        x2="12"
                        y2="8.5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <line x1="12" y1="12" x2="12" y2="16" />
                    </svg>
                  </span>
                  About
                </button>

                {/* Divider */}
                <div className="mx-4 my-1 h-px bg-white/5" />

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center group-hover:border-red-500/20 transition-all duration-150">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </span>
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
