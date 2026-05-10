import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  const onGoHome = () => {
    navigate("/")
  }
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white font-['DM_Sans',sans-serif] flex flex-col relative overflow-hidden">

      {/* Top bar */}
      <div className="px-8 py-6 flex items-center justify-between">
        
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

      {/* Background glow blobs */}
      <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#e8ff47]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-25 w-100 h-100 bg-[#e8ff47]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-[#e8ff47]/10 border border-[#e8ff47]/20 rounded-full mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff47] animate-pulse" />
        <span className="text-[#e8ff47] text-xs font-semibold tracking-widest uppercase font-['Syne',sans-serif]">
          About Pulse
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-['Syne',sans-serif] font-extrabold text-5xl md:text-6xl text-center leading-tight mb-6 max-w-2xl">
        Where your{" "}
        <span className="text-[#e8ff47]">signal</span>{" "}
        cuts through the noise.
      </h1>

      {/* Description */}
      <p className="text-white/50 text-base md:text-lg text-center max-w-xl leading-relaxed mb-16">
        Pulse is a social media platform built for people who actually have
        something to say. No algorithms burying your voice. No endless scroll
        designed to numb you. Just raw, real content — surfaced by relevance,
        driven by community.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-16">
        {[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            title: "Privacy First",
            desc: "Your data stays yours. We don't sell it, profile it, or weaponize it.",
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            ),
            title: "Real Connections",
            desc: "Follow people, not personas. Engage with content that actually matters.",
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            ),
            title: "Built for Speed",
            desc: "Snappy, responsive, and lightweight — because your time is valuable.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-5 bg-white/3 border border-white/8 rounded-2xl hover:border-white/15 hover:bg-white/5 transition-all duration-200"
          >
            <span className="w-9 h-9 rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/20 flex items-center justify-center">
              {card.icon}
            </span>
            <div>
              <p className="font-['Syne',sans-serif] font-bold text-sm text-white mb-1">
                {card.title}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider stat row */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 border-t border-white/8 pt-12 w-full max-w-3xl justify-center">
        {[
          { value: "10K+", label: "Early Users" },
          { value: "99.9%", label: "Uptime" },
          { value: "0", label: "Ads. Ever." },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-['Syne',sans-serif] font-extrabold text-3xl text-[#e8ff47]">
              {stat.value}
            </span>
            <span className="text-white/40 text-sm tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>

      </div>

    </div>
  );
};

export default AboutPage;