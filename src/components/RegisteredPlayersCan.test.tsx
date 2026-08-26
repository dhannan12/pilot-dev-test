import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredPlayersCan from './RegisteredPlayersCan'

describe('RegisteredPlayersCan', () => {
  it('renders without crashing', () => {
    render(<RegisteredPlayersCan />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<RegisteredPlayersCan />)
    expect(screen.getByText('Chess Tournament Dashboard')).toBeTruthy()
  })

  it('displays match schedule by default', () => {
    render(<RegisteredPlayersCan />)
    expect(screen.getByText('Upcoming Matches')).toBeTruthy()
    expect(screen.getByText('Recent Results')).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<RegisteredPlayersCan />)
    const magnusElements = screen.getAllByText('Magnus Carlsen')
    expect(magnusElements.length).toBeGreaterThan(0)
    const hikaruElements = screen.getAllByText('Hikaru Nakamura')
    expect(hikaruElements.length).toBeGreaterThan(0)
  })

  it('switches to standings tab when clicked', () => {
    render(<RegisteredPlayersCan />)
    const standingsTab = screen.getByTestId('registeredplayerscan-standings-tab')
    fireEvent.click(standingsTab)
    const standingsElements = screen.getAllByText('League Standings')
    expect(standingsElements.length).toBeGreaterThan(0)
  })

  it('displays mock standings data', () => {
    render(<RegisteredPlayersCan />)
    const standingsTab = screen.getByTestId('registeredplayerscan-standings-tab')
    fireEvent.click(standingsTab)
    const magnusElements = screen.getAllByText('Magnus Carlsen')
    expect(magnusElements.length).toBeGreaterThan(0)
    const fabianoElements = screen.getAllByText('Fabiano Caruana')
    expect(fabianoElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredPlayersCan />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="registeredplayerscan"]')).toBeTruthy()
    
    // Tab navigation
    expect(document.querySelector('[data-testid="registeredplayerscan-tabs"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-schedule-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-standings-tab"]')).toBeTruthy()
    
    // Schedule section
    expect(document.querySelector('[data-testid="registeredplayerscan-schedule-section"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-upcoming-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-match-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-view-match"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-completed-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-result-item"]')).toBeTruthy()
  })

  it('has standings table data-testid attributes', () => {
    render(<RegisteredPlayersCan />)
    const standingsTab = screen.getByTestId('registeredplayerscan-standings-tab')
    fireEvent.click(standingsTab)
    
    expect(document.querySelector('[data-testid="registeredplayerscan-standings-section"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-standings-table"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-standings-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredplayerscan-standing-item"]')).toBeTruthy()
  })
})
