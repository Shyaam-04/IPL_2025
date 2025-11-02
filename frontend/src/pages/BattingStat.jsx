import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import axios from "axios";
import { CircleUserRound, Component, Activity, TrendingUp, Target, Zap, Award } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with floating orbs */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]">
        
      </div>

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8 pb-8">
        {/* Enhanced Batting Stats Heading */}
        <div className='flex items-center justify-center mb-8 mt-8'>
          <div className="relative group">
            {/* Animated glow background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"></div>
            
            {/* Decorative elements */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2">
              <Component className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <Component className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            
            {/* Main heading */}
            <div className="relative px-8 py-3 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/30">
              <h1 className='text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 tracking-wider animate-gradient-x'>
                BATTING STATS
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {batting.map((battingStat, index) => (
            <div
              key={battingStat.PlayerID}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="group relative w-full max-w-3xl bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 
                        hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl 
                        hover:shadow-cyan-400/40 hover:-translate-y-2 p-6
                        animate-fade-in-up overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              <div className="relative z-10">
                {/* Player Icon with glow - Smaller */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <CircleUserRound className="relative w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </div>
                </div>

                {/* Player Name - Smaller */}
                <h3 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                  {battingStat.PlayerName}
                </h3>

                {/* Stats Grid - More compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Matches */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Activity className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Matches</p>
                    <p className="text-lg font-bold text-white">{battingStat.Matches}</p>
                  </div>

                  {/* Innings */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Activity className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Innings</p>
                    <p className="text-lg font-bold text-white">{battingStat.BatInnings}</p>
                  </div>

                  {/* Runs Scored */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <TrendingUp className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Runs</p>
                    <p className="text-lg font-bold text-white">{battingStat.RunsScored}</p>
                  </div>

                  {/* Highest Score */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Award className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">High Score</p>
                    <p className="text-lg font-bold text-white">{battingStat.HighestScore}</p>
                  </div>

                  {/* Strike Rate */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Zap className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Strike Rate</p>
                    <p className="text-lg font-bold text-white">{battingStat.BatSR}</p>
                  </div>

                  {/* Average */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Target className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Average</p>
                    <p className="text-lg font-bold text-white">{battingStat.BatAvg}</p>
                  </div>

                  {/* 4s */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Target className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fours</p>
                    <p className="text-lg font-bold text-white">{battingStat["4s"]}</p>
                  </div>

                  {/* 6s */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-slate-800/30 border border-blue-500/20 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Award className="w-4 h-4 text-cyan-400 mb-1" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Sixes</p>
                    <p className="text-lg font-bold text-white">{battingStat["6s"]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
      `}</style>
    </div>
  );
};

export default BattingStat;