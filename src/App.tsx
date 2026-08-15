import React, { useState } from 'react'
import CreateExpense from './components/CreateExpense.tsx'
import SetupJwt from './components/SetupJwt.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserWantsTo from './components/UserWantsTo.tsx'

const screens = [
  { name: 'CreateExpense', component: <CreateExpense /> },
  { name: 'SetupJwt', component: <SetupJwt /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserWantsTo', component: <UserWantsTo /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Expense Tracker Application</strong>
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
