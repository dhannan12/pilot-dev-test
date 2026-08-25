import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TrainerAccessesPlayer from './TrainerAccessesPlayer'

describe('TrainerAccessesPlayer', () => {
  it('renders without crashing', () => {
    render(<TrainerAccessesPlayer />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<TrainerAccessesPlayer />)
    expect(screen.getByText('Marcus Silva')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Player Performance Dashboard')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<TrainerAccessesPlayer />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="traineraccessesplayer"]')).toBeTruthy()
    
    // Search input
    expect(document.querySelector('[data-testid="traineraccessesplayer-search"]')).toBeTruthy()
    
    // Position filter
    expect(document.querySelector('[data-testid="traineraccessesplayer-position"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="traineraccessesplayer-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="traineraccessesplayer-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // View detail buttons
    const viewButtons = document.querySelectorAll('[data-testid="traineraccessesplayer-view-detail"]')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays performance metrics for each player', () => {
    render(<TrainerAccessesPlayer />)
    
    // Check for metric labels
    const goalsLabels = screen.getAllByText('Goals')
    const assistsLabels = screen.getAllByText('Assists')
    const sessionsLabels = screen.getAllByText('Sessions')
    const fitnessLabels = screen.getAllByText('Fitness')
    
    expect(goalsLabels.length).toBeGreaterThan(0)
    expect(assistsLabels.length).toBeGreaterThan(0)
    expect(sessionsLabels.length).toBeGreaterThan(0)
    expect(fitnessLabels.length).toBeGreaterThan(0)
  })

  it('displays search and filter controls', () => {
    render(<TrainerAccessesPlayer />)
    
    expect(screen.getByText('Search Players')).toBeTruthy()
    expect(screen.getByText('Filter by Position')).toBeTruthy()
    expect(screen.getByPlaceholderText('Search by name...')).toBeTruthy()
  })
})
