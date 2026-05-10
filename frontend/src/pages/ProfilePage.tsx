import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/Auth/AuthContext";

interface Post {
  id: number;
  image?: string;
  content: string;
  likes: number;
  comments: number;
}

const userPosts: Post[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
    content:
      "Golden hour hits different when you're chasing light across the desert dunes. 🌅",
    likes: 284,
    comments: 12,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
    content: "Your design system is only as good as the constraints you set.",
    likes: 412,
    comments: 8,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    content:
      "Some places just fill your lungs with something you can't name. 🏔️",
    likes: 198,
    comments: 5,
  },
  {
    id: 4,
    content:
      "Just shipped v2.0 of my side project after 3 months of late nights. Building in public taught me more than any course ever did. 🚀",
    likes: 531,
    comments: 24,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    content: "Morning rituals matter more than morning routines.",
    likes: 310,
    comments: 9,
  },
  {
    id: 6,
    content:
      "The gap between 'good enough' and 'exceptional' is almost always taste, not skill.",
    likes: 874,
    comments: 41,
  },
];

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(4821);

  const { isAuthenticated } = useAuth();

  const handleFollow = () => {
    if(!isAuthenticated) {
      navigate("/login");
      return;
    }
    setFollowing((v) => !v);
    setFollowerCount((n) => (following ? n - 1 : n + 1));
  };

  const navigate = useNavigate();
  const onGoHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease both; }
        .fade-up-1 { animation: fadeUp 0.45s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.45s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.45s 0.25s ease both; }
        .fade-up-4 { animation: fadeUp 0.45s 0.35s ease both; }
        @keyframes gridIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .grid-in { animation: gridIn 0.4s ease both; }
      `}</style>

      {/* Cover */}
      <div className="relative h-44 bg-linear-to-br from-[#1a1a1c] via-[#111] to-[#0d0d0f] overflow-hidden fade-up">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,255,71,0.08)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#0d0d0f] to-transparent" />
        {/* Decorative dots */}
        <div
          className="absolute top-6 right-8 w-24 h-24 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e8ff47 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        {/* Back to Home */}
        <button
          onClick={onGoHome}
          aria-label="Back to Home"
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl text-xs text-white/60 hover:text-white transition-all duration-200 group"
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

      {/* Profile Header */}
      <div className="max-w-2xl mx-auto px-5">
        <div className="relative -mt-14 flex items-end justify-between mb-5 fade-up-1">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl border-4 border-[#0d0d0f] overflow-hidden bg-white/5">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Layla"
                className="w-full h-full"
                alt="Profile"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#e8ff47] rounded-full border-2 border-[#0d0d0f] flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pb-1">
            <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 flex items-center justify-center transition">
              <svg
                className="w-4 h-4 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </button>
            <button
              onClick={handleFollow}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-95 ${
                following
                  ? "border-white/10 text-white/40 hover:border-red-400/30 hover:text-red-400"
                  : "bg-[#e8ff47] text-black border-transparent hover:bg-[#f0ff6a]"
              }`}
            >
              {following ? "Following" : "+ Follow"}
            </button>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="space-y-2 mb-6 fade-up-2">
          <div>
            <h1 className="font-display font-bold text-2xl text-white leading-tight">
              Layla Hassan
            </h1>
            <p className="text-sm text-white/35">@layla.h</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8 fade-up-3">
          {[
            { label: "Posts", value: userPosts.length },
            { label: "Followers", value: followerCount.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141416] border border-white/5 rounded-2xl px-4 py-4 text-center hover:border-white/10 transition"
            >
              <p className="font-display font-bold text-xl text-white">
                {stat.value}
              </p>
              <p className="text-xs text-white/30 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
