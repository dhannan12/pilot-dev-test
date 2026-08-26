import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlayersMustComplete from './PlayersMustComplete'

describe('PlayersMustComplete', () => {
  it('renders without crashing', () => {
    render(<PlayersMustComplete />)
    expect(document.body).toBeTruthy()
  })

  it('displays the tournament registration deadline header', () => {
    render(<PlayersMustComplete />)
    expect(screen.getByText(/Tournament Registration Deadline/i)).toBeTruthy()
    expect(screen.getByText(/All players must complete registration before the deadline/i)).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<PlayersMustComplete />)
    expect(screen.getByText('Magnus Carlsen')).toBeTruthy()
    expect(screen.getByText('Hikaru Nakamura')).toBeTruthy()
    expect(screen.getByText('Fabiano Caruana')).toBeTruthy()
    expect(screen.getByText('Ding Liren')).toBeTruthy()
    expect(screen.getByText('Ian Nepomniachtchi')).toBeTruthy()
  })

  it('shows registration progress statistics', () => {
    render(<PlayersMustComplete />)
    expect(screen.getByText(/Registration Progress/i)).toBeTruthy()
    const completedElements = screen.getAllByText(/Completed/i)
    expect(completedElements.length).toBeGreaterThan(0)
    const incompleteElements = screen.getAllByText(/Incomplete/i)
    expect(incompleteElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Completion Rate/i)).toBeTruthy()
  })

  it('displays player registration status', () => {
    render(<PlayersMustComplete />)
    expect(screen.getByText(/Player Registration Status/i)).toBeTruthy()
    const completeStatuses = screen.getAllByText(/Complete/i)
    const incompleteStatuses = screen.getAllByText(/Incomplete/i)
    expect(completeStatuses.length).toBeGreaterThan(0)
    expect(incompleteStatuses.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<PlayersMustComplete />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="playersmustcomplete"]')).toBeTruthy()
    
    // Filter buttons
    expect(document.querySelector('[data-testid="playersmustcomplete-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="playersmustcomplete-filter-complete"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="playersmustcomplete-filter-incomplete"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="playersmustcomplete-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="playersmustcomplete-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Remind buttons
    const remindButtons = document.querySelectorAll('[data-testid="playersmustcomplete-remind"]')
    expect(remindButtons.length).toBeGreaterThan(0)
  })

  it('displays deadline information', () => {
    render(<PlayersMustComplete />)
    const deadlineElements = screen.getAllByText(/Deadline/i)
    expect(deadlineElements.length).toBeGreaterThan(0)
    const remainingElements = screen.getAllByText(/remaining/i)
    expect(remainingElements.length).toBeGreaterThan(0)
  })

  it('shows action required alert for incomplete registrations', () => {
    render(<PlayersMustComplete />)
    const actionElements = screen.getAllByText(/Action Required/i)
    expect(actionElements.length).toBeGreaterThan(0)
    const notCompletedElements = screen.getAllByText(/not completed registration/i)
    expect(notCompletedElements.length).toBeGreaterThan(0)
  })
})
