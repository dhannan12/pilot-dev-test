import React, { useState } from 'react'
import CreateTasks from './components/CreateTasks.tsx'
import Setup from './components/Setup.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SystemCalculatesThe from './components/SystemCalculatesThe.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserCreatesA from './components/UserCreatesA.tsx'
import UserWithoutDelete from './components/UserWithoutDelete.tsx'

const screens = [
  { name: 'CreateTasks', component: <CreateTasks /> },
  { name: 'Setup', component: <Setup /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SystemCalculatesThe', component: <SystemCalculatesThe /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserCreatesA', component: <UserCreatesA /> },
  { name: 'UserWithoutDelete', component: <UserWithoutDelete /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>TaskManager2 - Simple Task Management Application</strong>
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
