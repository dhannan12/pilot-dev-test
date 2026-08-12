import React, { useState } from 'react'
import BuildAppointmentCalendar.test from './components/BuildAppointmentCalendar.test.tsx'
import BuildAppointmentCalendar from './components/BuildAppointmentCalendar.tsx'
import BuildBookingPage.test from './components/BuildBookingPage.test.tsx'
import BuildBookingPage from './components/BuildBookingPage.tsx'
import BuildStylistProfile.test from './components/BuildStylistProfile.test.tsx'
import BuildStylistProfile from './components/BuildStylistProfile.tsx'
import ConfigurePipeline.test from './components/ConfigurePipeline.test.tsx'
import ConfigurePipeline from './components/ConfigurePipeline.tsx'
import CreateDatabaseSchema.test from './components/CreateDatabaseSchema.test.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import EasilyBook.test from './components/EasilyBook.test.tsx'
import EasilyBook from './components/EasilyBook.tsx'
import ManageMy.test from './components/ManageMy.test.tsx'
import ManageMy from './components/ManageMy.tsx'
import SalonImplement.test from './components/SalonImplement.test.tsx'
import SalonImplement from './components/SalonImplement.tsx'
import SetUpAuthentication.test from './components/SetUpAuthentication.test.tsx'
import SetUpAuthentication from './components/SetUpAuthentication.tsx'

const screens = [
  { name: 'BuildAppointmentCalendar.test', component: <BuildAppointmentCalendar.test /> },
  { name: 'BuildAppointmentCalendar', component: <BuildAppointmentCalendar /> },
  { name: 'BuildBookingPage.test', component: <BuildBookingPage.test /> },
  { name: 'BuildBookingPage', component: <BuildBookingPage /> },
  { name: 'BuildStylistProfile.test', component: <BuildStylistProfile.test /> },
  { name: 'BuildStylistProfile', component: <BuildStylistProfile /> },
  { name: 'ConfigurePipeline.test', component: <ConfigurePipeline.test /> },
  { name: 'ConfigurePipeline', component: <ConfigurePipeline /> },
  { name: 'CreateDatabaseSchema.test', component: <CreateDatabaseSchema.test /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'EasilyBook.test', component: <EasilyBook.test /> },
  { name: 'EasilyBook', component: <EasilyBook /> },
  { name: 'ManageMy.test', component: <ManageMy.test /> },
  { name: 'ManageMy', component: <ManageMy /> },
  { name: 'SalonImplement.test', component: <SalonImplement.test /> },
  { name: 'SalonImplement', component: <SalonImplement /> },
  { name: 'SetUpAuthentication.test', component: <SetUpAuthentication.test /> },
  { name: 'SetUpAuthentication', component: <SetUpAuthentication /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>HairSaloon Online Booking System</strong>
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
