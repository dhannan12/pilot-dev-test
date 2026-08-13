import React, { useState } from 'react'
import BuildDashboardScreen from './components/BuildDashboardScreen.tsx'
import BuildMilestoneManagement from './components/BuildMilestoneManagement.tsx'
import BuildTaskDetails from './components/BuildTaskDetails.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import ProjectRack from './components/ProjectRack.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import TaskIs from './components/TaskIs.tsx'
import TeamReceive from './components/TeamReceive.tsx'
import UserCompletes from './components/UserCompletes.tsx'
import UserCreates from './components/UserCreates.tsx'
import UserHas from './components/UserHas.tsx'
import UserWants from './components/UserWants.tsx'

const screens = [
  { name: 'BuildDashboardScreen', component: <BuildDashboardScreen /> },
  { name: 'BuildMilestoneManagement', component: <BuildMilestoneManagement /> },
  { name: 'BuildTaskDetails', component: <BuildTaskDetails /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'ProjectRack', component: <ProjectRack /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'TaskIs', component: <TaskIs /> },
  { name: 'TeamReceive', component: <TeamReceive /> },
  { name: 'UserCompletes', component: <UserCompletes /> },
  { name: 'UserCreates', component: <UserCreates /> },
  { name: 'UserHas', component: <UserHas /> },
  { name: 'UserWants', component: <UserWants /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>TaskApp - Team Task Management Application</strong>
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
