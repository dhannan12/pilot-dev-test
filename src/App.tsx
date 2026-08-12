import React, { useState } from 'react'
import BuildAppointmentCalendar from './components/BuildAppointmentCalendar.tsx'
import BuildBookingPage from './components/BuildBookingPage.tsx'
import BuildStylistProfile from './components/BuildStylistProfile.tsx'
import ConfigurePipeline from './components/ConfigurePipeline.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import EasilyBook from './components/EasilyBook.tsx'
import ManageMy from './components/ManageMy.tsx'
import SalonImplement from './components/SalonImplement.tsx'
import SetUpAuthentication from './components/SetUpAuthentication.tsx'

const screens = [
  { name: 'BuildAppointmentCalendar', component: <BuildAppointmentCalendar /> },
  { name: 'BuildBookingPage', component: <BuildBookingPage /> },
  { name: 'BuildStylistProfile', component: <BuildStylistProfile /> },
  { name: 'ConfigurePipeline', component: <ConfigurePipeline /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'EasilyBook', component: <EasilyBook /> },
  { name: 'ManageMy', component: <ManageMy /> },
  { name: 'SalonImplement', component: <SalonImplement /> },
  { name: 'SetUpAuthentication', component: <SetUpAuthentication /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>💇 Hair Salon Booking System</strong>
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
