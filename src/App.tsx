import React, { useState } from 'react'
import AdminProcessesAn from './components/AdminProcessesAn.tsx'
import CalculateAttendancePercentage from './components/CalculateAttendancePercentage.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import GenerateAMonthly from './components/GenerateAMonthly.tsx'
import ImplementJwt from './components/ImplementJwt.tsx'
import ImplementNotification from './components/ImplementNotification.tsx'
import StudentInformsParent from './components/StudentInformsParent.tsx'
import SubmitAnAbsence from './components/SubmitAnAbsence.tsx'
import TeacherUpdatesThe from './components/TeacherUpdatesThe.tsx'
import UnauthorizedUserAttempts from './components/UnauthorizedUserAttempts.tsx'
import UserAttempts from './components/UserAttempts.tsx'
import UserSubmitsA from './components/UserSubmitsA.tsx'

const screens = [
  { name: 'AdminProcessesAn', component: <AdminProcessesAn /> },
  { name: 'CalculateAttendancePercentage', component: <CalculateAttendancePercentage /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'GenerateAMonthly', component: <GenerateAMonthly /> },
  { name: 'ImplementJwt', component: <ImplementJwt /> },
  { name: 'ImplementNotification', component: <ImplementNotification /> },
  { name: 'StudentInformsParent', component: <StudentInformsParent /> },
  { name: 'SubmitAnAbsence', component: <SubmitAnAbsence /> },
  { name: 'TeacherUpdatesThe', component: <TeacherUpdatesThe /> },
  { name: 'UnauthorizedUserAttempts', component: <UnauthorizedUserAttempts /> },
  { name: 'UserAttempts', component: <UserAttempts /> },
  { name: 'UserSubmitsA', component: <UserSubmitsA /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>School Absence Management System</strong>
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
