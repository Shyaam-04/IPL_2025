import React, { useState } from 'react'
import {Menu, Trophy, Search, Home, User} from "lucide-react";
import {Link, useNavigate} from "react-router";

const Navbar = ({ onSearchChange, searchTerm: propSearchTerm, placeholder = "Search..." }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const searchTerm = propSearchTerm !== undefined ? propSearchTerm : localSearchTerm;
  
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

  return (
    <div className="navbar bg-inherit sticky top-0 z-50 backdrop-blur-md border-b border-blue-400/30 border-bold h-20">
      <div className="flex-1">
        <Link to="/" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 cursor-pointer hover:scale-105 transition-transform">
          IPL DATABASE
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative group">
              <input 
                type="text" 
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="input w-24 md:w-64 pr-10 pl-10 bg-base-400 border-2 border-blue-400/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder-gray-400 text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300 group-hover:text-cyan-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-lg opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
            </div>
          </form>
        </div>
        <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    <Menu className="w-6 h-6" />
  </div>

  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-slate-950 rounded-xl shadow-lg z-[1] mt-3 w-56 p-0 overflow-hidden text-white"
  >
    <li className="border-b border-white/20">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800 transition-all duration-200"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
    </li>

    <li className="border-b border-white/20">
      <Link
        to="/players"
        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800 transition-all duration-200"
      >
        <User className="w-4 h-4" />
        <span>Players</span>
      </Link>
    </li>

    <li className="border-b border-white/20">
      <Link
        to="/batting_stats"
        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800 transition-all duration-200"
      >
        <Trophy className="w-4 h-4" />
        <span>Orange Cap Leaderboard</span>
      </Link>
    </li>

    <li>
      <Link
        to="/bowling_stats"
        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800 transition-all duration-200"
      >
        <Trophy className="w-4 h-4" />
        <span>Purple Cap Leaderboard</span>
      </Link>
    </li>
  </ul>
</div>

      </div>
    </div>
  )
}

export default Navbar;