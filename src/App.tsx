import React, { useState } from 'react'
import Create from './components/Create.tsx'
import ImplementJwt from './components/ImplementJwt.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserLogsHours from './components/UserLogsHours.tsx'
import UserMarksDocuments from './components/UserMarksDocuments.tsx'
import UserSelectsA from './components/UserSelectsA.tsx'
import UserTriesTo from './components/UserTriesTo.tsx'
import UserUpdatesCase from './components/UserUpdatesCase.tsx'
import UserViewsThe from './components/UserViewsThe.tsx'
import UserWhoIs from './components/UserWhoIs.tsx'

const screens = [
  { name: 'Create', component: <Create /> },
  { name: 'ImplementJwt', component: <ImplementJwt /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserLogsHours', component: <UserLogsHours /> },
  { name: 'UserMarksDocuments', component: <UserMarksDocuments /> },
  { name: 'UserSelectsA', component: <UserSelectsA /> },
  { name: 'UserTriesTo', component: <UserTriesTo /> },
  { name: 'UserUpdatesCase', component: <UserUpdatesCase /> },
  { name: 'UserViewsThe', component: <UserViewsThe /> },
  { name: 'UserWhoIs', component: <UserWhoIs /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Legal Case Tracker - Web Application for Law Firm Case Management</strong>
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
