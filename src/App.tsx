import React, { useState } from 'react'
import BuildMatchPerformance from './components/BuildMatchPerformance.tsx'
import BuildPlayerPerformance from './components/BuildPlayerPerformance.tsx'
import BuildTournamentProgress from './components/BuildTournamentProgress.tsx'
import CalculateAverage from './components/CalculateAverage.tsx'
import CalculateRanking from './components/CalculateRanking.tsx'
import CoachAttempts from './components/CoachAttempts.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import MatchSchedule from './components/MatchSchedule.tsx'
import PlayerWith from './components/PlayerWith.tsx'
import RegisteredUser from './components/RegisteredUser.tsx'
import UserAttempts from './components/UserAttempts.tsx'
import UserRequests from './components/UserRequests.tsx'

const screens = [
  { name: 'BuildMatchPerformance', component: <BuildMatchPerformance /> },
  { name: 'BuildPlayerPerformance', component: <BuildPlayerPerformance /> },
  { name: 'BuildTournamentProgress', component: <BuildTournamentProgress /> },
  { name: 'CalculateAverage', component: <CalculateAverage /> },
  { name: 'CalculateRanking', component: <CalculateRanking /> },
  { name: 'CoachAttempts', component: <CoachAttempts /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'MatchSchedule', component: <MatchSchedule /> },
  { name: 'PlayerWith', component: <PlayerWith /> },
  { name: 'RegisteredUser', component: <RegisteredUser /> },
  { name: 'UserAttempts', component: <UserAttempts /> },
  { name: 'UserRequests', component: <UserRequests /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>TennisApp</strong>
        {screens.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{padding:"4px 12px",borderRadius:"6px",border:"1px solid",cursor:"pointer",
              background: active===i ? "#3b82f6" : "white",
              color: active===i ? "white" : "#374151",
              borderColor: active===i ? "#3b82f6" : "#d1d5db"}}>
            {s.name}
          </button>
        ))}
      </header>
      <main style={{padding:"24px"}}>{screens[active]?.component}</main>
    </div>
  )
}
