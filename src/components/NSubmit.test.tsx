import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NSubmit from './NSubmit'

describe('NSubmit', () => {
  it('renders without crashing', () => {
    render(<NSubmit />)
    expect(document.body).toBeTruthy()
  })

  it('displays the form with all required fields', () => {
    render(<NSubmit />)
    
    expect(screen.getByRole('heading', { name: /Submit Expression of Interest/i })).toBeTruthy()
    expect(screen.getByLabelText(/Position of Interest/i)).toBeTruthy()
    expect(screen.getByLabelText(/Your Current Role/i)).toBeTruthy()
    expect(screen.getByLabelText(/Cover Note/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NSubmit />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="nsubmit"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="nsubmit-job-role"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nsubmit-current-role"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nsubmit-cover-note"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="nsubmit-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nsubmit-cancel"]')).toBeTruthy()
  })

  it('populates job role dropdown with mock data', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const options = Array.from(jobRoleSelect.options).map(opt => opt.text)
    
    expect(options.length).toBeGreaterThan(5)
    expect(options.some(opt => opt.includes('Senior Software Engineer'))).toBeTruthy()
    expect(options.some(opt => opt.includes('Product Manager'))).toBeTruthy()
  })

  it('populates current role dropdown with mock data', () => {
    render(<NSubmit />)
    
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const options = Array.from(currentRoleSelect.options).map(opt => opt.text)
    
    expect(options.length).toBeGreaterThan(5)
    expect(options.some(opt => opt.includes('Software Engineer'))).toBeTruthy()
    expect(options.some(opt => opt.includes('UI Designer'))).toBeTruthy()
  })

  it('shows validation errors when submitting empty form', () => {
    render(<NSubmit />)
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Please select a job role/i)).toBeTruthy()
    expect(screen.getByText(/Please select your current role/i)).toBeTruthy()
    expect(screen.getByText(/Please provide a cover note/i)).toBeTruthy()
  })

  it('shows error when cover note is too short', () => {
    render(<NSubmit />)
    
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    fireEvent.change(coverNote, { target: { value: 'Short note' } })
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Cover note must be at least 50 characters/i)).toBeTruthy()
  })

  it('updates character count as user types', () => {
    render(<NSubmit />)
    
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    const testText = 'This is a test cover note'
    
    fireEvent.change(coverNote, { target: { value: testText } })
    
    expect(screen.getByText(`${testText.length} characters`)).toBeTruthy()
  })

  it('clears form when cancel button is clicked', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: '1' } })
    fireEvent.change(coverNote, { target: { value: 'Test cover note with enough characters to pass validation' } })
    
    const cancelButton = screen.getByTestId('nsubmit-cancel')
    fireEvent.click(cancelButton)
    
    expect(jobRoleSelect.value).toBe('')
    expect(currentRoleSelect.value).toBe('')
    expect(coverNote.value).toBe('')
  })

  it('shows success message after valid submission', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: '1' } })
    fireEvent.change(coverNote, { 
      target: { value: 'I am very interested in this position because it aligns with my career goals and experience.' } 
    })
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Expression of Interest Submitted!/i)).toBeTruthy()
    expect(screen.getByText(/Thank you for your interest/i)).toBeTruthy()
  })

  it('displays submission summary after successful submit', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    
    const coverNoteText = 'I am very interested in this position because it aligns with my career goals and experience.'
    
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: '1' } })
    fireEvent.change(coverNote, { target: { value: coverNoteText } })
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Submission Summary')).toBeTruthy()
    expect(screen.getByText(/Senior Software Engineer/i)).toBeTruthy()
    expect(screen.getByText(coverNoteText)).toBeTruthy()
  })

  it('has new submission and browse buttons on success page', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: '1' } })
    fireEvent.change(coverNote, { 
      target: { value: 'I am very interested in this position because it aligns with my career goals.' } 
    })
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    expect(document.querySelector('[data-testid="nsubmit-new"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nsubmit-browse"]')).toBeTruthy()
  })

  it('resets form when clicking new submission button on success page', () => {
    render(<NSubmit />)
    
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    const currentRoleSelect = screen.getByTestId('nsubmit-current-role') as HTMLSelectElement
    const coverNote = screen.getByTestId('nsubmit-cover-note') as HTMLTextAreaElement
    
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    fireEvent.change(currentRoleSelect, { target: { value: '1' } })
    fireEvent.change(coverNote, { 
      target: { value: 'I am very interested in this position because it aligns with my career goals.' } 
    })
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    const newButton = screen.getByTestId('nsubmit-new')
    fireEvent.click(newButton)
    
    // Should be back on the form page
    expect(screen.getByRole('heading', { name: /Submit Expression of Interest/i })).toBeTruthy()
    expect(screen.getByTestId('nsubmit-submit')).toBeTruthy()
  })

  it('displays helpful tips section', () => {
    render(<NSubmit />)
    
    expect(screen.getByText('Tips for a Strong Submission')).toBeTruthy()
    expect(screen.getByText(/Be specific about your interest/i)).toBeTruthy()
  })

  it('clears specific field error when user corrects that field', () => {
    render(<NSubmit />)
    
    const submitButton = screen.getByTestId('nsubmit-submit')
    fireEvent.click(submitButton)
    
    // Should have errors
    expect(screen.getByText(/Please select a job role/i)).toBeTruthy()
    
    // Select a job role
    const jobRoleSelect = screen.getByTestId('nsubmit-job-role') as HTMLSelectElement
    fireEvent.change(jobRoleSelect, { target: { value: '1' } })
    
    // Job role error should be cleared
    expect(screen.queryByText(/Please select a job role/i)).toBeFalsy()
  })
})
