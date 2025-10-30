import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import axios from "axios";

const StatLine = ({ label, value }) => (
  <p className="text-blue-400 font-bold text-lg my-0">
    {label}
    <span className="text-blue-100 font-semibold ml-2">{value ?? "-"}</span>
  </p>
);

const BowlingStat = () => {
  const [bowling, setBowling] = useState([]);
  const { PlayerID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/players/${PlayerID}/bowling_stats`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setBowling(data);
        } else if (data.bowling) {
          setBowling([data.bowling]);
        } else if (data) {
          setBowling([data]);
        }
      })
      .catch((error) => console.error(error));
  }, [PlayerID]);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider">
            Player Bowling Stats
          </h1>
        </div>
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
          {bowling.length === 0 ? (
            <div className="text-center text-lg text-gray-400">
              No Bowling Stats Found for this player.
            </div>
          ) : (
            bowling.map((bowlingStat, idx) => (
              <div
                key={bowlingStat.PlayerID + "_" + idx}
                className="w-[280px] md:w-[340px] lg:w-[370px] bg-slate-900/50 rounded-xl border border-blue-400/30 shadow-lg p-10 flex flex-col items-center"
              >
                <div className="flex items-center justify-center mb-6">
                  <span className="bg-blue-500/20 text-blue-400 font-bold text-lg px-8 py-2 rounded-full border border-blue-500/40">
                    {bowlingStat.PlayerID}
                  </span>
                </div>
                 <div className="w-full flex flex-col gap-2 mt-2 text-lg">
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Matches:</span> <span className="text-gray-300">{bowlingStat.MatchesPlayed}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Innings batted:</span> <span className="text-gray-300">{bowlingStat.BowlInnings}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Runs Scored:</span> <span className="text-gray-300">{bowlingStat.Wickets}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Economy:</span> <span className="text-gray-300">{bowlingStat.BowlEconomy}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Strike Rate:</span> <span className="text-gray-300">{bowlingStat.BowlSR}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Average:</span> <span className="text-gray-300">{bowlingStat.BowlAvg}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Best Figure:</span> <span className="text-gray-300">{bowlingStat.BestFig}</span>
                </p>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BowlingStat;
