import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TaskIs from './TaskIs'

describe('TaskIs', () => {
  it('renders without crashing', () => {
    render(<TaskIs />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<TaskIs />)
    expect(screen.getByText('Task Notifications')).toBeTruthy()
    expect(screen.getByText('Tasks due within the next 48 hours')).toBeTruthy()
  })

  it('displays mock task data', () => {
    render(<TaskIs />)
    expect(screen.getByText('Complete quarterly financial report')).toBeTruthy()
    expect(screen.getByText('Update customer database')).toBeTruthy()
    expect(screen.getByText('Deploy security patches')).toBeTruthy()
  })

  it('shows filter buttons for all, 24h, and 48h', () => {
    render(<TaskIs />)
    const allButton = screen.getByRole('button', { name: /All Tasks/ })
    const filter24h = screen.getByRole('button', { name: /Due in 24h/ })
    const filter48h = screen.getByRole('button', { name: /Due in 48h/ })
    expect(allButton).toBeTruthy()
    expect(filter24h).toBeTruthy()
    expect(filter48h).toBeTruthy()
  })

  it('displays task assignees', () => {
    render(<TaskIs />)
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Mike Johnson')).toBeTruthy()
    expect(screen.getByText('Alex Rodriguez')).toBeTruthy()
  })

  it('shows priority badges', () => {
    render(<TaskIs />)
    const highPriority = screen.getAllByText('HIGH')
    expect(highPriority.length).toBeGreaterThan(0)
  })

  it('displays status badges', () => {
    render(<TaskIs />)
    const inProgress = screen.getAllByText('IN PROGRESS')
    expect(inProgress.length).toBeGreaterThan(0)
  })

  it('can filter tasks by 24h', () => {
    render(<TaskIs />)
    const filter24hButton = screen.getByRole('button', { name: /Due in 24h/ })
    fireEvent.click(filter24hButton)
    // The component should still render after filtering
    expect(screen.getByText('Task Notifications')).toBeTruthy()
  })

  it('can filter tasks by 48h', () => {
    render(<TaskIs />)
    const filter48hButton = screen.getByRole('button', { name: /Due in 48h/ })
    fireEvent.click(filter48hButton)
    // The component should still render after filtering
    expect(screen.getByText('Task Notifications')).toBeTruthy()
  })

  it('displays action buttons', () => {
    render(<TaskIs />)
    const viewDetailsButtons = screen.getAllByText('View Details')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    const markCompleteButtons = screen.getAllByText('Mark Complete')
    expect(markCompleteButtons.length).toBeGreaterThan(0)
  })

  it('shows task count summary', () => {
    render(<TaskIs />)
    expect(screen.getByText(/tasks due within 48 hours/)).toBeTruthy()
  })

  it('displays urgent task notification banner', () => {
    render(<TaskIs />)
    const urgentNotifications = screen.getAllByText(/Immediate action required/)
    expect(urgentNotifications.length).toBeGreaterThan(0)
  })

  it('can dismiss individual task notifications', () => {
    render(<TaskIs />)
    const dismissButtons = screen.getAllByText('Dismiss')
    if (dismissButtons.length > 0) {
      fireEvent.click(dismissButtons[0])
      // Component should still render after dismissing
      expect(screen.getByText('Task Notifications')).toBeTruthy()
    }
  })
})
