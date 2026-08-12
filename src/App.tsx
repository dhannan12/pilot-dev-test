import React, { useState } from 'react'
import MenuMust from './components/MenuMust'
import EachDish from './components/EachDish'
import RestaurantUpdate from './components/RestaurantUpdate'
import ReservationForm from './components/ReservationForm'
import ConfirmationOf from './components/ConfirmationOf'
import CalculateThe from './components/CalculateThe'
import Highlight from './components/Highlight'
import NewDishes from './components/NewDishes'
import Highlight from './components/Highlight'
import CreateDatabaseSchema from './components/CreateDatabaseSchema'
import BuildMenuPage from './components/BuildMenuPage'
import BuildReservationForm from './components/BuildReservationForm'
import BuildDishDetails from './components/BuildDishDetails'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd'
import SetupEmailService from './components/SetupEmailService'

const screens = [
  { name: 'MenuMust', component: <MenuMust /> },
  { name: 'EachDish', component: <EachDish /> },
  { name: 'RestaurantUpdate', component: <RestaurantUpdate /> },
  { name: 'ReservationForm', component: <ReservationForm /> },
  { name: 'ConfirmationOf', component: <ConfirmationOf /> },
  { name: 'CalculateThe', component: <CalculateThe /> },
  { name: 'Highlight', component: <Highlight /> },
  { name: 'NewDishes', component: <NewDishes /> },
  { name: 'Highlight', component: <Highlight /> },
  { name: 'CreateDatabaseSchema', component: <CreateDatabaseSchema /> },
  { name: 'BuildMenuPage', component: <BuildMenuPage /> },
  { name: 'BuildReservationForm', component: <BuildReservationForm /> },
  { name: 'BuildDishDetails', component: <BuildDishDetails /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupEmailService', component: <SetupEmailService /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div style={{minHeight:'100vh',fontFamily:'sans-serif',background:'#f9fafb'}}>
      <header style={{borderBottom:'1px solid #e5e7eb',padding:'12px 24px',display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
        <strong style={{marginRight:'16px'}}>🍽️ Restaurant Prototype</strong>
        {screens.map((s,i) => (
          <button key={i} onClick={()=>setActive(i)}
            style={{padding:'4px 12px',borderRadius:'6px',border:'1px solid',cursor:'pointer',
              background: active===i ? '#3b82f6' : 'white',
              color: active===i ? 'white' : '#374151',
              borderColor: active===i ? '#3b82f6' : '#d1d5db'}}>
            {s.name}
          </button>
        ))}
      </header>
      <main style={{padding:'24px'}}>
        {screens[active]?.component}
      </main>
    </div>
  )
}
