import React, { useState } from 'react'
import AdminTriesTo from './components/AdminTriesTo.tsx'
import AdminUpdatesSeasonal from './components/AdminUpdatesSeasonal.tsx'
import CreateDatabase from './components/CreateDatabase.tsx'
import RegisteredUsersShould from './components/RegisteredUsersShould.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupProjectEnvironment from './components/SetupProjectEnvironment.tsx'
import UserAttemptsTo from './components/UserAttemptsTo.tsx'
import UserMakesA from './components/UserMakesA.tsx'
import UserNavigates from './components/UserNavigates.tsx'
import UserWithLow from './components/UserWithLow.tsx'
import VisitorAccesses from './components/VisitorAccesses.tsx'

const screens = [
  { name: 'AdminTriesTo', component: <AdminTriesTo /> },
  { name: 'AdminUpdatesSeasonal', component: <AdminUpdatesSeasonal /> },
  { name: 'CreateDatabase', component: <CreateDatabase /> },
  { name: 'RegisteredUsersShould', component: <RegisteredUsersShould /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupProjectEnvironment', component: <SetupProjectEnvironment /> },
  { name: 'UserAttemptsTo', component: <UserAttemptsTo /> },
  { name: 'UserMakesA', component: <UserMakesA /> },
  { name: 'UserNavigates', component: <UserNavigates /> },
  { name: 'UserWithLow', component: <UserWithLow /> },
  { name: 'VisitorAccesses', component: <VisitorAccesses /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>Coffee Shop Website with Customer Rewards Program</strong>
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
