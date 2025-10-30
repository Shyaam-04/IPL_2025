import React, {useEffect, useState} from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import { Link } from 'react-router'

const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/")
     .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='min-h-screen relative'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      
      <Navbar/>
      <div className='mx-auto max-w-7xl px-6 py-8'>
        <div className='flex items-center justify-center mb-8'>
          <h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider'>
            TEAMS
          </h1>
          {/*<h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider animate-glow'>
            TEAMS
          </h1>*/}
          {/*<h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider animate-fadeInDown'>
            TEAMS
          </h1>*/}
        
          
      </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div 
              key={team.TeamID} 
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 p-6"
            >
            
              <div className="flex items-center justify-center mb-4">
                <span className="bg-blue-500/20 text-blue-400 font-bold text-lg px-4 py-1 rounded-full border border-blue-500/40">
                  {team.TeamID}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-blue-600 dark:text-sky-400 font-bold">Team:</span> {team.TeamName}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-blue-600 dark:text-sky-400 font-bold">Owner:</span> {team.OwnerName}
              </p>
               <Link to={`/${team.TeamID}/players`} className="btn btn-primary btn-sm w-full mt-4">
                View Players
               </Link>
            </div>

          ))}
        </div>
      </div>
      </div>
  )
}

export default HomePage