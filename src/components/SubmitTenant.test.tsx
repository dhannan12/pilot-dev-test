import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmitTenant from './SubmitTenant'

describe('SubmitTenant', () => {
  it('renders without crashing', () => {
    render(<SubmitTenant />)
    expect(document.body).toBeTruthy()
  })

  it('displays the tenant application form title', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Tenant Application')).toBeTruthy()
    expect(screen.getByText(/Submit your application online/)).toBeTruthy()
  })

  it('displays all required form fields', () => {
    render(<SubmitTenant />)
    expect(screen.getByLabelText(/Full Name/)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/)).toBeTruthy()
    expect(screen.getByLabelText(/Phone Number/)).toBeTruthy()
    expect(screen.getByLabelText(/Current Address/)).toBeTruthy()
    expect(screen.getByLabelText(/Employment Status/)).toBeTruthy()
    expect(screen.getByLabelText(/Annual Income/)).toBeTruthy()
    expect(screen.getByLabelText(/Desired Move-in Date/)).toBeTruthy()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<SubmitTenant />)
    const submitButton = screen.getByText('Submit Application')
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeTruthy()
      expect(screen.getByText('Email is required')).toBeTruthy()
      expect(screen.getByText('Phone number is required')).toBeTruthy()
    })
  })

  it('validates email format', async () => {
    render(<SubmitTenant />)
    const emailInput = screen.getByLabelText(/Email Address/)
    const submitButton = screen.getByText('Submit Application')
    
    // Fill all required fields except email with valid data
    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'notanemail' } })
    fireEvent.change(screen.getByLabelText(/Phone Number/), { target: { value: '555-1234' } })
    fireEvent.change(screen.getByLabelText(/Current Address/), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByLabelText(/Annual Income/), { target: { value: '$50,000' } })
    fireEvent.change(screen.getByLabelText(/Desired Move-in Date/), { target: { value: '2026-09-01' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeTruthy()
    })
  })

  it('validates phone number format', async () => {
    render(<SubmitTenant />)
    const phoneInput = screen.getByLabelText(/Phone Number/)
    const submitButton = screen.getByText('Submit Application')
    
    // Fill all required fields except phone with valid data
    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '123' } })
    fireEvent.change(screen.getByLabelText(/Current Address/), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByLabelText(/Annual Income/), { target: { value: '$50,000' } })
    fireEvent.change(screen.getByLabelText(/Desired Move-in Date/), { target: { value: '2026-09-01' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid phone number/)).toBeTruthy()
    })
  })

  it('submits form successfully with valid data', async () => {
    render(<SubmitTenant />)
    
    fireEvent.change(screen.getByLabelText(/Full Name/), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/Email Address/), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/Phone Number/), {
      target: { value: '555-1234' }
    })
    fireEvent.change(screen.getByLabelText(/Current Address/), {
      target: { value: '123 Main St' }
    })
    fireEvent.change(screen.getByLabelText(/Annual Income/), {
      target: { value: '$50,000' }
    })
    fireEvent.change(screen.getByLabelText(/Desired Move-in Date/), {
      target: { value: '2026-09-01' }
    })
    
    fireEvent.click(screen.getByText('Submit Application'))
    
    await waitFor(() => {
      expect(screen.getByText('Application Submitted Successfully!')).toBeTruthy()
    })
  })

  it('displays mock applications when show button is clicked', () => {
    render(<SubmitTenant />)
    const showButton = screen.getByText(/Show/)
    
    fireEvent.click(showButton)
    
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('john.smith@email.com')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Williams')).toBeTruthy()
  })

  it('clears form when Clear Form button is clicked', () => {
    render(<SubmitTenant />)
    
    const nameInput = screen.getByLabelText(/Full Name/) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Test Name' } })
    expect(nameInput.value).toBe('Test Name')
    
    fireEvent.click(screen.getByText('Clear Form'))
    expect(nameInput.value).toBe('')
  })

  it('clears errors when user starts typing', async () => {
    render(<SubmitTenant />)
    const submitButton = screen.getByText('Submit Application')
    const nameInput = screen.getByLabelText(/Full Name/)
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeTruthy()
    })
    
    fireEvent.change(nameInput, { target: { value: 'John' } })
    
    await waitFor(() => {
      expect(screen.queryByText('Full name is required')).toBeNull()
    })
  })
})
