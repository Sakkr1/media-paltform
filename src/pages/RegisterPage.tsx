import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate request
    setLoading(false);
  };

  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    navigate("/login");
  };
  const onGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white flex flex-col">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.5s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.5s 0.25s ease both; }
        .fade-up-4 { animation: fadeUp 0.5s 0.35s ease both; }
        .fade-up-5 { animation: fadeUp 0.5s 0.45s ease both; }
      `}</style>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#e8ff47]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e8ff47]/3 rounded-full blur-3xl" />
      </div>

      {/* Minimal top bar */}
      <div className="px-8 py-6 fade-up flex items-center justify-between">
        <span className="font-display font-extrabold text-2xl tracking-tight text-white">
          pulse<span className="text-[#e8ff47]">.</span>
        </span>
        <button
          onClick={onGoHome}
          aria-label="Back to Home"
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-xl text-xs text-white/50 hover:text-white transition-all duration-200 group"
        >
          <svg
            className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </button>
      </div>

      {/* Form area */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Heading */}
          <div className="space-y-2 fade-up-1">
            <h1 className="font-display font-bold text-3xl text-white leading-tight">
              Welcome to Pulse!
            </h1>
            <p className="text-sm text-white/40">Register Your Account.</p>
          </div>

          {/* Card */}
          <div className="bg-[#141416] border border-white/5 rounded-2xl p-6 space-y-4 fade-up-2">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                First Name
              </label>
              <input
                type="text"
                placeholder="Jon"
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#e8ff47]/40 focus:bg-white/7 transition"
              />
            </div>
            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#e8ff47]/40 focus:bg-white/7 transition"
              />
            </div>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#e8ff47]/40 focus:bg-white/7 transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Password
                </label>
                <button className="text-xs text-[#e8ff47]/70 hover:text-[#e8ff47] transition">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/20 outline-none focus:border-[#e8ff47]/40 focus:bg-white/7 transition"
                />
                <button
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 4.166-5.241m2.62-1.377A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 0 1-2.293 3.95M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-[#e8ff47] text-black text-sm font-bold rounded-xl hover:bg-[#f0ff6a] active:scale-95 disabled:opacity-50 transition-all duration-200 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8v8z"
                    />
                  </svg>
                  Signing up...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>

          {/* Login link */}
          <p className="fade-up-5 text-center text-sm text-white/30">
            Already have an account?{" "}
            <button
              onClick={handleLoginNavigate}
              className="text-[#e8ff47] hover:text-[#f0ff6a] font-semibold transition cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
