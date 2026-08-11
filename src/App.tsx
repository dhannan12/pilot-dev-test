import React, { useState } from 'react'
import BuildDishDetails from './components/BuildDishDetails.tsx'
import BuildMenuPage from './components/BuildMenuPage.tsx'
import BuildReservationForm from './components/BuildReservationForm.tsx'
import CalculateThe from './components/CalculateThe.tsx'
import Component from './components/Component.tsx'
import ConfirmationOf from './components/ConfirmationOf.tsx'
import CreateDatabaseSchema from './components/CreateDatabaseSchema.tsx'
import EachDish from './components/EachDish.tsx'
import Highlight from './components/Highlight.tsx'
import MenuMust from './components/MenuMust.tsx'
import NewDishes from './components/NewDishes.tsx'
import ReservationForm from './components/ReservationForm.tsx'
import RestaurantUpdate from './components/RestaurantUpdate.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupEmailService from './components/SetupEmailService.tsx'

const screens = [
  { name: 'BuildDishDetails', component: <BuildDishDetails /> },
  { name: 'BuildMenuPage', component: <BuildMenuPage /> },
  { name: 'BuildReservationForm', component: <BuildReservationForm /> },
  { name: 'CalculateThe', component: <CalculateThe /> },
  { name: 'Component', component: <Component /> },
  { name: 'ConfirmationOf', component: <ConfirmationOf /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'EachDish', component: <EachDish /> },
  { name: 'Highlight', component: <Highlight /> },
  { name: 'MenuMust', component: <MenuMust /> },
  { name: 'NewDishes', component: <NewDishes /> },
  { name: 'ReservationForm', component: <ReservationForm /> },
  { name: 'RestaurantUpdate', component: <RestaurantUpdate /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupEmailService', component: <SetupEmailService /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Restaurant Menu Page - Italian Cuisine Digital Interface</strong>
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
