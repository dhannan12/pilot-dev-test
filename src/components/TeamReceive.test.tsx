import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeamReceive from './TeamReceive'

describe('TeamReceive', () => {
  it('renders without crashing', () => {
    render(<TeamReceive />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<TeamReceive />)
    expect(screen.getByText('My Task Reminders')).toBeTruthy()
  })

  it('displays mock task data', () => {
    render(<TeamReceive />)
    expect(screen.getByText('Complete quarterly report')).toBeTruthy()
    expect(screen.getByText('Review pull requests')).toBeTruthy()
    expect(screen.getByText('Update documentation')).toBeTruthy()
  })

  it('shows priority badges for tasks', () => {
    render(<TeamReceive />)
    const highPriorityBadges = screen.getAllByText('HIGH')
    expect(highPriorityBadges.length).toBeGreaterThan(0)
  })

  it('displays reminder indicators', () => {
    render(<TeamReceive />)
    const reminderElements = screen.getAllByText('Reminder sent')
    expect(reminderElements.length).toBeGreaterThan(0)
  })

  it('shows statistics cards', () => {
    render(<TeamReceive />)
    expect(screen.getByText('Active Tasks')).toBeTruthy()
    expect(screen.getByText('High Priority')).toBeTruthy()
    expect(screen.getByText('Due Soon')).toBeTruthy()
    expect(screen.getByText('Reminders Sent')).toBeTruthy()
  })

  it('displays assigned team member names', () => {
    render(<TeamReceive />)
    const assignedElements = screen.getAllByText(/Sarah Johnson/)
    expect(assignedElements.length).toBeGreaterThan(0)
  })
})
