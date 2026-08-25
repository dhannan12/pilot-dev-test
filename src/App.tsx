import React, { useState } from 'react'
import CalculateAverageScore from './components/CalculateAverageScore.tsx'
import CalculateRankingFor from './components/CalculateRankingFor.tsx'
import CoachAttemptsTo from './components/CoachAttemptsTo.tsx'
import MatchScheduleIs from './components/MatchScheduleIs.tsx'
import PlayerWithLess from './components/PlayerWithLess.tsx'
import RegisteredUserAttempts from './components/RegisteredUserAttempts.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserRequestsScore from './components/UserRequestsScore.tsx'

const screens = [
  { name: 'CalculateAverageScore', component: <CalculateAverageScore /> },
  { name: 'CalculateRankingFor', component: <CalculateRankingFor /> },
  { name: 'CoachAttemptsTo', component: <CoachAttemptsTo /> },
  { name: 'MatchScheduleIs', component: <MatchScheduleIs /> },
  { name: 'PlayerWithLess', component: <PlayerWithLess /> },
  { name: 'RegisteredUserAttempts', component: <RegisteredUserAttempts /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserRequestsScore', component: <UserRequestsScore /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>{{prd_title}}</strong>
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
