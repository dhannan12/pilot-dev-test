import React, { useState } from 'react'
import AuthenticationAndRbac from './components/AuthenticationAndRbac.tsx'
import ClaimsCannotBe from './components/ClaimsCannotBe.tsx'
import ClaimsExceedingA from './components/ClaimsExceedingA.tsx'
import ClaimsMustBe from './components/ClaimsMustBe.tsx'
import DatabaseSchemaSetup from './components/DatabaseSchemaSetup.tsx'
import OnlyFinanceApprovers from './components/OnlyFinanceApprovers.tsx'
import PendingClaimsRequire from './components/PendingClaimsRequire.tsx'
import TotalClaimValue from './components/TotalClaimValue.tsx'

const screens = [
  { name: 'AuthenticationAndRbac', component: <AuthenticationAndRbac /> },
  { name: 'ClaimsCannotBe', component: <ClaimsCannotBe /> },
  { name: 'ClaimsExceedingA', component: <ClaimsExceedingA /> },
  { name: 'ClaimsMustBe', component: <ClaimsMustBe /> },
  { name: 'DatabaseSchemaSetup', component: <DatabaseSchemaSetup /> },
  { name: 'OnlyFinanceApprovers', component: <OnlyFinanceApprovers /> },
  { name: 'PendingClaimsRequire', component: <PendingClaimsRequire /> },
  { name: 'TotalClaimValue', component: <TotalClaimValue /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Claims Management System</strong>
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
