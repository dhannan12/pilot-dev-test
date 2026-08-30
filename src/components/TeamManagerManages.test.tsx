import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeamManagerManages from './TeamManagerManages'

describe('TeamManagerManages', () => {
  it('renders without crashing', () => {
    render(<TeamManagerManages />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<TeamManagerManages />)
    // Check for team member names
    expect(screen.getByText('Alex Rodriguez')).toBeTruthy()
    expect(screen.getByText('Jamie Chen')).toBeTruthy()
    expect(screen.getByText('Sam Taylor')).toBeTruthy()
    expect(screen.getByText('Morgan Blake')).toBeTruthy()
    expect(screen.getByText('Casey Johnson')).toBeTruthy()
    
    // Check for positions (multiple instances exist, so use getAllByText)
    expect(screen.getAllByText('Forward').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Midfielder').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Defender').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Goalkeeper').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<TeamManagerManages />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="teammanagermanages"]')
    expect(mainWrapper).toBeTruthy()
    
    // Add button
    const addButton = document.querySelector('[data-testid="teammanagermanages-add"]')
    expect(addButton).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="teammanagermanages-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items (should have multiple)
    const listItems = document.querySelectorAll('[data-testid="teammanagermanages-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Edit and remove buttons
    const editButtons = document.querySelectorAll('[data-testid="teammanagermanages-edit"]')
    expect(editButtons.length).toBeGreaterThan(0)
    
    const removeButtons = document.querySelectorAll('[data-testid="teammanagermanages-remove"]')
    expect(removeButtons.length).toBeGreaterThan(0)
  })

  it('displays team roster with correct count', () => {
    render(<TeamManagerManages />)
    expect(screen.getByText(/Current Roster \(7 members\)/)).toBeTruthy()
  })
})
