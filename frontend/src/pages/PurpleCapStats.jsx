import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"
import { Trophy, Award, Medal, TrendingUp, Target, Zap, Activity, Component, Crosshair } from 'lucide-react'
import mi from '../assets/mi.png'
import csk from "../assets/csk.png"
import pbks from "../assets/pbks.png"
import srh from "../assets/srh.png"
import kkr from "../assets/kkr.png"
import dc from "../assets/dc.png"
import rr from "../assets/rr.png"
import lsg from "../assets/lsg.png"
import rcb from "../assets/rcb.png"
import gt from "../assets/gt.png"

// Loading Indicator Component - Purple Theme
// ----------------------------------------------
const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300">
      <h1 className='text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 tracking-wider animate-gradient-x mb-8'>
        LOADING STATS
      </h1>
      <div className="flex gap-4">
        {/* Pulsing Orbs */}
        <div className="w-5 h-5 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse-loader" style={{ animationDelay: '0s' }}></div>
        <div className="w-5 h-5 bg-fuchsia-500 rounded-full shadow-lg shadow-fuchsia-500/50 animate-pulse-loader" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-5 h-5 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse-loader" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};
// ----------------------------------------------

const PurpleCapStats = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get team logo based on TeamID
  const getTeamLogo = (teamId) => {
    const logos = {
      1: mi,
      2: csk,
      3: pbks,
      4: srh,
      5: kkr,
      6: lsg,
      7: rcb,
      8: dc,
      9: gt,
      10: rr
    };
    return logos[teamId];
  };

  useEffect(() => {
    setIsLoading(true);
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bowling_stats");
        // Introduce artificial delay to showcase the loading screen
        await new Promise(resolve => setTimeout(resolve, 1200));
        setPlayers(response.data);
      } catch (error) {
        console.error("Failed to fetch bowling stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter players based on search term
  const filteredPlayers = players.filter(player => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();

    if (player.PlayerName && player.PlayerName.toLowerCase().includes(search)) {
      return true;
    }

    if (player.PlayerID && player.PlayerID.toString().includes(search)) {
      return true;
    }

    return false;
  });

  const getRankColor = (position) => {
    if (position === 1) return 'from-purple-400 via-fuchsia-400 to-purple-500'; // Purple/Magenta
    return 'from-blue-500 to-cyan-500';
  };

  const getRankGlow = (position) => {
    if (position === 1) return 'shadow-purple-400/50';
    return 'shadow-cyan-400/40';
  };

  const getRankIcon = (position) => {
    if (position === 1) return <Trophy className="w-6 h-6 text-fuchsia-500 animate-bounce-slow" />;
    return <span className="text-lg font-bold text-white">#{position}</span>;
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      
      {/* RENDER THE LOADING INDICATOR */}
      {isLoading && <LoadingIndicator />}
      
      {/* Animated background with floating orbs */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
       
      </div>

      <div className="sticky top-0 z-50">
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search Player"
        />
      </div>

      <div className='mx-auto max-w-7xl px-6 pt-8 pb-8'>
        {/* Enhanced Purple Cap Heading */}
        <div className='flex items-center justify-center mb-12 mt-8'>
          <div className="relative group">
            {/* Animated glow background with purple tint */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-25 blur-2xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow"></div>
            
            {/* Decorative elements */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2">
              <Trophy className="w-6 h-6 text-purple-400 animate-bounce-slow" />
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <Trophy className="w-6 h-6 text-fuchsia-400 animate-bounce-slow" />
            </div>
            
            {/* Main heading */}
            <div className="relative px-8 py-3 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30">
              <h1 className='text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 tracking-wider animate-gradient-x'>
                PURPLE CAP LEADERBOARD
              </h1>
            </div>
          </div>
        </div>

        {/* Show message if no players found */}
        {filteredPlayers.length === 0 && searchTerm && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No players found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/50"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredPlayers.map((player, index) => {
            const leaderboardIdx = players.findIndex(p => p.PlayerID === player.PlayerID) + 1;
            const isTop = (leaderboardIdx === 1);
            const teamLogo = getTeamLogo(player.TeamID);
            
            return (
              <div
                key={player.PlayerID}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-xl border 
                          ${isTop ? 'border-purple-500/40' : 'border-blue-500/30'}
                          hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl 
                          ${isTop ? 'hover:shadow-purple-400/40' : 'hover:shadow-cyan-400/40'}
                          hover:-translate-y-1 p-4 md:p-5
                          animate-slide-in-left overflow-hidden
                          ${leaderboardIdx === 1 ? 'ring-2 ring-purple-400/30' : ''}`}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isTop ? 'via-purple-400/10' : 'via-cyan-400/10'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${getRankColor(leaderboardIdx)} shadow-lg ${getRankGlow(leaderboardIdx)}`}>
                      {getRankIcon(leaderboardIdx)}
                    </div>
                  </div>

                  {/* Player Info with Team Logo */}
                  <div className="flex-grow min-w-0 flex items-center gap-3">
                    {/* Team Logo - Only show if available */}
                    {teamLogo && (
                      <div className="flex-shrink-0">
                        <img 
                          src={teamLogo} 
                          alt={`Team Logo`} 
                          className="w-12 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,191,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,191,255,0.6)] transition-all duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Player Name and ID */}
                    <div className="min-w-0">
                      <h3 className={`text-xl md:text-2xl font-bold mb-1 ${isTop ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'}`}>
                        {player.PlayerName}
                      </h3>
                      <p className="text-sm text-gray-400">Player ID: {player.PlayerID}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
                    {/* Wickets */}
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800/50 border border-blue-500/20 min-w-[80px]">
                      <Crosshair className="w-4 h-4 text-purple-400 mb-1" />
                      <p className="text-[10px] text-gray-400 uppercase">Wickets</p>
                      <p className="text-lg font-bold text-white">{player.Wickets}</p>
                    </div>

                    {/* Economy */}
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800/50 border border-blue-500/20 min-w-[80px]">
                      <TrendingUp className="w-4 h-4 text-cyan-400 mb-1" />
                      <p className="text-[10px] text-gray-400 uppercase">Econ</p>
                      <p className="text-lg font-bold text-white">{player.BowlEconomy}</p>
                    </div>

                    {/* Strike Rate */}
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800/50 border border-blue-500/20 min-w-[80px]">
                      <Zap className="w-4 h-4 text-cyan-400 mb-1" />
                      <p className="text-[10px] text-gray-400 uppercase">SR</p>
                      <p className="text-lg font-bold text-white">{player.BowlSR}</p>
                    </div>

                    {/* Best Figure */}
                    <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800/50 border border-blue-500/20 min-w-[80px]">
                      <Award className="w-4 h-4 text-cyan-400 mb-1" />
                      <p className="text-[10px] text-gray-400 uppercase">Best</p>
                      <p className="text-lg font-bold text-white">{player.BestFig}</p>
                    </div>
                  </div>
                </div>

                {/* Position indicator line for top player */}
                {isTop && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getRankColor(leaderboardIdx)}`}></div>
                )}
              </div>
            );
          })}
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
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-loader {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.7;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-loader {
          animation: pulse-loader 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PurpleCapStats;