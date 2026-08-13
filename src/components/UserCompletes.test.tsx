import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCompletes from './UserCompletes'

describe('UserCompletes', () => {
  it('renders without crashing', () => {
    render(<UserCompletes />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title and description', () => {
    render(<UserCompletes />)
    expect(screen.getByText('Design Task Feedback Tracker')).toBeTruthy()
    expect(screen.getByText(/Track completed design tasks and ensure feedback is submitted within 7 days/i)).toBeTruthy()
  })

  it('displays the feedback policy warning', () => {
    render(<UserCompletes />)
    expect(screen.getByText('Feedback Policy')).toBeTruthy()
    expect(screen.getByText(/All completed design tasks require user feedback within/i)).toBeTruthy()
  })

  it('displays statistics for overdue, pending, and submitted tasks', () => {
    render(<UserCompletes />)
    expect(screen.getByText('Overdue Tasks')).toBeTruthy()
    expect(screen.getByText('Pending Feedback')).toBeTruthy()
    expect(screen.getByText('Feedback Submitted')).toBeTruthy()
  })

  it('displays mock design tasks', () => {
    render(<UserCompletes />)
    expect(screen.getByText('Homepage Hero Section Redesign')).toBeTruthy()
    expect(screen.getByText('Mobile App Navigation Update')).toBeTruthy()
    expect(screen.getByText('Dashboard Analytics Widget')).toBeTruthy()
    expect(screen.getByText('Login Page Accessibility Improvements')).toBeTruthy()
    expect(screen.getByText('Product Card Component Redesign')).toBeTruthy()
  })

  it('displays designer names', () => {
    render(<UserCompletes />)
    expect(screen.getByText(/Sarah Chen/i)).toBeTruthy()
    expect(screen.getByText(/Michael Torres/i)).toBeTruthy()
    expect(screen.getByText(/Emily Johnson/i)).toBeTruthy()
  })

  it('displays category filters including "All Tasks"', () => {
    render(<UserCompletes />)
    expect(screen.getByText('All Tasks')).toBeTruthy()
    // Categories appear in both filter buttons and task badges, so use getAllByText
    expect(screen.getAllByText('Web Design').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mobile Design').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UI Design').length).toBeGreaterThan(0)
  })

  it('shows completed dates for tasks', () => {
    render(<UserCompletes />)
    // Check that completion dates are displayed
    const completedText = screen.getAllByText(/Completed:/i)
    expect(completedText.length).toBeGreaterThan(0)
  })

  it('displays feedback status messages', () => {
    render(<UserCompletes />)
    // Should show various feedback statuses
    const feedbackTexts = screen.getAllByText(/day/i)
    expect(feedbackTexts.length).toBeGreaterThan(0)
  })

  it('shows submit feedback buttons for pending and overdue tasks', () => {
    render(<UserCompletes />)
    const submitButtons = screen.getAllByRole('button', { name: /Submit Feedback/i })
    expect(submitButtons.length).toBeGreaterThan(0)
  })
})
