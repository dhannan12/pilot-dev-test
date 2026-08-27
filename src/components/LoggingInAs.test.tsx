import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoggingInAs from './LoggingInAs'

describe('LoggingInAs', () => {
  it('renders without crashing', () => {
    render(<LoggingInAs />)
    expect(document.body).toBeTruthy()
  })

  it('displays the login form', () => {
    render(<LoggingInAs />)
    expect(screen.getByText('Welcome Back')).toBeTruthy()
    expect(screen.getByText('Login to your account')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<LoggingInAs />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="logginginas"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="logginginas-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="logginginas-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="logginginas-remember-me"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="logginginas-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="logginginas-forgot-password"]')).toBeTruthy()
  })

  it('displays demo accounts', () => {
    render(<LoggingInAs />)
    expect(screen.getByText('Demo Accounts Available:')).toBeTruthy()
    expect(document.querySelector('[data-testid="logginginas-demo-accounts"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="logginginas-demo-account"]').length).toBeGreaterThan(0)
  })

  it('shows error when submitting empty form', () => {
    render(<LoggingInAs />)
    const submitButton = document.querySelector('[data-testid="logginginas-submit"]') as HTMLButtonElement
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Please enter both email and password')).toBeTruthy()
  })

  it('shows error with invalid credentials', () => {
    render(<LoggingInAs />)
    const emailInput = document.querySelector('[data-testid="logginginas-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="logginginas-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="logginginas-submit"]') as HTMLButtonElement
    
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Invalid email or password')).toBeTruthy()
  })

  it('successfully logs in with valid credentials', () => {
    render(<LoggingInAs />)
    const emailInput = document.querySelector('[data-testid="logginginas-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="logginginas-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="logginginas-submit"]') as HTMLButtonElement
    
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Welcome Back!')).toBeTruthy()
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('has logout button after successful login', () => {
    render(<LoggingInAs />)
    const emailInput = document.querySelector('[data-testid="logginginas-email"]') as HTMLInputElement
    const passwordInput = document.querySelector('[data-testid="logginginas-password"]') as HTMLInputElement
    const submitButton = document.querySelector('[data-testid="logginginas-submit"]') as HTMLButtonElement
    
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(document.querySelector('[data-testid="logginginas-logout"]')).toBeTruthy()
  })
})
