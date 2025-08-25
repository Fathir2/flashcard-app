import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setIsOpen, isMobile }) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/manage",
      label: "My Decks",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      path: "/create",
      label: "Create Deck",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      path: "/study",
      label: "Study",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      path: "/statistics",
      label: "Statistics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      path: "/settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="relative bg-transparent">
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative py-4 px-6 inline-flex items-center space-x-2 transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-white font-semibold"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              {/* Icon */}
              <span
                className={`transition-transform duration-300 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-blue-200 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span className="transition-colors duration-300">
                {item.label}
              </span>

              {/* Active indicator */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-white opacity-100"
                    : "bg-blue-200 opacity-0 group-hover:opacity-50"
                }`}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-white/20 text-white font-semibold"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span
                className={`transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-blue-200"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {location.pathname === item.path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
