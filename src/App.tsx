import React, { useState } from 'react'
import AdminAddsA from './components/AdminAddsA.tsx'
import AdminTriesTo from './components/AdminTriesTo.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SetupContent from './components/SetupContent.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserCalculatesThe from './components/UserCalculatesThe.tsx'
import UserRequestsFishing from './components/UserRequestsFishing.tsx'
import UserSubmitsA from './components/UserSubmitsA.tsx'

const screens = [
  { name: 'AdminAddsA', component: <AdminAddsA /> },
  { name: 'AdminTriesTo', component: <AdminTriesTo /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SetupContent', component: <SetupContent /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserCalculatesThe', component: <UserCalculatesThe /> },
  { name: 'UserRequestsFishing', component: <UserRequestsFishing /> },
  { name: 'UserSubmitsA', component: <UserSubmitsA /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>West Ireland Tourist Town Website</strong>
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
