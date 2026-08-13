import React, { useState } from 'react'
import BuildLandlordDashboard from './components/BuildLandlordDashboard.tsx'
import BuildTenantApplication from './components/BuildTenantApplication.tsx'
import BuildTenantScreening from './components/BuildTenantScreening.tsx'
import CalculateSecurity from './components/CalculateSecurity.tsx'
import ImplementRbac from './components/ImplementRbac.tsx'
import ManageMy from './components/ManageMy.tsx'
import PropertyStreamline from './components/PropertyStreamline.tsx'
import Setup from './components/Setup.tsx'
import SubmitTenant from './components/SubmitTenant.tsx'

const screens = [
  { name: 'BuildLandlordDashboard', component: <BuildLandlordDashboard /> },
  { name: 'BuildTenantApplication', component: <BuildTenantApplication /> },
  { name: 'BuildTenantScreening', component: <BuildTenantScreening /> },
  { name: 'CalculateSecurity', component: <CalculateSecurity /> },
  { name: 'ImplementRbac', component: <ImplementRbac /> },
  { name: 'ManageMy', component: <ManageMy /> },
  { name: 'PropertyStreamline', component: <PropertyStreamline /> },
  { name: 'Setup', component: <Setup /> },
  { name: 'SubmitTenant', component: <SubmitTenant /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>PropertyApp - Property Management Platform</strong>
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
