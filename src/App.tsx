import React, { useState } from 'react'
import ApprovalWorkflow from './components/ApprovalWorkflow.tsx'
import AuditTrail from './components/AuditTrail.tsx'
import CommentsAnd from './components/CommentsAnd.tsx'
import ComplianceView from './components/ComplianceView.tsx'
import CreateAudit from './components/CreateAudit.tsx'
import CreateCore from './components/CreateCore.tsx'
import DocumentUpload from './components/DocumentUpload.tsx'
import DocumentViewer from './components/DocumentViewer.tsx'
import LegalAdd from './components/LegalAdd.tsx'
import LegalTeam from './components/LegalTeam.tsx'
import LegalUpload from './components/LegalUpload.tsx'
import Pipeline from './components/Pipeline.tsx'
import SetupRbac from './components/SetupRbac.tsx'

const screens = [
  { name: 'ApprovalWorkflow', component: <ApprovalWorkflow /> },
  { name: 'AuditTrail', component: <AuditTrail /> },
  { name: 'CommentsAnd', component: <CommentsAnd /> },
  { name: 'ComplianceView', component: <ComplianceView /> },
  { name: 'CreateAudit', component: <CreateAudit /> },
  { name: 'CreateCore', component: <CreateCore /> },
  { name: 'DocumentUpload', component: <DocumentUpload /> },
  { name: 'DocumentViewer', component: <DocumentViewer /> },
  { name: 'LegalAdd', component: <LegalAdd /> },
  { name: 'LegalTeam', component: <LegalTeam /> },
  { name: 'LegalUpload', component: <LegalUpload /> },
  { name: 'Pipeline', component: <Pipeline /> },
  { name: 'SetupRbac', component: <SetupRbac /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>LegalReview Document Management System</strong>
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
