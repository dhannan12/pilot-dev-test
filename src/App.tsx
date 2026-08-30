import React, { useState } from 'react'
import FeedbackIsProvided from './components/FeedbackIsProvided.tsx'
import InteractiveExercisesAre from './components/InteractiveExercisesAre.tsx'
import NotificationsAreSent from './components/NotificationsAreSent.tsx'
import OnlyTeachersCan from './components/OnlyTeachersCan.tsx'
import PuzzlesEnhanceStudent from './components/PuzzlesEnhanceStudent.tsx'
import SetupAuthentication from './components/SetupAuthentication.tsx'
import SetupDatabase from './components/SetupDatabase.tsx'
import TotalScoreIs from './components/TotalScoreIs.tsx'
import TrainingMaterialsAre from './components/TrainingMaterialsAre.tsx'
import UserCanTrack from './components/UserCanTrack.tsx'

const screens = [
  { name: 'FeedbackIsProvided', component: <FeedbackIsProvided /> },
  { name: 'InteractiveExercisesAre', component: <InteractiveExercisesAre /> },
  { name: 'NotificationsAreSent', component: <NotificationsAreSent /> },
  { name: 'OnlyTeachersCan', component: <OnlyTeachersCan /> },
  { name: 'PuzzlesEnhanceStudent', component: <PuzzlesEnhanceStudent /> },
  { name: 'SetupAuthentication', component: <SetupAuthentication /> },
  { name: 'SetupDatabase', component: <SetupDatabase /> },
  { name: 'TotalScoreIs', component: <TotalScoreIs /> },
  { name: 'TrainingMaterialsAre', component: <TrainingMaterialsAre /> },
  { name: 'UserCanTrack', component: <UserCanTrack /> },
]

export default function App() {
  const [active, setActive] = useState(0)
  return (
    <div className="min-h-screen" style={{background:"#f9fafb"}}>
      <header style={{borderBottom:"1px solid #e5e7eb",padding:"12px 24px",
        display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <strong style={{marginRight:"16px"}}>MathsApp</strong>
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
