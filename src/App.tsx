import React, { useState } from 'react'
import BuildHomeScreen from './components/BuildHomeScreen'
import BuildTeamSelection from './components/BuildTeamSelection'
import BuildLeaderboardScreen from './components/BuildLeaderboardScreen'
import Receive from './components/Receive'
import VerifyThe from './components/VerifyThe'
import CreateDatabaseSchema from './components/CreateDatabaseSchema'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd'
import IntegratePaymentGateway from './components/IntegratePaymentGateway'
import SetupNotification from './components/SetupNotification'

const screens = [
  { name: "Home Screen", component: <BuildHomeScreen /> },
  { name: "Team Selection", component: <BuildTeamSelection /> },
  { name: "Leaderboard", component: <BuildLeaderboardScreen /> },
  { name: "Score Updates", component: <Receive /> },
  { name: "Competition Duration", component: <VerifyThe /> },
  { name: "Database Schema", component: <CreateDatabaseSchema /> },
  { name: "Authentication", component: <SetupAuthenticationAnd /> },
  { name: "Payment Gateway", component: <IntegratePaymentGateway /> },
  { name: "Notifications", component: <SetupNotification /> }
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>E2ETest - Soccer Competition Tracking Mobile App</strong>
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
