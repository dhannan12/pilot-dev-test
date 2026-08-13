import React, { useState } from 'react'
import BuildAppointmentScheduling from './components/BuildAppointmentScheduling.tsx'
import BuildPatientPortal from './components/BuildPatientPortal.tsx'
import BuildProgressTracking from './components/BuildProgressTracking.tsx'
import CalculateAvailable from './components/CalculateAvailable.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import SchedulePhysiotherapy from './components/SchedulePhysiotherapy.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupNotificationService from './components/SetupNotificationService.tsx'

const screens = [
  { name: 'BuildAppointmentScheduling', component: <BuildAppointmentScheduling /> },
  { name: 'BuildPatientPortal', component: <BuildPatientPortal /> },
  { name: 'BuildProgressTracking', component: <BuildProgressTracking /> },
  { name: 'CalculateAvailable', component: <CalculateAvailable /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'SchedulePhysiotherapy', component: <SchedulePhysiotherapy /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupNotificationService', component: <SetupNotificationService /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Rehabd Physiotherapy Management Platform</strong>
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
