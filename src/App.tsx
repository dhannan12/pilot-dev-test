import React, { useState } from 'react'
import CalculateTheTotal from './components/CalculateTheTotal.tsx'
import DailyMenuDisplay from './components/DailyMenuDisplay.tsx'
import KitchenStaffConfirm from './components/KitchenStaffConfirm.tsx'
import OnlyCateringManagers from './components/OnlyCateringManagers.tsx'
import ParentsAreRedirected from './components/ParentsAreRedirected.tsx'
import ParentsTopUp from './components/ParentsTopUp.tsx'
import StudentsAccessThe from './components/StudentsAccessThe.tsx'
import StudentsSelectItems from './components/StudentsSelectItems.tsx'
import StudentsSubmitOrders from './components/StudentsSubmitOrders.tsx'

const screens = [
  { name: 'CalculateTheTotal', component: <CalculateTheTotal /> },
  { name: 'DailyMenuDisplay', component: <DailyMenuDisplay /> },
  { name: 'KitchenStaffConfirm', component: <KitchenStaffConfirm /> },
  { name: 'OnlyCateringManagers', component: <OnlyCateringManagers /> },
  { name: 'ParentsAreRedirected', component: <ParentsAreRedirected /> },
  { name: 'ParentsTopUp', component: <ParentsTopUp /> },
  { name: 'StudentsAccessThe', component: <StudentsAccessThe /> },
  { name: 'StudentsSelectItems', component: <StudentsSelectItems /> },
  { name: 'StudentsSubmitOrders', component: <StudentsSubmitOrders /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>School Canteen Pre-Order System</strong>
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
