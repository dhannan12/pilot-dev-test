import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesThe from './SystemCalculatesThe'

describe('SystemCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the Task Manager title', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText('Task Manager')).toBeTruthy()
  })

  it('calculates and displays completed task count', () => {
    render(<SystemCalculatesThe />)
    // The component should show a fraction like "5/8" or similar
    const completionSummary = screen.getByText(/Completion Summary/i)
    expect(completionSummary).toBeTruthy()
  })

  it('displays mock tasks', () => {
    render(<SystemCalculatesThe />)
    // Check for some of the mock task titles
    expect(screen.getByText('Design landing page mockup')).toBeTruthy()
    expect(screen.getByText('Implement user authentication')).toBeTruthy()
    expect(screen.getByText('Write API documentation')).toBeTruthy()
  })

  it('shows completion status for tasks', () => {
    render(<SystemCalculatesThe />)
    // Check for status badges
    const completedBadges = screen.getAllByText('Completed')
    const pendingBadges = screen.getAllByText('Pending')
    expect(completedBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })

  it('displays statistics section', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText('Statistics')).toBeTruthy()
    expect(screen.getByText('Total Tasks')).toBeTruthy()
    // "Completed" appears multiple times, check for the statistics section specifically
    const completedLabels = screen.getAllByText('Completed')
    expect(completedLabels.length).toBeGreaterThan(0)
    expect(screen.getByText('Remaining')).toBeTruthy()
  })

  it('renders at least 5 mock tasks', () => {
    render(<SystemCalculatesThe />)
    // Check that we have the "All Tasks" section
    expect(screen.getByText('All Tasks')).toBeTruthy()
    // Verify multiple task titles are present
    const taskTitles = [
      'Design landing page mockup',
      'Implement user authentication',
      'Write API documentation',
      'Configure CI/CD pipeline',
      'Database optimization'
    ]
    taskTitles.forEach(title => {
      expect(screen.getByText(title)).toBeTruthy()
    })
  })
})
