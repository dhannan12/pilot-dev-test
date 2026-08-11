import React, { useState } from 'react'


const screens = [

]

export default function App() {
  const [active, setActive] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-3 flex items-center gap-4">
        <h1 className="text-lg font-bold">Restaurant Menu Page - Italian Cuisine Digital Interface</h1>
        <nav className="flex gap-2 ml-4 flex-wrap">
          {screens.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`text-xs px-3 py-1 rounded border transition-colors ${
                active === i ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground'
              }`}>
              {s.name}
            </button>
          ))}
        </nav>
      </header>
      <main className="p-6">
        {screens[active]?.component}
      </main>
    </div>
  )
}
