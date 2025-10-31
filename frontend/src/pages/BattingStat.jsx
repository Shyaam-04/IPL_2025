import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import axios from "axios";

const BattingStat = () => {
  const [batting, setBatting] = useState([]);
  const { PlayerID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/players/${PlayerID}/batting_stats`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setBatting(data);
        } else if (data.batting) {
          setBatting([data.batting]);
        } else if (data) {
          setBatting([data]);
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
            Player Batting Stats
          </h1>
        </div>
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
          {batting.map(battingStat => (
            <div
              key={battingStat.PlayerID}
              className="w-[280px] md:w-[340px] lg:w-[370px] bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 p-8 flex flex-col items-center"
            >
              <div className="flex items-center justify-center mb-4">
                <span className="bg-blue-500/20 text-blue-400 font-bold text-lg px-6 py-2 rounded-full border border-blue-500/40">
                  {battingStat.PlayerID}
                </span>
              </div>
              <div className="w-full flex flex-col gap-1 mt-2 text-lg">
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Name:</span> <span className="text-gray-300">{battingStat.PlayerName}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Matches:</span> <span className="text-gray-300">{battingStat.Matches}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Innings batted:</span> <span className="text-gray-300">{battingStat.BatInnings}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Runs Scored:</span> <span className="text-gray-300">{battingStat.RunsScored}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Highest Score:</span> <span className="text-gray-300">{battingStat.HighestScore}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Strike Rate:</span> <span className="text-gray-300">{battingStat.BatSR}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">Average:</span> <span className="text-gray-300">{battingStat.BatAvg}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">4s:</span> <span className="text-gray-300">{battingStat["4s"]}</span>
                </p>
                <p className="text-blue-400">
                  <span className="text-blue-600 dark:text-sky-400 font-bold">6s:</span> <span className="text-gray-300">{battingStat["6s"]}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattingStat;
