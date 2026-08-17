import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildApplication from './BuildApplication'

describe('BuildApplication', () => {
  it('renders without crashing', () => {
    render(<BuildApplication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the application form with all required fields', () => {
    render(<BuildApplication />)
    
    expect(screen.getByRole('heading', { name: /Submit Application/i })).toBeTruthy()
    expect(screen.getByText(/Express your interest in internal job opportunities/i)).toBeTruthy()
    expect(screen.getByLabelText(/Select Vacancy/i)).toBeTruthy()
    expect(screen.getByLabelText(/Current Role/i)).toBeTruthy()
    expect(screen.getByLabelText(/Target Grade Level/i)).toBeTruthy()
    expect(screen.getByLabelText(/Cover Note/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildApplication />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="build-application"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-form"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-vacancy"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-current-role"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-grade-level"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-cover-note"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-application-reset"]')).toBeTruthy()
  })

  it('auto-fills grade level when vacancy is selected', () => {
    render(<BuildApplication />)
    
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    const gradeLevelInput = screen.getByTestId('build-application-grade-level') as HTMLInputElement
    
    // Initially empty
    expect(gradeLevelInput.value).toBe('')
    
    // Select first vacancy (Senior Software Engineer - Level 5)
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    
    // Grade level should auto-fill
    expect(gradeLevelInput.value).toBe('Level 5')
  })

  it('displays vacancy details when a vacancy is selected', () => {
    render(<BuildApplication />)
    
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    
    // Select vacancy
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    
    // Check vacancy details are displayed
    const detailsSection = screen.getByTestId('build-application-vacancy-details')
    expect(detailsSection).toBeTruthy()
    expect(detailsSection.textContent).toContain('Senior Software Engineer')
    expect(detailsSection.textContent).toContain('Engineering')
    expect(detailsSection.textContent).toContain('Level 5')
  })

  it('validates form and shows errors for empty fields', () => {
    render(<BuildApplication />)
    
    const submitButton = screen.getByTestId('build-application-submit')
    
    // Try to submit without filling form
    fireEvent.click(submitButton)
    
    // Should show validation errors
    expect(screen.getByText(/Please select a vacancy/i)).toBeTruthy()
    expect(screen.getByText(/Please select your current role/i)).toBeTruthy()
    expect(screen.getByText(/Please provide a cover note/i)).toBeTruthy()
  })

  it('validates cover note minimum length', () => {
    render(<BuildApplication />)
    
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('build-application-submit')
    
    // Enter short text
    fireEvent.change(coverNoteTextarea, { target: { value: 'Too short' } })
    fireEvent.click(submitButton)
    
    // Should show minimum length error
    expect(screen.getByText(/Cover note must be at least 50 characters/i)).toBeTruthy()
  })

  it('shows confirmation modal when form is valid and submitted', () => {
    render(<BuildApplication />)
    
    // Fill out the form
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('build-application-current-role') as HTMLSelectElement
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('build-application-submit')
    
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: 'Software Engineer' } })
    fireEvent.change(coverNoteTextarea, { 
      target: { value: 'I am very interested in this position because I have extensive experience in software development and would like to advance my career.' } 
    })
    
    // Submit form
    fireEvent.click(submitButton)
    
    // Confirmation modal should appear
    expect(screen.getByTestId('build-application-confirm-modal')).toBeTruthy()
    expect(screen.getByText(/Confirm Submission/i)).toBeTruthy()
  })

  it('can cancel confirmation and close modal', () => {
    render(<BuildApplication />)
    
    // Fill and submit form
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('build-application-current-role') as HTMLSelectElement
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('build-application-submit')
    
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: 'Software Engineer' } })
    fireEvent.change(coverNoteTextarea, { 
      target: { value: 'I am very interested in this position because I have extensive experience in software development.' } 
    })
    fireEvent.click(submitButton)
    
    // Cancel confirmation
    const cancelButton = screen.getByTestId('build-application-confirm-cancel')
    fireEvent.click(cancelButton)
    
    // Modal should close
    expect(screen.queryByTestId('build-application-confirm-modal')).toBeNull()
  })

  it('shows success modal after confirming submission', async () => {
    render(<BuildApplication />)
    
    // Fill and submit form
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('build-application-current-role') as HTMLSelectElement
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('build-application-submit')
    
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: 'Software Engineer' } })
    fireEvent.change(coverNoteTextarea, { 
      target: { value: 'I am very interested in this position because I have extensive experience in software development.' } 
    })
    fireEvent.click(submitButton)
    
    // Confirm submission
    const confirmButton = screen.getByTestId('build-application-confirm-submit')
    fireEvent.click(confirmButton)
    
    // Success modal should appear
    await waitFor(() => {
      expect(screen.getByTestId('build-application-success-modal')).toBeTruthy()
      expect(screen.getByText(/Application Submitted!/i)).toBeTruthy()
    })
  })

  it('resets form when reset button is clicked', () => {
    render(<BuildApplication />)
    
    // Fill form
    const vacancySelect = screen.getByTestId('build-application-vacancy') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('build-application-current-role') as HTMLSelectElement
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    const resetButton = screen.getByTestId('build-application-reset')
    
    fireEvent.change(vacancySelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: 'Software Engineer' } })
    fireEvent.change(coverNoteTextarea, { target: { value: 'Sample cover note text' } })
    
    // Verify fields are filled
    expect(vacancySelect.value).toBe('1')
    expect(currentRoleSelect.value).toBe('Software Engineer')
    expect(coverNoteTextarea.value).toBe('Sample cover note text')
    
    // Click reset
    fireEvent.click(resetButton)
    
    // Fields should be cleared
    expect(vacancySelect.value).toBe('')
    expect(currentRoleSelect.value).toBe('')
    expect(coverNoteTextarea.value).toBe('')
  })

  it('displays character count for cover note', () => {
    render(<BuildApplication />)
    
    const coverNoteTextarea = screen.getByTestId('build-application-cover-note') as HTMLTextAreaElement
    
    // Initially 0 characters
    expect(screen.getByText(/0 characters/i)).toBeTruthy()
    
    // Type some text
    fireEvent.change(coverNoteTextarea, { target: { value: 'Hello World' } })
    
    // Should show character count
    expect(screen.getByText(/11 characters/i)).toBeTruthy()
  })
})
