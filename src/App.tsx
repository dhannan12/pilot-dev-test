import React, { useState } from 'react'
import BuildAbsence from './components/BuildAbsence.tsx'
import BuildSubmission from './components/BuildSubmission.tsx'
import Create from './components/Create.tsx'
import CreateGet from './components/CreateGet.tsx'
import CreatePost from './components/CreatePost.tsx'
import CreateStudents from './components/CreateStudents.tsx'
import ImplementRbac from './components/ImplementRbac.tsx'
import ReportMy from './components/ReportMy.tsx'
import SchoolReceive from './components/SchoolReceive.tsx'
import SendSubmission from './components/SendSubmission.tsx'
import SubmitAn from './components/SubmitAn.tsx'

const screens = [
  { name: 'BuildAbsence', component: <BuildAbsence /> },
  { name: 'BuildSubmission', component: <BuildSubmission /> },
  { name: 'Create', component: <Create /> },
  { name: 'CreateGet', component: <CreateGet /> },
  { name: 'CreatePost', component: <CreatePost /> },
  { name: 'CreateStudents', component: <CreateStudents /> },
  { name: 'ImplementRbac', component: <ImplementRbac /> },
  { name: 'ReportMy', component: <ReportMy /> },
  { name: 'SchoolReceive', component: <SchoolReceive /> },
  { name: 'SendSubmission', component: <SendSubmission /> },
  { name: 'SubmitAn', component: <SubmitAn /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>School Absence Reporting Form</strong>
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
