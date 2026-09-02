import React, { useState } from 'react'
import CalculateTotalCost from './components/CalculateTotalCost.tsx'
import CreateApi from './components/CreateApi.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import RegisteredUserSchedules from './components/RegisteredUserSchedules.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import TradespersonFailsTo from './components/TradespersonFailsTo.tsx'
import TradespersonWithLess from './components/TradespersonWithLess.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserFinalizesAppointment from './components/UserFinalizesAppointment.tsx'

const screens = [
  { name: 'CalculateTotalCost', component: <CalculateTotalCost /> },
  { name: 'CreateApi', component: <CreateApi /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'RegisteredUserSchedules', component: <RegisteredUserSchedules /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'TradespersonFailsTo', component: <TradespersonFailsTo /> },
  { name: 'TradespersonWithLess', component: <TradespersonWithLess /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserFinalizesAppointment', component: <UserFinalizesAppointment /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>test123 - Tradesperson Marketplace Platform</strong>
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
