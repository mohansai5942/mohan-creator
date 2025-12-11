import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [animClass, setAnimClass] = useState("opacity-0"); // Start hidden
  const location = useLocation();

  useEffect(() => {
    // Theme initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Trigger animation slightly after mount to ensure visibility
    const timer = setTimeout(() => {
      setAnimClass("logo-entrance");
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className={animClass}>
                <Link to="/" className="flex items-center gap-3 group">
                  <img 
                    src="https://files.catbox.moe/hpdxlg.png" 
                    alt="Creator Prompts Logo" 
                    className="h-9 w-9 md:h-10 md:w-10 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Creator Prompts
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Web Development Link with Promotional Effect */}
              <div className="relative group hidden sm:block">
                <Link 
                  to="/web-development"
                  className="relative text-sm font-bold text-gray-800 dark:text-white px-3 py-1.5 rounded-lg hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="relative z-10">Web Development</span>
                  {/* Subtle Pulse Background */}
                  <span className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg animate-pulse z-0"></span>
                </Link>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold text-center rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
                   <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></div>
                   <span className="text-yellow-400 dark:text-primary font-bold">Only ₹9,000/-</span> for Business or Personal Websites – <span className="underline">LIMITED OFFER!</span>
                </div>
              </div>

              {/* Social Icons (Navbar) */}
              <div className="hidden md:flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4 mr-1">
                <a 
                  href="https://www.instagram.com/mohan_creator/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-all duration-200 hover:scale-110 hover:shadow-[0_0_10px_rgba(225,48,108,0.5)] rounded-full"
                >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                   <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Follow on Instagram</span>
                </a>
                <a 
                  href="https://t.me/mohancreator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#0088cc] dark:hover:text-[#0088cc] transition-all duration-200 hover:scale-110 hover:shadow-[0_0_10px_rgba(0,136,204,0.5)] rounded-full"
                >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                   <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Join on Telegram</span>
                </a>
              </div>

              <Link 
                to={isAdmin ? "/" : "/admin"}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {isAdmin ? "Go to Gallery" : "Admin Panel"}
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 24.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;