import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductProvide from './ProductProvide'

describe('ProductProvide', () => {
  it('renders without crashing', () => {
    render(<ProductProvide />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<ProductProvide />)
    expect(screen.getByText('Product Brief Submission')).toBeTruthy()
    expect(screen.getByText(/Provide a complete product brief/)).toBeTruthy()
  })

  it('displays form tabs', () => {
    render(<ProductProvide />)
    expect(screen.getByText('Create Brief')).toBeTruthy()
    expect(screen.getByText('Brief History')).toBeTruthy()
  })

  it('shows all required form fields in create tab', () => {
    render(<ProductProvide />)
    expect(screen.getByPlaceholderText('Enter project name')).toBeTruthy()
    expect(screen.getByPlaceholderText('Your name')).toBeTruthy()
    expect(screen.getByText(/Target Launch Date/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Describe the key objectives/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/As a \[user type\]/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/List specific criteria/)).toBeTruthy()
  })

  it('validates required fields on submit', async () => {
    render(<ProductProvide />)
    
    const submitButton = screen.getByText('Submit Brief')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Project name is required')).toBeTruthy()
      expect(screen.getByText('Product manager name is required')).toBeTruthy()
      expect(screen.getByText('Target date is required')).toBeTruthy()
    })
  })

  it('allows user to fill out form fields', () => {
    render(<ProductProvide />)
    
    const projectNameInput = screen.getByPlaceholderText('Enter project name') as HTMLInputElement
    fireEvent.change(projectNameInput, { target: { value: 'Test Project' } })
    expect(projectNameInput.value).toBe('Test Project')
    
    const pmInput = screen.getByPlaceholderText('Your name') as HTMLInputElement
    fireEvent.change(pmInput, { target: { value: 'John Doe' } })
    expect(pmInput.value).toBe('John Doe')
  })

  it('clears validation errors when user types', async () => {
    render(<ProductProvide />)
    
    const submitButton = screen.getByText('Submit Brief')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Project name is required')).toBeTruthy()
    })
    
    const projectNameInput = screen.getByPlaceholderText('Enter project name')
    fireEvent.change(projectNameInput, { target: { value: 'Test Project' } })
    
    await waitFor(() => {
      expect(screen.queryByText('Project name is required')).toBeNull()
    })
  })

  it('clears form when Clear Form button is clicked', () => {
    render(<ProductProvide />)
    
    const projectNameInput = screen.getByPlaceholderText('Enter project name') as HTMLInputElement
    fireEvent.change(projectNameInput, { target: { value: 'Test Project' } })
    expect(projectNameInput.value).toBe('Test Project')
    
    const clearButton = screen.getByText('Clear Form')
    fireEvent.click(clearButton)
    
    expect(projectNameInput.value).toBe('')
  })

  it('switches to history tab and displays saved briefs', () => {
    render(<ProductProvide />)
    
    const historyTab = screen.getByText('Brief History')
    fireEvent.click(historyTab)
    
    expect(screen.getByText('Previous Briefs')).toBeTruthy()
    expect(screen.getByText('E-Commerce Mobile Checkout')).toBeTruthy()
    expect(screen.getByText('Customer Dashboard Analytics')).toBeTruthy()
    expect(screen.getByText('Multi-Language Support System')).toBeTruthy()
  })

  it('displays status badges for saved briefs', () => {
    render(<ProductProvide />)
    
    const historyTab = screen.getByText('Brief History')
    fireEvent.click(historyTab)
    
    expect(screen.getByText('Approved')).toBeTruthy()
    const submittedBadges = screen.getAllByText('Submitted')
    expect(submittedBadges.length).toBeGreaterThan(0)
    const draftBadges = screen.getAllByText('Draft')
    expect(draftBadges.length).toBeGreaterThan(0)
  })

  it('displays mock data with at least 5 briefs', () => {
    render(<ProductProvide />)
    
    const historyTab = screen.getByText('Brief History')
    fireEvent.click(historyTab)
    
    expect(screen.getByText(/5 briefs/)).toBeTruthy()
    expect(screen.getByText('E-Commerce Mobile Checkout')).toBeTruthy()
    expect(screen.getByText('Customer Dashboard Analytics')).toBeTruthy()
    expect(screen.getByText('Multi-Language Support System')).toBeTruthy()
    expect(screen.getByText('AI-Powered Search Enhancement')).toBeTruthy()
    expect(screen.getByText('Social Sharing Integration')).toBeTruthy()
  })

  it('shows success message on valid form submission', async () => {
    render(<ProductProvide />)
    
    // Fill out required fields
    fireEvent.change(screen.getByPlaceholderText('Enter project name'), {
      target: { value: 'Test Project' }
    })
    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John Doe' }
    })
    const dateInputs = document.querySelectorAll('input[type="date"]')
    fireEvent.change(dateInputs[0], {
      target: { value: '2026-12-31' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Describe the key objectives/), {
      target: { value: 'Test goals' }
    })
    fireEvent.change(screen.getByPlaceholderText(/As a \[user type\]/), {
      target: { value: 'Test user stories' }
    })
    fireEvent.change(screen.getByPlaceholderText(/List specific criteria/), {
      target: { value: 'Test criteria' }
    })
    
    const submitButton = screen.getByText('Submit Brief')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Product brief submitted successfully/)).toBeTruthy()
    })
  })

  it('displays optional fields for technical constraints and business context', () => {
    render(<ProductProvide />)
    
    expect(screen.getByPlaceholderText(/Any technical limitations/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Background information/)).toBeTruthy()
  })
})
