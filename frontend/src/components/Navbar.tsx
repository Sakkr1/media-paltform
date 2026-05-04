import { useNavigate } from "react-router-dom";
 
export default function Navbar() {
  const navigate = useNavigate();
 
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
      </div>
    </nav>
  );
}