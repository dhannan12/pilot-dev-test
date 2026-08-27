import React, { useState } from 'react'
import AccessingTheMembers from './components/AccessingTheMembers.tsx'
import AttemptingTo from './components/AttemptingTo.tsx'
import CalculatingAverageRating from './components/CalculatingAverageRating.tsx'
import DisplayingSailingCourses from './components/DisplayingSailingCourses.tsx'
import LoggingInAs from './components/LoggingInAs.tsx'
import RegisteringForAn from './components/RegisteringForAn.tsx'
import SubmittingAHistorical from './components/SubmittingAHistorical.tsx'
import SubmittingAnEvent from './components/SubmittingAnEvent.tsx'

const screens = [
  { name: 'AccessingTheMembers', component: <AccessingTheMembers /> },
  { name: 'AttemptingTo', component: <AttemptingTo /> },
  { name: 'CalculatingAverageRating', component: <CalculatingAverageRating /> },
  { name: 'DisplayingSailingCourses', component: <DisplayingSailingCourses /> },
  { name: 'LoggingInAs', component: <LoggingInAs /> },
  { name: 'RegisteringForAn', component: <RegisteringForAn /> },
  { name: 'SubmittingAHistorical', component: <SubmittingAHistorical /> },
  { name: 'SubmittingAnEvent', component: <SubmittingAnEvent /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Saliboating</strong>
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
