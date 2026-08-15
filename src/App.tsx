import React, { useState } from 'react'
import DashboardDisplaysActive from './components/DashboardDisplaysActive.tsx'
import ImplementJwt from './components/ImplementJwt.tsx'
import SetupCourt from './components/SetupCourt.tsx'
import SetupDatabase from './components/SetupDatabase.tsx'
import SolicitorLogsBillable from './components/SolicitorLogsBillable.tsx'
import SystemCalculatesTotal from './components/SystemCalculatesTotal.tsx'
import SystemSendsNotifications from './components/SystemSendsNotifications.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'

const screens = [
  { name: 'DashboardDisplaysActive', component: <DashboardDisplaysActive /> },
  { name: 'ImplementJwt', component: <ImplementJwt /> },
  { name: 'SetupCourt', component: <SetupCourt /> },
  { name: 'SetupDatabase', component: <SetupDatabase /> },
  { name: 'SolicitorLogsBillable', component: <SolicitorLogsBillable /> },
  { name: 'SystemCalculatesTotal', component: <SystemCalculatesTotal /> },
  { name: 'SystemSendsNotifications', component: <SystemSendsNotifications /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Legal Case Tracker - Case Management System</strong>
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
