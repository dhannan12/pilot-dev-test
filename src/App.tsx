import React, { useState } from 'react'
import AdminChecksThe from './components/AdminChecksThe.tsx'
import AdminWantsTo from './components/AdminWantsTo.tsx'
import CreateContact from './components/CreateContact.tsx'
import Setup from './components/Setup.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import UserAttempts from './components/UserAttempts.tsx'
import UserSubmitsThe from './components/UserSubmitsThe.tsx'
import UserWantsTo from './components/UserWantsTo.tsx'

const screens = [
  { name: 'AdminChecksThe', component: <AdminChecksThe /> },
  { name: 'AdminWantsTo', component: <AdminWantsTo /> },
  { name: 'CreateContact', component: <CreateContact /> },
  { name: 'Setup', component: <Setup /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'UserAttempts', component: <UserAttempts /> },
  { name: 'UserSubmitsThe', component: <UserSubmitsThe /> },
  { name: 'UserWantsTo', component: <UserWantsTo /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Contact Form Web Application</strong>
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
