import React, { useState } from 'react'
import CreateDatabase from './components/CreateDatabase.tsx'
import CreateRest from './components/CreateRest.tsx'
import HiringPost from './components/HiringPost.tsx'
import HiringReview from './components/HiringReview.tsx'
import Implement from './components/Implement.tsx'
import NBrowse from './components/NBrowse.tsx'
import NHrBusiness from './components/NHrBusiness.tsx'
import NSubmit from './components/NSubmit.tsx'
import SetupEmail from './components/SetupEmail.tsx'
import TestingAnd from './components/TestingAnd.tsx'
import WorkforcePlanningTeam from './components/WorkforcePlanningTeam.tsx'

const screens = [
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'CreateRest', component: <CreateRest /> },
  { name: 'HiringPost', component: <HiringPost /> },
  { name: 'HiringReview', component: <HiringReview /> },
  { name: 'Implement', component: <Implement /> },
  { name: 'NBrowse', component: <NBrowse /> },
  { name: 'NHrBusiness', component: <NHrBusiness /> },
  { name: 'NSubmit', component: <NSubmit /> },
  { name: 'SetupEmail', component: <SetupEmail /> },
  { name: 'TestingAnd', component: <TestingAnd /> },
  { name: 'WorkforcePlanningTeam', component: <WorkforcePlanningTeam /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Internal Job Postings Portal</strong>
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
