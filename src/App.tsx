import React, { useState } from 'react'
import BuildHomeScreen from './components/BuildHomeScreen.tsx'
import BuildInventoryManagement from './components/BuildInventoryManagement.tsx'
import BuildOrderStatus from './components/BuildOrderStatus.tsx'
import CalculateInventory from './components/CalculateInventory.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import EasilyDiscover from './components/EasilyDiscover.tsx'
import ManageInventory from './components/ManageInventory.tsx'
import MarketingAnalyze from './components/MarketingAnalyze.tsx'
import OrderOver from './components/OrderOver.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupPipeline from './components/SetupPipeline.tsx'

const screens = [
  { name: 'BuildHomeScreen', component: <BuildHomeScreen /> },
  { name: 'BuildInventoryManagement', component: <BuildInventoryManagement /> },
  { name: 'BuildOrderStatus', component: <BuildOrderStatus /> },
  { name: 'CalculateInventory', component: <CalculateInventory /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'EasilyDiscover', component: <EasilyDiscover /> },
  { name: 'ManageInventory', component: <ManageInventory /> },
  { name: 'MarketingAnalyze', component: <MarketingAnalyze /> },
  { name: 'OrderOver', component: <OrderOver /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupPipeline', component: <SetupPipeline /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Craft Beverage Online Ordering Platform</strong>
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
