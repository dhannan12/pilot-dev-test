import React, { useState } from 'react'
import BuildCore from './components/BuildCore.tsx'
import CaregiverAttemptsTo from './components/CaregiverAttemptsTo.tsx'
import ImplementAuthentication from './components/ImplementAuthentication.tsx'
import SetupDatabase from './components/SetupDatabase.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserChecksProgress from './components/UserChecksProgress.tsx'
import UserChecksTheir from './components/UserChecksTheir.tsx'
import UserLogsHealth from './components/UserLogsHealth.tsx'
import UserTriesTo from './components/UserTriesTo.tsx'

const screens = [
  { name: 'BuildCore', component: <BuildCore /> },
  { name: 'CaregiverAttemptsTo', component: <CaregiverAttemptsTo /> },
  { name: 'ImplementAuthentication', component: <ImplementAuthentication /> },
  { name: 'SetupDatabase', component: <SetupDatabase /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserChecksProgress', component: <UserChecksProgress /> },
  { name: 'UserChecksTheir', component: <UserChecksTheir /> },
  { name: 'UserLogsHealth', component: <UserLogsHealth /> },
  { name: 'UserTriesTo', component: <UserTriesTo /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Daily Health Monitoring App</strong>
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
