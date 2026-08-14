import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import UserSubmitsThe from './UserSubmitsThe'

describe('UserSubmitsThe', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = ''
  })

  it('renders without crashing', () => {
    render(<UserSubmitsThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the contact form with all required fields', () => {
    render(<UserSubmitsThe />)
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit Message/i })).toBeInTheDocument()
  })

  it('displays mock submission history', () => {
    render(<UserSubmitsThe />)
    
    expect(screen.getByText('Recent Submissions')).toBeInTheDocument()
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    expect(screen.getByText('Carol Davis')).toBeInTheDocument()
    expect(screen.getByText('David Wilson')).toBeInTheDocument()
    expect(screen.getByText('Emma Thompson')).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<UserSubmitsThe />)
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Subject is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<UserSubmitsThe />)
    
    // Fill in other required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message' } })
    
    // Fill in invalid email
    const emailInput = screen.getByLabelText(/Email Address/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument()
    })
  })

  it('validates message minimum length', async () => {
    render(<UserSubmitsThe />)
    
    // Fill in other required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } })
    
    // Fill in short message
    const messageInput = screen.getByLabelText(/Message/i)
    fireEvent.change(messageInput, { target: { value: 'Short' } })
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    render(<UserSubmitsThe />)
    
    // Fill out the form
    const nameInput = screen.getByLabelText(/Full Name/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const subjectInput = screen.getByLabelText(/Subject/i)
    const messageInput = screen.getByLabelText(/Message/i)
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'This is a test message with enough characters' } })
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    // Check for submitting state
    await waitFor(() => {
      expect(screen.getByText(/Submitting/i)).toBeInTheDocument()
    })
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/Success!/i)).toBeInTheDocument()
      expect(screen.getByText(/Your message has been submitted successfully/i)).toBeInTheDocument()
    }, { timeout: 2000 })
    
    // Check that form is reset
    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(subjectInput).toHaveValue('')
    expect(messageInput).toHaveValue('')
  })

  it('clears individual field errors when user starts typing', async () => {
    render(<UserSubmitsThe />)
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
    
    // Start typing in name field
    const nameInput = screen.getByLabelText(/Full Name/i)
    fireEvent.change(nameInput, { target: { value: 'Test' } })
    
    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    render(<UserSubmitsThe />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message with enough characters' } })
    
    const submitButton = screen.getByRole('button', { name: /Submit Message/i })
    fireEvent.click(submitButton)
    
    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })
})
