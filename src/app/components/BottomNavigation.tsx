import { useNavigate, useLocation } from "react-router";
import { Home, BookOpen, MessageCircle, FileText, User } from "lucide-react";

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "홈", Icon: Home },
    { path: "/resources", label: "자료", Icon: BookOpen },
    { path: "/community", label: "커뮤니티", Icon: MessageCircle },
    { path: "/review", label: "리뷰", Icon: FileText },
    { path: "/my", label: "마이", Icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(0,0,0,0.1)] z-50">
      <nav className="flex items-center justify-around px-6 py-2 max-w-md mx-auto">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-2 min-w-[46px]"
            >
              <Icon
                className={`size-[26px] ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={`text-[12px] ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-400 font-normal"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
