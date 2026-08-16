import React, { useState } from 'react'
import AdminCoordinatorAssigns from './components/AdminCoordinatorAssigns.tsx'
import AdminCoordinatorAttempts from './components/AdminCoordinatorAttempts.tsx'
import AdminCoordinatorMarks from './components/AdminCoordinatorMarks.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import OrganizationManagerAccesses from './components/OrganizationManagerAccesses.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SetupEmail from './components/SetupEmail.tsx'
import SystemCalculatesTotal from './components/SystemCalculatesTotal.tsx'
import SystemFlagsInactive from './components/SystemFlagsInactive.tsx'
import SystemIdentifiesTop from './components/SystemIdentifiesTop.tsx'
import VolunteerSubmitsRegistration from './components/VolunteerSubmitsRegistration.tsx'

const screens = [
  { name: 'AdminCoordinatorAssigns', component: <AdminCoordinatorAssigns /> },
  { name: 'AdminCoordinatorAttempts', component: <AdminCoordinatorAttempts /> },
  { name: 'AdminCoordinatorMarks', component: <AdminCoordinatorMarks /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'OrganizationManagerAccesses', component: <OrganizationManagerAccesses /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SetupEmail', component: <SetupEmail /> },
  { name: 'SystemCalculatesTotal', component: <SystemCalculatesTotal /> },
  { name: 'SystemFlagsInactive', component: <SystemFlagsInactive /> },
  { name: 'SystemIdentifiesTop', component: <SystemIdentifiesTop /> },
  { name: 'VolunteerSubmitsRegistration', component: <VolunteerSubmitsRegistration /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Volunteer Management Portal</strong>
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
