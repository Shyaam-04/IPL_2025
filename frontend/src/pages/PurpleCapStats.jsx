import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"

const PurpleCapStats = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/bowling_stats")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error(error))
  }, []);

  // Filter players based on search term
  const filteredPlayers = players.filter(player => {
    if (!searchTerm) return true; // If no search term, show all players

    const search = searchTerm.toLowerCase();

    // Check PlayerName
    if (player.PlayerName && player.PlayerName.toLowerCase().includes(search)) {
      return true;
    }

    // Check PlayerID
    if (player.PlayerID && player.PlayerID.toString().includes(search)) {
      return true;
    }

    return false;
  });

  return (
    <div className='min-h-screen relative'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Player"
      />
      <div className='mx-auto max-w-7xl pt-16 pb-8'>
        <div className='flex items-center justify-center mb-2'>
          <h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider mt-16'>
            Purple Cap LeaderBoard
          </h1>
        </div>
      </div>
      <div className="overflow-x-auto mx-auto max-w-7xl pt-4 pb-8">
        <table className="table text-white rounded-xl overflow-hidden shadow-lg border-separate border-spacing-y-1">
          <thead className="bg-slate-950">
            <tr className="border-b border-white/20">
              <th className="text-white">POS</th>
              <th className="text-white">Name</th>
              <th className="text-white">Player ID</th>
              <th className="text-white">Matches Played</th>
              <th className="text-white">Innings</th>
              <th className="text-white">Wickets</th>
              <th className="text-white">Economy</th>
              <th className="text-white">Strike Rate</th>
              <th className="text-white">Average</th>
              <th className='text-white'>Best Figure</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map(player => {
              // Standing in the full leaderboard
              const leaderboardIdx = players.findIndex(p => p.PlayerID === player.PlayerID) + 1;
              return (
                <tr
                  key={player.PlayerID}
                  className="bg-slate-900 border-2 border-white/20 hover:border-cyan-400 transition-all duration-300"
                  style={{ boxShadow: '0 0 0 0 #22d3ee' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 10px 2px #22d3ee'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 #22d3ee'}
                >
                  <th className="text-white">{leaderboardIdx}</th>
                  <td className="text-white">{player.PlayerName}</td>
                  <td className="text-white">{player.PlayerID}</td>
                  <td className="text-white">{player.MatchesPlayed}</td>
                  <td className="text-white">{player.BowlInnings}</td>
                  <td className="text-white">{player.Wickets}</td>
                  <td className="text-white">{player.BowlEconomy}</td>
                  <td className="text-white">{player.BowlSR}</td>
                  <td className="text-white">{player.BowlAvg}</td>
                  <td className='text-white'>{player.BestFig}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurpleCapStats;
