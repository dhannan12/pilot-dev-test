import React, { useState } from 'react'
import ArtistManagersVerify from './components/ArtistManagersVerify.tsx'
import CalculateTotalRoyalties from './components/CalculateTotalRoyalties.tsx'
import MusicEnthusiastsAccess from './components/MusicEnthusiastsAccess.tsx'
import MusicPublishersManage from './components/MusicPublishersManage.tsx'
import MusicResearchersAccess from './components/MusicResearchersAccess.tsx'
import MusicResearchersExport from './components/MusicResearchersExport.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupProjectStructure from './components/SetupProjectStructure.tsx'
import UsersFilterMusic from './components/UsersFilterMusic.tsx'

const screens = [
  { name: 'ArtistManagersVerify', component: <ArtistManagersVerify /> },
  { name: 'CalculateTotalRoyalties', component: <CalculateTotalRoyalties /> },
  { name: 'MusicEnthusiastsAccess', component: <MusicEnthusiastsAccess /> },
  { name: 'MusicPublishersManage', component: <MusicPublishersManage /> },
  { name: 'MusicResearchersAccess', component: <MusicResearchersAccess /> },
  { name: 'MusicResearchersExport', component: <MusicResearchersExport /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupProjectStructure', component: <SetupProjectStructure /> },
  { name: 'UsersFilterMusic', component: <UsersFilterMusic /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>MusicCatalog</strong>
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
