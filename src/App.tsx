import React, { useState } from 'react'
import ClaimOver from './components/ClaimOver.tsx'
import ClaimsAdjustersMust from './components/ClaimsAdjustersMust.tsx'
import ClaimsAreRouted from './components/ClaimsAreRouted.tsx'
import EmailNotificationsAre from './components/EmailNotificationsAre.tsx'
import IncidentDateMust from './components/IncidentDateMust.tsx'
import OnlyClaimsManagers from './components/OnlyClaimsManagers.tsx'
import TotalClaimsSubmitted from './components/TotalClaimsSubmitted.tsx'
import UserSubmitsA from './components/UserSubmitsA.tsx'

const screens = [
  { name: 'ClaimOver', component: <ClaimOver /> },
  { name: 'ClaimsAdjustersMust', component: <ClaimsAdjustersMust /> },
  { name: 'ClaimsAreRouted', component: <ClaimsAreRouted /> },
  { name: 'EmailNotificationsAre', component: <EmailNotificationsAre /> },
  { name: 'IncidentDateMust', component: <IncidentDateMust /> },
  { name: 'OnlyClaimsManagers', component: <OnlyClaimsManagers /> },
  { name: 'TotalClaimsSubmitted', component: <TotalClaimsSubmitted /> },
  { name: 'UserSubmitsA', component: <UserSubmitsA /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Insurance Claims Portal - Motor Vehicle Claims Management System</strong>
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
