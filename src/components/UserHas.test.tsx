import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserHas from './UserHas'

describe('UserHas', () => {
  it('renders without crashing', () => {
    render(<UserHas />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<UserHas />)
    expect(screen.getByText('My Tasks')).toBeTruthy()
  })

  it('displays priority sections', () => {
    render(<UserHas />)
    // Check for priority badges
    const priorityElements = screen.getAllByText(/Priority/i)
    expect(priorityElements.length).toBeGreaterThan(0)
    // Check that all three priority levels are present
    expect(screen.getByText('high')).toBeTruthy()
    expect(screen.getByText('medium')).toBeTruthy()
    expect(screen.getByText('low')).toBeTruthy()
  })

  it('displays mock task data', () => {
    render(<UserHas />)
    expect(screen.getByText('Fix critical production bug')).toBeTruthy()
    expect(screen.getByText('Update API documentation')).toBeTruthy()
    expect(screen.getByText('Implement dark mode')).toBeTruthy()
  })

  it('shows blocked status for medium/low priority when high priority tasks exist', () => {
    render(<UserHas />)
    const blockedMessages = screen.getAllByText(/Blocked by/i)
    expect(blockedMessages.length).toBeGreaterThan(0)
  })

  it('displays task descriptions', () => {
    render(<UserHas />)
    expect(screen.getByText(/Memory leak causing server crashes/i)).toBeTruthy()
    expect(screen.getByText(/Document new endpoints/i)).toBeTruthy()
  })

  it('shows completed status for completed tasks', () => {
    render(<UserHas />)
    const completedLabels = screen.getAllByText(/✓ Completed/i)
    expect(completedLabels.length).toBeGreaterThanOrEqual(1)
  })

  it('displays priority rules information', () => {
    render(<UserHas />)
    expect(screen.getByText('Task Priority Rules')).toBeTruthy()
    expect(screen.getByText(/Critical tasks that must be completed first/i)).toBeTruthy()
  })
})
