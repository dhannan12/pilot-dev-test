import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import NSubmit from './NSubmit'

// Mock window.scrollTo
beforeAll(() => {
  window.scrollTo = () => {}
})

describe('NSubmit', () => {
  it('renders without crashing', () => {
    render(<NSubmit />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main form with title', () => {
    render(<NSubmit />)
    expect(screen.getByText('Expression of Interest')).toBeInTheDocument()
    expect(screen.getByText(/Submit your application for available positions/i)).toBeInTheDocument()
  })

  it('displays mock role data in the select dropdown', () => {
    render(<NSubmit />)
    const select = screen.getByTestId('n-submit-role') as HTMLSelectElement
    
    // Should have 6 options (1 placeholder + 5 roles)
    expect(select.options.length).toBe(6)
    expect(select.options[0].text).toBe('Choose a role...')
    expect(select.options[1].text).toContain('Senior Software Engineer')
  })

  it('has required data-testid attributes', () => {
    render(<NSubmit />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('n-submit')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-role')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-cover-note')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-resume')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-submit')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('n-submit-roles-list')).toBeInTheDocument()
  })

  it('displays validation errors when submitting empty form', async () => {
    render(<NSubmit />)
    
    const submitButton = screen.getByTestId('n-submit-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please select a role')).toBeInTheDocument()
      expect(screen.getByText('Cover note is required')).toBeInTheDocument()
      expect(screen.getByText('Please upload your resume')).toBeInTheDocument()
    })
  })

  it('shows role details when a role is selected', () => {
    render(<NSubmit />)
    
    const select = screen.getByTestId('n-submit-role')
    fireEvent.change(select, { target: { value: 'eoi-1' } })

    const roleDetails = screen.getByTestId('n-submit-role-details')
    expect(roleDetails).toBeInTheDocument()
    expect(roleDetails).toHaveTextContent('Senior Software Engineer')
    expect(roleDetails).toHaveTextContent('Engineering')
  })

  it('validates cover note minimum length', async () => {
    render(<NSubmit />)
    
    const coverNote = screen.getByTestId('n-submit-cover-note') as HTMLTextAreaElement
    fireEvent.change(coverNote, { target: { value: 'Short note' } })
    
    const submitButton = screen.getByTestId('n-submit-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Cover note must be at least 50 characters')).toBeInTheDocument()
    })
  })

  it('displays character count for cover note', () => {
    render(<NSubmit />)
    
    const coverNote = screen.getByTestId('n-submit-cover-note') as HTMLTextAreaElement
    fireEvent.change(coverNote, { target: { value: 'Test message' } })

    expect(screen.getByText(/12 \/ 50 min characters/)).toBeInTheDocument()
  })

  it('clears form when cancel button is clicked', () => {
    render(<NSubmit />)
    
    // Fill in some data
    const select = screen.getByTestId('n-submit-role') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'eoi-1' } })
    
    const coverNote = screen.getByTestId('n-submit-cover-note') as HTMLTextAreaElement
    fireEvent.change(coverNote, { target: { value: 'Some cover note text' } })
    
    // Click cancel
    const cancelButton = screen.getByTestId('n-submit-cancel')
    fireEvent.click(cancelButton)

    // Check form is cleared
    expect(select.value).toBe('')
    expect(coverNote.value).toBe('')
  })

  it('displays available roles list', () => {
    render(<NSubmit />)
    
    const rolesList = screen.getByTestId('n-submit-roles-list')
    expect(rolesList).toBeInTheDocument()
    
    const roleItems = screen.getAllByTestId('n-submit-role-item')
    expect(roleItems.length).toBe(5)
  })

  it('selects role when clicking on role item in list', () => {
    render(<NSubmit />)
    
    const roleItems = screen.getAllByTestId('n-submit-role-item')
    fireEvent.click(roleItems[0])
    
    const select = screen.getByTestId('n-submit-role') as HTMLSelectElement
    expect(select.value).toBe('eoi-1')
  })

  it('displays success message after valid submission', async () => {
    render(<NSubmit />)
    
    // Fill in valid data
    const select = screen.getByTestId('n-submit-role')
    fireEvent.change(select, { target: { value: 'eoi-1' } })
    
    const coverNote = screen.getByTestId('n-submit-cover-note')
    fireEvent.change(coverNote, { 
      target: { value: 'This is a valid cover note with more than fifty characters to pass validation.' } 
    })
    
    // Mock file upload
    const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByTestId('n-submit-resume')
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    })
    fireEvent.change(fileInput)
    
    // Submit form
    const submitButton = screen.getByTestId('n-submit-submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('n-submit-success')).toBeInTheDocument()
      expect(screen.getByText('Expression of Interest Submitted!')).toBeInTheDocument()
    })
  })
})
