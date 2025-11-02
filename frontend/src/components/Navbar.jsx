import React, { useState, useEffect } from 'react'
import {Menu, Trophy, Search, Home, User, X} from "lucide-react";
import {Link, useNavigate} from "react-router";

const Navbar = ({ onSearchChange, searchTerm: propSearchTerm, placeholder = "Search..." }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  
  const searchTerm = propSearchTerm !== undefined ? propSearchTerm : localSearchTerm;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (value) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setLocalSearchTerm(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/players');
      if (onSearchChange) onSearchChange(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <div 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10' 
          : 'bg-slate-950/40 backdrop-blur-md'
      }`}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with IPL Icon and animated text */}
          <Link 
            to="/" 
            className="relative group flex items-center gap-3"
          >
            {/* Animated glow behind logo */}
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
            
            {/* IPL Logo with rotating border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-xl opacity-75 blur animate-spin-slow"></div>
              <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-300 group-hover:scale-110">
                <Trophy className="w-6 h-6 md:w-7 md:h-7 text-white animate-bounce-subtle" />
              </div>
            </div>
            
            {/* Text with continuous shimmer animation */}
            <div className="relative">
              <h1 className="relative text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 tracking-tight animate-gradient-x">
                IPL DATABASE 2025
              </h1>
              {/* Shimmer overlay */}
              {/*<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>*/}
              {/* Underline animation */}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative">
              <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <input 
                  type="text" 
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-64 h-11 pl-11 pr-4 bg-slate-900/50 border border-cyan-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-slate-900/70 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/20" 
                />
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${isSearchFocused ? 'text-cyan-400 scale-110' : 'text-gray-400'}`} />
                
                {/* Glow effect on focus */}
                {isSearchFocused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full opacity-20 blur-xl -z-10 animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2">
              <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" />
              <NavLink to="/players" icon={<User className="w-4 h-4" />} text="Players" />
              <NavLink to="/batting_stats" icon={<Trophy className="w-4 h-4" />} text="Orange Cap" />
              <NavLink to="/bowling_stats" icon={<Trophy className="w-4 h-4" />} text="Purple Cap" />
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/50 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-900/70 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            {isMenuOpen ? (
              <X className="w-5 h-5 text-cyan-400 relative z-10" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-400 relative z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 space-y-2 bg-slate-950/90 backdrop-blur-xl border-t border-cyan-500/20">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-11 pl-11 pr-4 bg-slate-900/50 border border-cyan-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-slate-900/70 transition-all duration-300" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <MobileNavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/players" icon={<User className="w-4 h-4" />} text="Players" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/batting_stats" icon={<Trophy className="w-4 h-4" />} text="Orange Cap Leaderboard" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/bowling_stats" icon={<Trophy className="w-4 h-4" />} text="Purple Cap Leaderboard" onClick={() => setIsMenuOpen(false)} />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Desktop Navigation Link Component
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="relative group px-4 py-2 rounded-full text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
  >
    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-400/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-400/20 group-hover:to-blue-500/20 rounded-full transition-all duration-300"></div>
    
    {/* Border */}
    <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/50 rounded-full transition-all duration-300"></div>
    
    {/* Content */}
    <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{icon}</span>
    <span className="relative z-10 text-sm font-medium">{text}</span>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 group-hover:w-3/4 transition-all duration-300"></div>
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300 overflow-hidden"
  >
    {/* Background slide effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/20 group-hover:to-cyan-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
    
    {/* Border */}
    <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/30 rounded-xl transition-all duration-300"></div>
    
    {/* Content */}
    <span className="relative z-10 text-cyan-400 transition-transform duration-300 group-hover:scale-110">{icon}</span>
    <span className="relative z-10 font-medium">{text}</span>
    
    {/* Accent dot */}
    <div className="absolute right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </Link>
);

export default Navbar;