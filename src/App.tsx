import React, { useState } from 'react'
import CreateDatabase from './components/CreateDatabase.tsx'
import IntegratePayment from './components/IntegratePayment.tsx'
import SetupUser from './components/SetupUser.tsx'
import UserAccessesThe from './components/UserAccessesThe.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserChecksAllergen from './components/UserChecksAllergen.tsx'
import UserChecksFor from './components/UserChecksFor.tsx'
import UserChecksOrder from './components/UserChecksOrder.tsx'
import UserPlacesAn from './components/UserPlacesAn.tsx'
import UserReachesCheckout from './components/UserReachesCheckout.tsx'
import UserViewsMenu from './components/UserViewsMenu.tsx'
import UserWantsTo from './components/UserWantsTo.tsx'

const screens = [
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'IntegratePayment', component: <IntegratePayment /> },
  { name: 'SetupUser', component: <SetupUser /> },
  { name: 'UserAccessesThe', component: <UserAccessesThe /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserChecksAllergen', component: <UserChecksAllergen /> },
  { name: 'UserChecksFor', component: <UserChecksFor /> },
  { name: 'UserChecksOrder', component: <UserChecksOrder /> },
  { name: 'UserPlacesAn', component: <UserPlacesAn /> },
  { name: 'UserReachesCheckout', component: <UserReachesCheckout /> },
  { name: 'UserViewsMenu', component: <UserViewsMenu /> },
  { name: 'UserWantsTo', component: <UserWantsTo /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Chinese Restaurant Takeaway Menu Website</strong>
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
