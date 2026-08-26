import React, { useState } from 'react'
import EloRatingsAre from './components/EloRatingsAre.tsx'
import ImplementPushNotification from './components/ImplementPushNotification.tsx'
import MatchesMustBe from './components/MatchesMustBe.tsx'
import OnlyTournamentOrganizers from './components/OnlyTournamentOrganizers.tsx'
import PlayersAreNotified from './components/PlayersAreNotified.tsx'
import PlayersMustComplete from './components/PlayersMustComplete.tsx'
import PlayersMustHave from './components/PlayersMustHave.tsx'
import RegisteredPlayersCan from './components/RegisteredPlayersCan.tsx'
import SetupAuthenticationAnd from './components/SetupAuthenticationAnd.tsx'
import SetupDatabaseSchema from './components/SetupDatabaseSchema.tsx'
import WillBe from './components/WillBe.tsx'

const screens = [
  { name: 'EloRatingsAre', component: <EloRatingsAre /> },
  { name: 'ImplementPushNotification', component: <ImplementPushNotification /> },
  { name: 'MatchesMustBe', component: <MatchesMustBe /> },
  { name: 'OnlyTournamentOrganizers', component: <OnlyTournamentOrganizers /> },
  { name: 'PlayersAreNotified', component: <PlayersAreNotified /> },
  { name: 'PlayersMustComplete', component: <PlayersMustComplete /> },
  { name: 'PlayersMustHave', component: <PlayersMustHave /> },
  { name: 'RegisteredPlayersCan', component: <RegisteredPlayersCan /> },
  { name: 'SetupAuthenticationAnd', component: <SetupAuthenticationAnd /> },
  { name: 'SetupDatabaseSchema', component: <SetupDatabaseSchema /> },
  { name: 'WillBe', component: <WillBe /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>ChessToournament</strong>
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
