import React, {useEffect, useState} from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
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

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:5000/")
     .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Filter teams based on search term
  const filteredTeams = teams.filter(team => {
    if (!searchTerm) return true; // If no search term, show all teams
    
    const search = searchTerm.toLowerCase();
    
    // Check TeamName
    if (team.TeamName && team.TeamName.toLowerCase().includes(search)) {
      return true;
    }
    
    // Check TeamID
    if (team.TeamID && team.TeamID.toString().includes(search)) {
      return true;
    }
    
    return false;
  });

  return (
    <div className='min-h-screen relative'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      
      <div className="sticky top-0 z-50">
        <Navbar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          placeholder="Search teams"
        />
      </div>

      
      <div className='mx-auto max-w-7xl px-6 pt-16 pb-8'>
        <div className='flex items-center justify-center mb-8 mt-16'>
          <h1 className='text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono tracking-wider'>
            TEAMS {searchTerm && `(${filteredTeams.length} found)`}
          </h1>
        </div>

        {/* Show message if no teams found */}
        {filteredTeams.length === 0 && searchTerm && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No teams found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 btn btn-primary btn-sm"
            >
              Clear Search
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <div 
              key={team.TeamID} 
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/30 
                        hover:border-cyan-400 transition-colors duration-300 hover:shadow-lg 
                        hover:shadow-cyan-400/30 hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-center mb-4">
                { team.TeamID === 1 && <img src={mi} alt="MI Logo" className="w-30 h-16"/> }
                { team.TeamID === 2 && <img src={csk} alt="CSK Logo" className="w-30 h-16"/> }
                { team.TeamID === 3 && <img src={pbks} alt="PBKS Logo" className="w-30 h-16"/> }
                { team.TeamID === 4 && <img src={srh} alt="SRH Logo" className="w-30 h-16"/> }
                { team.TeamID === 5 && <img src={kkr} alt="KKR Logo" className="w-30 h-16"/> }
                { team.TeamID === 6 && <img src={lsg} alt="LSG Logo" className="w-30 h-16"/> }
                { team.TeamID === 7 && <img src={rcb} alt="RCB Logo" className="w-30 h-16"/> }
                { team.TeamID === 8 && <img src={dc} alt="DC Logo" className="w-30 h-16"/> }
                { team.TeamID === 9 && <img src={gt} alt="GT Logo" className="w-30 h-16"/> }
                { team.TeamID === 10 && <img src={rr} alt="RR Logo" className="w-30 h-16"/> }
              </div>

              {/* Card Content */}
              <div className="flex flex-col justify-between text-gray-300 text-sm gap-1 min-h-[100px]">
                <p><span className="text-blue-600 dark:text-sky-400 font-bold">Team:</span> {team.TeamName}</p>
                <p><span className="text-blue-600 dark:text-sky-400 font-bold">Owner:</span> {team.OwnerName}</p>
                <p><span className="text-blue-600 dark:text-sky-400 font-bold">Trophies:</span> {team.trophies}</p>
              </div>

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