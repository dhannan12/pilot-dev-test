import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ParentsAreRedirected from './ParentsAreRedirected'

describe('ParentsAreRedirected', () => {
  it('renders without crashing', () => {
    render(<ParentsAreRedirected />)
    expect(document.body).toBeTruthy()
  })

  it('displays login form initially', () => {
    render(<ParentsAreRedirected />)
    expect(screen.getByText(/Parent Login/i)).toBeTruthy()
    expect(screen.getByText(/School Canteen Pre-Order System/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ParentsAreRedirected />)
    
    // Main wrapper
    expect(screen.getByTestId('parentsareredirected')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('parentsareredirected-email')).toBeTruthy()
    expect(screen.getByTestId('parentsareredirected-password')).toBeTruthy()
    
    // Submit button
    expect(screen.getByTestId('parentsareredirected-submit')).toBeTruthy()
  })

  it('accepts email and password input', () => {
    render(<ParentsAreRedirected />)
    
    const emailInput = screen.getByTestId('parentsareredirected-email') as HTMLInputElement
    const passwordInput = screen.getByTestId('parentsareredirected-password') as HTMLInputElement
    
    fireEvent.change(emailInput, { target: { value: 'sarah.johnson@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(emailInput.value).toBe('sarah.johnson@email.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('shows redirecting state after login', async () => {
    render(<ParentsAreRedirected />)
    
    const emailInput = screen.getByTestId('parentsareredirected-email')
    const passwordInput = screen.getByTestId('parentsareredirected-password')
    const submitButton = screen.getByTestId('parentsareredirected-submit')
    
    fireEvent.change(emailInput, { target: { value: 'sarah.johnson@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Redirecting/i)).toBeTruthy()
    })
  })

  it('shows payment portal after redirect', async () => {
    render(<ParentsAreRedirected />)
    
    const emailInput = screen.getByTestId('parentsareredirected-email')
    const passwordInput = screen.getByTestId('parentsareredirected-password')
    const submitButton = screen.getByTestId('parentsareredirected-submit')
    
    fireEvent.change(emailInput, { target: { value: 'david.chen@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    // Wait for redirect to complete (1500ms + buffer)
    await waitFor(() => {
      expect(screen.getByText(/Payment Portal/i)).toBeTruthy()
    }, { timeout: 3000 })
  })

  it('displays children list after login', async () => {
    render(<ParentsAreRedirected />)
    
    const emailInput = screen.getByTestId('parentsareredirected-email')
    const passwordInput = screen.getByTestId('parentsareredirected-password')
    const submitButton = screen.getByTestId('parentsareredirected-submit')
    
    fireEvent.change(emailInput, { target: { value: 'maria.garcia@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('parentsareredirected-list')).toBeTruthy()
    }, { timeout: 3000 })
  })

  it('has payment portal action buttons with data-testid', async () => {
    render(<ParentsAreRedirected />)
    
    const emailInput = screen.getByTestId('parentsareredirected-email')
    const passwordInput = screen.getByTestId('parentsareredirected-password')
    const submitButton = screen.getByTestId('parentsareredirected-submit')
    
    fireEvent.change(emailInput, { target: { value: 'priya.patel@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('parentsareredirected-viewbalance')).toBeTruthy()
      expect(screen.getByTestId('parentsareredirected-makepayment')).toBeTruthy()
      expect(screen.getByTestId('parentsareredirected-paymenthistory')).toBeTruthy()
      expect(screen.getByTestId('parentsareredirected-autopay')).toBeTruthy()
      expect(screen.getByTestId('parentsareredirected-logout')).toBeTruthy()
    }, { timeout: 3000 })
  })

  it('displays mock data', () => {
    render(<ParentsAreRedirected />)
    
    // Test accounts should be displayed
    expect(screen.getByText(/sarah.johnson@email.com/i)).toBeTruthy()
  })
})
