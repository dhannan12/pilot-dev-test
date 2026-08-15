import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewEmployeeCompletes from './NewEmployeeCompletes'

describe('NewEmployeeCompletes', () => {
  it('renders without crashing', () => {
    render(<NewEmployeeCompletes />)
    expect(document.body).toBeTruthy()
  })

  it('displays the onboarding checklist header', () => {
    render(<NewEmployeeCompletes />)
    expect(screen.getByText(/Welcome to Your Onboarding Journey/i)).toBeTruthy()
  })

  it('displays mock checklist data', () => {
    render(<NewEmployeeCompletes />)
    expect(screen.getByText(/Complete Tax Forms/i)).toBeTruthy()
    expect(screen.getByText(/Set Up Direct Deposit/i)).toBeTruthy()
    expect(screen.getByText(/Complete Workplace Safety Training/i)).toBeTruthy()
    expect(screen.getByText(/Attend HR Orientation/i)).toBeTruthy()
    expect(screen.getByText(/Set Up Email and System Access/i)).toBeTruthy()
  })

  it('shows progress tracking', () => {
    render(<NewEmployeeCompletes />)
    expect(screen.getByText(/Progress/i)).toBeTruthy()
    const progressText = screen.getByText(/of \d+ completed/i)
    expect(progressText).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NewEmployeeCompletes />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="newemployeecompletes"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="newemployeecompletes-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="newemployeecompletes-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Filter buttons
    expect(document.querySelector('[data-testid="newemployeecompletes-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeecompletes-filter-paperwork"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeecompletes-filter-training"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeecompletes-filter-setup"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeecompletes-filter-orientation"]')).toBeTruthy()
    
    // Checkboxes
    expect(document.querySelector('[data-testid^="newemployeecompletes-checkbox"]')).toBeTruthy()
  })

  it('displays category filters', () => {
    render(<NewEmployeeCompletes />)
    expect(screen.getByTestId('newemployeecompletes-filter-all')).toBeTruthy()
    expect(screen.getByTestId('newemployeecompletes-filter-paperwork')).toBeTruthy()
    expect(screen.getByTestId('newemployeecompletes-filter-training')).toBeTruthy()
    expect(screen.getByTestId('newemployeecompletes-filter-setup')).toBeTruthy()
    expect(screen.getByTestId('newemployeecompletes-filter-orientation')).toBeTruthy()
  })

  it('displays due dates for tasks', () => {
    render(<NewEmployeeCompletes />)
    const dueDates = screen.getAllByText(/Due:/i)
    expect(dueDates.length).toBeGreaterThan(0)
  })

  it('shows completed status for items', () => {
    render(<NewEmployeeCompletes />)
    const completedBadges = screen.getAllByText(/COMPLETED/i)
    expect(completedBadges.length).toBeGreaterThan(0)
  })
})
