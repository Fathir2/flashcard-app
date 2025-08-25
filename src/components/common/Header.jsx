import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../navigation/Navbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-purple-800 shadow-xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105 py-4"
            >
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold tracking-tight">
                  FlashCard App
                </h1>
                <p className="text-blue-100 text-xs font-medium">
                  Learn Smarter
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isMobile={false} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 z-50"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-700 via-blue-800 to-purple-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-6 pt-20 pb-6">
              <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
