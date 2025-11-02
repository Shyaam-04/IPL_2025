import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router"; 
import Navbar from "../components/Navbar";
import { Link } from "react-router"; 
import { UserPlus, TrendingUp, DollarSign, Globe, Calendar, Component, ShieldHalf, CircleUserRound, User } from "lucide-react";
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


// NEW: Loading Indicator Component
// ----------------------------------------------
const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300">
      <h1 className='text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 tracking-wider animate-gradient-x mb-8'>
        LOADING PLAYERS
      </h1>
      <div className="flex gap-4">
        {/* Pulsing Orbs */}
        <div className="w-5 h-5 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse-loader" style={{ animationDelay: '0s' }}></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse-loader" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-5 h-5 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse-loader" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};
// ----------------------------------------------


const TotalPlayersPage = () => {
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
            const response = await axios.get(`http://localhost:5000/players`);
            await new Promise(resolve => setTimeout(resolve, 1200)); 
            setPlayers(response.data);
        } catch (error) {
            console.error("Failed to fetch players:", error);
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

  return (
    <div className='min-h-screen relative overflow-hidden'>
      
      {isLoading && <LoadingIndicator />}
      
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        
      </div>
      
      <div className="sticky top-0 z-50">
        <Navbar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          placeholder="Search Player"
        />
      </div>
      
      <div className='mx-auto max-w-7xl px-6 pt-16 pb-8'>
        <div className='flex items-center justify-center mb-12 mt-16'>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"></div>
            
            <div className="absolute -left-12 top-1/2 -translate-y-1/2">
              <Component className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <Component className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            
            <div className="relative px-8 py-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/30">
              <h1 className='text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 tracking-wider animate-gradient-x'>
                PLAYERS
              </h1>
            </div>
          </div>
        </div>
        
        {filteredPlayers.length === 0 && searchTerm && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No players found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              Clear Search
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player, index) => (
            <div 
              key={player.PlayerID}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 
                      hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl 
                      hover:shadow-cyan-400/40 hover:-translate-y-2 p-6 flex flex-col
                      animate-fade-in-up overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              <div className="relative z-10">
                {/* Team Logo */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                    {/*<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>*/}
                    <img 
                      src={getTeamLogo(player.TeamID)} 
                      alt={`${player.TeamName} Logo`} 
                      className="relative w-20 h-16 object-contain drop-shadow-[0_0_15px_rgba(0,191,255,0.5)]"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                  {player.PlayerName}
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
                    <ShieldHalf className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="text-cyan-400 font-semibold">Team: </span> {player.TeamName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
                    <DollarSign className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="text-cyan-400 font-semibold">Auction:</span> {player.AuctionPrice}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
                    <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="text-cyan-400 font-semibold">Nationality:</span> {player.Nationality}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="text-cyan-400 font-semibold">Age:</span> {player.age}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <Link
                    to={`/players/${player.PlayerID}/batting_stats`}
                    className="flex-1 relative group/btn overflow-hidden"
                  >
                    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg text-center text-sm hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Batting
                        <TrendingUp className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  
                  <Link
                    to={`/players/${player.PlayerID}/bowling_stats`}
                    className="flex-1 relative group/btn overflow-hidden"
                  >
                    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg text-center text-sm hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Bowling
                        <TrendingUp className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-loader {
          animation: pulse-loader 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TotalPlayersPage;