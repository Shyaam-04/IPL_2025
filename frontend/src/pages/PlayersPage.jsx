import React, { useState, useEffect } from "react";
import axios from "axios";
// Reverting to 'react-router'
import { useParams } from "react-router"; 
import Navbar from "../components/Navbar";
// Reverting to 'react-router'
import { Link } from "react-router"; 

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const { TeamID } = useParams(); // Must match Route param exactly

  useEffect(() => {
    axios.get(`http://localhost:5000/${TeamID}/players`)
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error(error));
  }, [TeamID]);

  return (
    <div className='min-h-screen relative'>
      {/* Background updated for top and bottom glow */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      
      <Navbar/>
      <div className='mx-auto max-w-7xl px-6 py-8'>
        <div className='flex items-center justify-center mb-8'>
          <h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider'>
            Players
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map(player => (
            <div 
              key={player.PlayerID} 
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 p-6"
            >
            
              <div className="flex items-center justify-center mb-4">
                <span className="bg-blue-500/20 text-blue-400 font-bold text-lg px-4 py-1 rounded-full border border-blue-500/40">
                  {player.PlayerID}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-blue-600 dark:text-sky-400 font-bold">Name:</span> {player.PlayerName}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-blue-600 dark:text-sky-400 font-bold">AuctionPrice:</span> {player.AuctionPrice}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-blue-600 dark:text-sky-400 font-bold">Nationality:</span> {player.Nationality}
              </p>
              <p className="text-gray-300 text-sm mb-4">
                <span className="text-blue-600 dark:text-sky-400 font-bold">Age:</span> {player.age}
              </p>
              
              {/* Buttons side-by-side */}
           <div className="flex flex-wrap justify-evenly gap-4 mt-4 w-full">
              <Link
                to={`/players/${player.PlayerID}/batting_stats`}
                className="btn btn-primary btn-sm w-[44%] min-w-[130px] h-4 text-base normal-case"
              >
                Batting Stats
              </Link>
              <Link
                to={`/players/${player.PlayerID}/bowling_stats`}
                className="btn btn-primary btn-sm w-[44%] min-w-[130px] h-4 text-base normal-case"
              >
                Bowling Stats
              </Link>
           </div>




            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;