import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock case data with document checklist', () => {
    render(<UserAttemptsTo />)
    
    // Check for header
    expect(screen.getByText('Case Closure Manager')).toBeTruthy()
    
    // Check for document checklist
    expect(screen.getByText(/Document Checklist/)).toBeTruthy()
    expect(screen.getAllByText(/Initial Complaint/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Evidence Documentation/).length).toBeGreaterThan(0)
  })

  it('shows warning when attempting to close case with incomplete documents', () => {
    render(<UserAttemptsTo />)
    
    const closeButton = screen.getByTestId('userattemptsto-close')
    fireEvent.click(closeButton)
    
    // Warning should appear
    const warning = screen.getByTestId('userattemptsto-warning')
    expect(warning).toBeTruthy()
    expect(screen.getByText(/Cannot Close Case - Incomplete Documents/)).toBeTruthy()
  })

  it('displays completion progress with percentage', () => {
    render(<UserAttemptsTo />)
    
    // Check for completion stats
    expect(screen.getByText(/Document Completion Progress/)).toBeTruthy()
    // Should show some fraction (e.g., "2 / 5")
    const progressText = document.body.textContent || ''
    expect(progressText).toMatch(/\d+\s*\/\s*\d+/)
  })

  it('allows switching between different cases', () => {
    render(<UserAttemptsTo />)
    
    const caseSelect = screen.getByTestId('userattemptsto-case-select') as HTMLSelectElement
    
    // Initially should show first case
    expect(caseSelect.value).toBe('1')
    
    // Change to second case
    fireEvent.change(caseSelect, { target: { value: '2' } })
    
    // Should now show second case
    expect(caseSelect.value).toBe('2')
    expect(screen.getAllByText(/Williams Estate/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-case-select')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-close')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-cancel')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    
    // Check that list items have testid
    const listItems = screen.getAllByTestId('userattemptsto-item')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('lists incomplete required documents in warning', () => {
    render(<UserAttemptsTo />)
    
    // Click close button to trigger warning
    const closeButton = screen.getByTestId('userattemptsto-close')
    fireEvent.click(closeButton)
    
    // Warning should be present and list incomplete documents
    const warning = screen.getByTestId('userattemptsto-warning')
    expect(warning.textContent).toMatch(/Witness Statements/)
    expect(warning.textContent).toMatch(/Final Judgment/)
    expect(warning.textContent).toMatch(/Client Signature/)
  })

  it('hides warning when cancel button is clicked', () => {
    render(<UserAttemptsTo />)
    
    // Trigger warning
    const closeButton = screen.getByTestId('userattemptsto-close')
    fireEvent.click(closeButton)
    
    // Warning should be visible
    expect(screen.getByTestId('userattemptsto-warning')).toBeTruthy()
    
    // Click cancel
    const cancelButton = screen.getByTestId('userattemptsto-cancel')
    fireEvent.click(cancelButton)
    
    // Warning should be hidden
    expect(screen.queryByTestId('userattemptsto-warning')).toBeNull()
  })

  it('displays status badge for case', () => {
    render(<UserAttemptsTo />)
    
    // Should show status (e.g., "OPEN")
    const bodyText = document.body.textContent || ''
    expect(bodyText).toMatch(/OPEN|PENDING|CLOSED/)
  })
})
