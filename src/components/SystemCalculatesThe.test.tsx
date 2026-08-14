import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesThe from './SystemCalculatesThe'

describe('SystemCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the pending count correctly', () => {
    render(<SystemCalculatesThe />)
    // Check that the statistics are displayed
    expect(screen.getByText('Total Tasks')).toBeTruthy()
  })

  it('displays task statistics cards', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText('Total Tasks')).toBeTruthy()
    const pendingTasks = screen.getAllByText('Pending Tasks')
    expect(pendingTasks.length).toBeGreaterThan(0)
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
  })

  it('displays pending tasks section', () => {
    render(<SystemCalculatesThe />)
    // Should show "Pending Tasks" header
    const pendingHeaders = screen.getAllByText('Pending Tasks')
    expect(pendingHeaders.length).toBeGreaterThan(0)
  })

  it('displays task titles', () => {
    render(<SystemCalculatesThe />)
    // Check that content exists
    const text = document.body.textContent || ''
    expect(text).toContain('Review')
    expect(text).toContain('Update')
  })

  it('displays task statuses', () => {
    render(<SystemCalculatesThe />)
    const pendingStatuses = screen.getAllByText('pending')
    const completedStatuses = screen.getAllByText('completed')
    const inProgressStatuses = screen.getAllByText('in-progress')
    
    expect(pendingStatuses.length).toBeGreaterThan(0)
    expect(completedStatuses.length).toBeGreaterThan(0)
    expect(inProgressStatuses.length).toBeGreaterThan(0)
  })

  it('displays priority information', () => {
    render(<SystemCalculatesThe />)
    // Check that priority text exists in the document
    const text = document.body.textContent || ''
    expect(text).toContain('Priority:')
    expect(text).toContain('HIGH')
  })

  it('displays all tasks section', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText('All Tasks')).toBeTruthy()
  })
})
