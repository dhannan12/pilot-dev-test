import React, { useState } from 'react'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SetupBackend from './components/SetupBackend.tsx'
import SetupDatabase from './components/SetupDatabase.tsx'
import UnregisteredUserTries from './components/UnregisteredUserTries.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserChecksThe from './components/UserChecksThe.tsx'
import UserSelects from './components/UserSelects.tsx'
import UserViewsA from './components/UserViewsA.tsx'
import UserWithLow from './components/UserWithLow.tsx'

const screens = [
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SetupBackend', component: <SetupBackend /> },
  { name: 'SetupDatabase', component: <SetupDatabase /> },
  { name: 'UnregisteredUserTries', component: <UnregisteredUserTries /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserChecksThe', component: <UserChecksThe /> },
  { name: 'UserSelects', component: <UserSelects /> },
  { name: 'UserViewsA', component: <UserViewsA /> },
  { name: 'UserWithLow', component: <UserWithLow /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>ClothesShop</strong>
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
