import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserRequestsScore from './UserRequestsScore'

describe('UserRequestsScore', () => {
  it('renders without crashing', () => {
    render(<UserRequestsScore />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UserRequestsScore />)
    
    // Check for component title
    expect(screen.getByText('Request Score Updates')).toBeTruthy()
    
    // Check for inactive matches (multiple instances exist, so use getAllByText)
    expect(screen.getAllByText(/Lakers vs Warriors/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Red Sox vs Yankees/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Manchester United vs Liverpool/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserRequestsScore />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="userrequestsscore"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-match"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-item"]')).toBeTruthy()
  })

  it('shows error when submitting without selecting match', () => {
    render(<UserRequestsScore />)
    
    const emailInput = screen.getByTestId('userrequestsscore-email') as HTMLInputElement
    const submitButton = screen.getByTestId('userrequestsscore-submit')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please select a match')).toBeTruthy()
  })

  it('shows error when submitting without email', () => {
    render(<UserRequestsScore />)
    
    const matchSelect = screen.getByTestId('userrequestsscore-match') as HTMLSelectElement
    const submitButton = screen.getByTestId('userrequestsscore-submit')
    
    fireEvent.change(matchSelect, { target: { value: 'm1' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please enter your email address')).toBeTruthy()
  })

  it('displays success message after valid submission', () => {
    render(<UserRequestsScore />)
    
    const matchSelect = screen.getByTestId('userrequestsscore-match') as HTMLSelectElement
    const emailInput = screen.getByTestId('userrequestsscore-email') as HTMLInputElement
    const submitButton = screen.getByTestId('userrequestsscore-submit')
    
    // Use m3 which doesn't have a pending request
    fireEvent.change(matchSelect, { target: { value: 'm3' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Score update request submitted successfully!')).toBeTruthy()
  })

  it('displays recent update requests', () => {
    render(<UserRequestsScore />)
    
    expect(screen.getByText('Recent Update Requests')).toBeTruthy()
    expect(screen.getByTestId('userrequestsscore-requests-list')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsscore-request-item"]')).toBeTruthy()
  })

  it('shows match status badges', () => {
    render(<UserRequestsScore />)
    
    const statusBadges = screen.getAllByText(/inactive|completed/)
    expect(statusBadges.length).toBeGreaterThan(0)
  })
})
