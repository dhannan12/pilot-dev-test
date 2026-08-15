import React, { useState } from 'react'
import ConfigureAutomated from './components/ConfigureAutomated.tsx'
import CreateOnboarding from './components/CreateOnboarding.tsx'
import DepartmentManagerApproves from './components/DepartmentManagerApproves.tsx'
import HrManagerAssigns from './components/HrManagerAssigns.tsx'
import HrManagerViews from './components/HrManagerViews.tsx'
import NewEmployeeCompletes from './components/NewEmployeeCompletes.tsx'
import NewEmployeeReceives from './components/NewEmployeeReceives.tsx'
import NewEmployeeUploads from './components/NewEmployeeUploads.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SystemCalculatesProgress from './components/SystemCalculatesProgress.tsx'

const screens = [
  { name: 'ConfigureAutomated', component: <ConfigureAutomated /> },
  { name: 'CreateOnboarding', component: <CreateOnboarding /> },
  { name: 'DepartmentManagerApproves', component: <DepartmentManagerApproves /> },
  { name: 'HrManagerAssigns', component: <HrManagerAssigns /> },
  { name: 'HrManagerViews', component: <HrManagerViews /> },
  { name: 'NewEmployeeCompletes', component: <NewEmployeeCompletes /> },
  { name: 'NewEmployeeReceives', component: <NewEmployeeReceives /> },
  { name: 'NewEmployeeUploads', component: <NewEmployeeUploads /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SystemCalculatesProgress', component: <SystemCalculatesProgress /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Employee Onboarding Portal</strong>
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
