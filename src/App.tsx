import React, { useState } from 'react'
import CalculateDamageCharges from './components/CalculateDamageCharges.tsx'
import CalculateRentalDuration from './components/CalculateRentalDuration.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import CustomerReceivesA from './components/CustomerReceivesA.tsx'
import CustomerSubmitsA from './components/CustomerSubmitsA.tsx'
import DepotStaffAttempts from './components/DepotStaffAttempts.tsx'
import DepotStaffCompletes from './components/DepotStaffCompletes.tsx'
import DepotStaffViews from './components/DepotStaffViews.tsx'
import ImplementAuthentication from './components/ImplementAuthentication.tsx'
import RoutingOfRental from './components/RoutingOfRental.tsx'
import SetupEmail from './components/SetupEmail.tsx'

const screens = [
  { name: 'CalculateDamageCharges', component: <CalculateDamageCharges /> },
  { name: 'CalculateRentalDuration', component: <CalculateRentalDuration /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'CustomerReceivesA', component: <CustomerReceivesA /> },
  { name: 'CustomerSubmitsA', component: <CustomerSubmitsA /> },
  { name: 'DepotStaffAttempts', component: <DepotStaffAttempts /> },
  { name: 'DepotStaffCompletes', component: <DepotStaffCompletes /> },
  { name: 'DepotStaffViews', component: <DepotStaffViews /> },
  { name: 'ImplementAuthentication', component: <ImplementAuthentication /> },
  { name: 'RoutingOfRental', component: <RoutingOfRental /> },
  { name: 'SetupEmail', component: <SetupEmail /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Equipment Rental Platform</strong>
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
