import React, { useState } from 'react'
import BuildAppointmentScheduling from './components/BuildAppointmentScheduling.tsx'
import BuildPatientTreatment from './components/BuildPatientTreatment.tsx'
import BuildReminderNotifications from './components/BuildReminderNotifications.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import ManagePatient from './components/ManagePatient.tsx'
import ScheduleAppointments from './components/ScheduleAppointments.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupPipeline from './components/SetupPipeline.tsx'

const screens = [
  { name: 'BuildAppointmentScheduling', component: <BuildAppointmentScheduling /> },
  { name: 'BuildPatientTreatment', component: <BuildPatientTreatment /> },
  { name: 'BuildReminderNotifications', component: <BuildReminderNotifications /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'ManagePatient', component: <ManagePatient /> },
  { name: 'ScheduleAppointments', component: <ScheduleAppointments /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupPipeline', component: <SetupPipeline /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Dental Clinic Online Appointment and Patient Management System</strong>
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
