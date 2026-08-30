import React, { useState } from 'react'
import AdminApprovesNew from './components/AdminApprovesNew.tsx'
import AdminAttemptsTo from './components/AdminAttemptsTo.tsx'
import AuthenticationAnd from './components/AuthenticationAnd.tsx'
import CalculateTotalMembership from './components/CalculateTotalMembership.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import EnvironmentAnd from './components/EnvironmentAnd.tsx'
import MemberPaysAnnual from './components/MemberPaysAnnual.tsx'
import MemberRsvpsFor from './components/MemberRsvpsFor.tsx'
import TeamManagerManages from './components/TeamManagerManages.tsx'
import TeamManagerSubmits from './components/TeamManagerSubmits.tsx'
import UpdateLeagueStandings from './components/UpdateLeagueStandings.tsx'

const screens = [
  { name: 'AdminApprovesNew', component: <AdminApprovesNew /> },
  { name: 'AdminAttemptsTo', component: <AdminAttemptsTo /> },
  { name: 'AuthenticationAnd', component: <AuthenticationAnd /> },
  { name: 'CalculateTotalMembership', component: <CalculateTotalMembership /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'EnvironmentAnd', component: <EnvironmentAnd /> },
  { name: 'MemberPaysAnnual', component: <MemberPaysAnnual /> },
  { name: 'MemberRsvpsFor', component: <MemberRsvpsFor /> },
  { name: 'TeamManagerManages', component: <TeamManagerManages /> },
  { name: 'TeamManagerSubmits', component: <TeamManagerSubmits /> },
  { name: 'UpdateLeagueStandings', component: <UpdateLeagueStandings /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>SportsClub</strong>
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
