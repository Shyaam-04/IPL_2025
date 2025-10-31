import React from 'react'
import {Route, Routes} from "react-router"  
import HomePage from './pages/HomePage'
import PlayersPage from './pages/PlayersPage'
import BattingStat from './pages/BattingStat'
import BowlingStat from './pages/BowlingStat'
//import TeamsPage from './pages/TeamsPage'
import OrangeCapStats from './pages/OrangeCapStats'
import PurpleCapStats from './pages/PurpleCapStats'
import TotalPlayersPage from './pages/TotalPlayersPage'

const App = () => {
  return (
    <div className='relative min-h-screen w-full overflow-x-hidden'>
      {/*<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />*/}
      {/*<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#2253B940_100%)]" />*/}
      {/*<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#1976FF40_100%)]" />*/}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />
      

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/teams" element={<TeamsPage />} />*/}
          <Route path="/:TeamID/players" element={<PlayersPage />} />
          {/*<Route path="/players/:PlayerId" element={<PlayerInfoPage />} />*/}  
          <Route path="/players/:PlayerID/batting_stats" element={<BattingStat />} />
          <Route path="/players/:PlayerID/bowling_stats" element={<BowlingStat />} />
          <Route path="/batting_stats" element={<OrangeCapStats />} />
          <Route path="/bowling_stats" element={<PurpleCapStats />} />
          <Route path="/players" element={<TotalPlayersPage />} />
        </Routes>
    </div>
  )
}

export default App
