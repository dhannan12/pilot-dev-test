import React, { useState } from 'react'
import CreateDatabase from './components/CreateDatabase.tsx'
import ImplementAuthentication from './components/ImplementAuthentication.tsx'
import SystemCalculatesThe from './components/SystemCalculatesThe.tsx'
import UserAttempts from './components/UserAttempts.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserSelectsA from './components/UserSelectsA.tsx'
import UserSubmitsA from './components/UserSubmitsA.tsx'
import UserWithAn from './components/UserWithAn.tsx'

const screens = [
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'ImplementAuthentication', component: <ImplementAuthentication /> },
  { name: 'SystemCalculatesThe', component: <SystemCalculatesThe /> },
  { name: 'UserAttempts', component: <UserAttempts /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserSelectsA', component: <UserSelectsA /> },
  { name: 'UserSubmitsA', component: <UserSubmitsA /> },
  { name: 'UserWithAn', component: <UserWithAn /> },
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
