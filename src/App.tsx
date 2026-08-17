import React, { useState } from 'react'
import CalculateTotalCost from './components/CalculateTotalCost.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import SetupEmail from './components/SetupEmail.tsx'
import SetupJwt from './components/SetupJwt.tsx'
import StaffMemberWithout from './components/StaffMemberWithout.tsx'
import SystemFlagsExpired from './components/SystemFlagsExpired.tsx'
import UserCancelsA from './components/UserCancelsA.tsx'
import UserFailsTo from './components/UserFailsTo.tsx'
import UserSubmitsMembership from './components/UserSubmitsMembership.tsx'
import UserTriesTo from './components/UserTriesTo.tsx'
import UserWithoutActive from './components/UserWithoutActive.tsx'

const screens = [
  { name: 'CalculateTotalCost', component: <CalculateTotalCost /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'SetupEmail', component: <SetupEmail /> },
  { name: 'SetupJwt', component: <SetupJwt /> },
  { name: 'StaffMemberWithout', component: <StaffMemberWithout /> },
  { name: 'SystemFlagsExpired', component: <SystemFlagsExpired /> },
  { name: 'UserCancelsA', component: <UserCancelsA /> },
  { name: 'UserFailsTo', component: <UserFailsTo /> },
  { name: 'UserSubmitsMembership', component: <UserSubmitsMembership /> },
  { name: 'UserTriesTo', component: <UserTriesTo /> },
  { name: 'UserWithoutActive', component: <UserWithoutActive /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Gym Membership Portal</strong>
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
