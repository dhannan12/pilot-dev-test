import React, { useState } from 'react'
import BookingsCanOnly from './components/BookingsCanOnly.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import CustomerMustEnter from './components/CustomerMustEnter.tsx'
import CustomersCanOnly from './components/CustomersCanOnly.tsx'
import DailySummaryCount from './components/DailySummaryCount.tsx'
import EachBookingMust from './components/EachBookingMust.tsx'
import ImplementAuthentication from './components/ImplementAuthentication.tsx'
import OnlyTheSalon from './components/OnlyTheSalon.tsx'
import SetupEmail from './components/SetupEmail.tsx'
import SystemMustNotify from './components/SystemMustNotify.tsx'

const screens = [
  { name: 'BookingsCanOnly', component: <BookingsCanOnly /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'CustomerMustEnter', component: <CustomerMustEnter /> },
  { name: 'CustomersCanOnly', component: <CustomersCanOnly /> },
  { name: 'DailySummaryCount', component: <DailySummaryCount /> },
  { name: 'EachBookingMust', component: <EachBookingMust /> },
  { name: 'ImplementAuthentication', component: <ImplementAuthentication /> },
  { name: 'OnlyTheSalon', component: <OnlyTheSalon /> },
  { name: 'SetupEmail', component: <SetupEmail /> },
  { name: 'SystemMustNotify', component: <SystemMustNotify /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>OnlineBooking</strong>
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
