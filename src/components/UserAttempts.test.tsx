import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttempts from './UserAttempts'

describe('UserAttempts', () => {
  it('renders without crashing', () => {
    render(<UserAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Match Details Access Control')).toBeTruthy()
  })

  it('shows not logged in status initially', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Not Logged In')).toBeTruthy()
  })

  it('displays login form when not logged in', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Please log in to access match details')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter username')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter email')).toBeTruthy()
  })

  it('displays match selection dropdown', () => {
    render(<UserAttempts />)
    const select = screen.getByLabelText('Choose a match to view details')
    expect(select).toBeTruthy()
  })

  it('displays mock access attempt data in the log', () => {
    render(<UserAttempts />)
    expect(screen.getByText('Access Attempt Log')).toBeTruthy()
    expect(screen.getByText('Rafael Nadal vs Novak Djokovic')).toBeTruthy()
    expect(screen.getByText('Roger Federer vs Andy Murray')).toBeTruthy()
  })

  it('handles login action', () => {
    render(<UserAttempts />)
    
    const usernameInput = screen.getByPlaceholderText('Enter username')
    const emailInput = screen.getByPlaceholderText('Enter email')
    const loginButton = screen.getByText('Log In')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(usernameInput).toHaveProperty('value', 'testuser')
    expect(emailInput).toHaveProperty('value', 'test@example.com')
  })

  it('has required data-testid attributes', () => {
    render(<UserAttempts />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userattempts"]')).toBeTruthy()
    
    // Input fields
    expect(document.querySelector('[data-testid="userattempts-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattempts-email"]')).toBeTruthy()
    
    // Login button
    expect(document.querySelector('[data-testid="userattempts-login"]')).toBeTruthy()
    
    // Match select
    expect(document.querySelector('[data-testid="userattempts-match-select"]')).toBeTruthy()
    
    // Access details button
    expect(document.querySelector('[data-testid="userattempts-access-details"]')).toBeTruthy()
    
    // List containers and items
    expect(document.querySelector('[data-testid="userattempts-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattempts-item"]')).toBeTruthy()
  })

  it('displays at least 5 mock data items', () => {
    render(<UserAttempts />)
    const accessItems = document.querySelectorAll('[data-testid="userattempts-item"]')
    expect(accessItems.length).toBeGreaterThanOrEqual(5)
  })

  it('match selection dropdown contains mock matches', () => {
    render(<UserAttempts />)
    const select = screen.getByTestId('userattempts-match-select')
    const options = select.querySelectorAll('option')
    // Should have at least 6 options (1 placeholder + 5 matches)
    expect(options.length).toBeGreaterThanOrEqual(6)
  })

  it('view details button is disabled when no match is selected', () => {
    render(<UserAttempts />)
    const button = screen.getByTestId('userattempts-access-details')
    expect(button).toHaveProperty('disabled', true)
  })
})
