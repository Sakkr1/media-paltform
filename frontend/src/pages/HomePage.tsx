import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/Auth/AuthContext";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
}

interface Post {
  id: number;
  user: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  following: boolean;
  comments: Comment[];
  showComments: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: "Layla Hassan",
    username: "@layla.h",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    time: "2h ago",
    content:
      "Golden hour hits different when you're chasing light across the desert dunes. 🌅 Some moments are worth every grain of sand.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
    likes: 284,
    liked: false,
    following: false,
    comments: [
      {
        id: 1,
        user: "Omar K.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
        text: "Stunning shot! 🔥",
      },
      {
        id: 2,
        user: "Sara M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
        text: "Where is this??",
      },
    ],
    showComments: false,
  },
  {
    id: 2,
    user: "Karim Nour",
    username: "@karim.nour",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
    time: "5h ago",
    content:
      "Just shipped v2.0 of my side project after 3 months of late nights. Building in public taught me more than any course ever did. Thread below 👇",
    likes: 531,
    liked: false,
    following: true,
    comments: [
      {
        id: 1,
        user: "Nadia R.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia",
        text: "Congrats!! 🎉 What stack?",
      },
    ],
    showComments: false,
  },
  {
    id: 3,
    user: "Amira Zaki",
    username: "@amira.zaki",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira",
    time: "1d ago",
    content:
      "Your design system is only as good as the constraints you set. Spent the day refining spacing tokens — tiny changes, massive impact.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
    likes: 412,
    liked: true,
    following: false,
    comments: [],
    showComments: false,
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
    {},
  );

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleLike = (id: number) => {
    if(!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const toggleFollow = (id: number) => {
    if(!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, following: !p.following } : p)),
    );
  };

  const toggleComments = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p,
      ),
    );
  };

  const submitComment = (id: number) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now(),
                  user: "You",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                  text,
                },
              ],
            }
          : p,
      ),
    );
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      user: "You",
      username: "@you",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      time: "Just now",
      content: newPostText,
      likes: 0,
      liked: false,
      following: false,
      comments: [],
      showComments: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
    setShowCreateModal(false);
  };

  const handleProfileNavigate = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white font-sans">
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      * { font-family: 'DM Sans', sans-serif; }
      .font-display { font-family: 'Syne', sans-serif; }
      `}</style>

      {/* Feed */}
      <main className="max-w-xl mx-auto px-4 py-8 space-y-4">
        {posts.map((post, i) => (
          <article
            key={post.id}
            className="bg-[#141416] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    onClick={handleProfileNavigate}
                    src={post.avatar}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#e8ff47] rounded-full border-2 border-[#141416]" />
                </div>
                <div>
                  <p
                    onClick={handleProfileNavigate}
                    className="font-display font-semibold text-sm text-white leading-tight"
                  >
                    {post.user}
                  </p>
                  <p
                    onClick={handleProfileNavigate}
                    className="text-xs text-white/30"
                  >
                    {post.username} · {post.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleFollow(post.id)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  post.following
                    ? "border-white/10 text-white/40 hover:border-red-400/40 hover:text-red-400"
                    : "border-[#e8ff47]/40 text-[#e8ff47] hover:bg-[#e8ff47] hover:text-black"
                }`}
              >
                {post.following ? "Following" : "+ Follow"}
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-3">
              <p className="text-sm text-white/80 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Image */}
            {post.image && (
              <div className="mx-5 mb-3 rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  className="w-full object-cover max-h-64"
                />
              </div>
            )}

            {/* Actions */}
            <div className="px-5 py-3 border-t border-white/5 flex items-center gap-5">
              {/* Like */}
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 group"
              >
                <svg
                  className={`w-5 h-5 transition-all duration-200 ${post.liked ? "fill-red-400 stroke-red-400 scale-110" : "fill-none stroke-white/40 group-hover:stroke-red-400"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
                <span
                  className={`text-xs font-medium transition ${post.liked ? "text-red-400" : "text-white/40"}`}
                >
                  {post.likes.toLocaleString()}
                </span>
              </button>

              {/* Comment btn */}
              <button
                onClick={() => toggleComments(post.id)}
                className="flex items-center gap-1.5 group"
              >
                <svg
                  className={`w-5 h-5 transition fill-none ${post.showComments ? "stroke-[#e8ff47]" : "stroke-white/40 group-hover:stroke-[#e8ff47]"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
                <span
                  className={`text-xs font-medium transition ${post.showComments ? "text-[#e8ff47]" : "text-white/40"}`}
                >
                  {post.comments.length}
                </span>
              </button>

              {/* Share */}
              <button className="ml-auto group">
                <svg
                  className="w-5 h-5 fill-none stroke-white/30 group-hover:stroke-white/70 transition"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                  />
                </svg>
              </button>
            </div>

            {/* Comments Section */}
            {post.showComments && (
              <div className="px-5 pb-4 space-y-3 border-t border-white/5 pt-3">
                {post.comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <img
                      src={c.avatar}
                      className="w-7 h-7 rounded-full bg-white/5 shrink-0"
                    />
                    <div className="bg-white/5 rounded-xl px-3 py-2 flex-1">
                      <span className="text-xs font-semibold text-white/70 mr-2">
                        {c.user}
                      </span>
                      <span className="text-xs text-white/50">{c.text}</span>
                    </div>
                  </div>
                ))}

                {/* Comment Input */}
                <div className="flex gap-2.5 pt-1">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                    className="w-7 h-7 rounded-full bg-white/5 shrink-0"
                  />
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] ?? ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && submitComment(post.id)
                      }
                      placeholder="Write a comment..."
                      className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-xs text-white/70 placeholder-white/20 outline-none focus:border-[#e8ff47]/30 transition"
                    />
                    <button
                      onClick={() => submitComment(post.id)}
                      className="px-3 py-2 bg-[#e8ff47]/10 hover:bg-[#e8ff47]/20 text-[#e8ff47] rounded-xl text-xs font-semibold transition"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* Floating Create Post Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-6 w-14 h-14 bg-[#e8ff47] rounded-2xl flex items-center justify-center shadow-lg shadow-[#e8ff47]/20 hover:scale-105 active:scale-95 transition-all duration-200 z-50"
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 sm:pb-0">
          <div className="w-full max-w-lg bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-white text-lg">
                New Post
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg
                  className="w-4 h-4 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                className="w-9 h-9 rounded-full bg-white/5 shrink-0"
              />
              <textarea
                autoFocus
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/20 outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
                  <svg
                    className="w-4 h-4 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                    />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
                  <svg
                    className="w-4 h-4 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPostText.trim()}
                className="px-5 py-2 bg-[#e8ff47] text-black text-sm font-semibold rounded-xl disabled:opacity-30 hover:bg-[#f0ff6a] transition"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
