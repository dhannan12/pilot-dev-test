import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AccessingTheMembers from './AccessingTheMembers'

describe('AccessingTheMembers', () => {
  it('renders without crashing', () => {
    render(<AccessingTheMembers />)
    expect(document.body).toBeTruthy()
  })

  it('displays main heading and description', () => {
    render(<AccessingTheMembers />)
    expect(screen.getByText('Members Area')).toBeTruthy()
    expect(screen.getByText(/Join our exclusive community/i)).toBeTruthy()
  })

  it('displays member benefits', () => {
    render(<AccessingTheMembers />)
    expect(screen.getByText('Exclusive Content')).toBeTruthy()
    expect(screen.getByText('Community Forum')).toBeTruthy()
    expect(screen.getByText('Monthly Webinars')).toBeTruthy()
    expect(screen.getByText('Member Discounts')).toBeTruthy()
    expect(screen.getByText('Early Access')).toBeTruthy()
  })

  it('shows sign in and create account buttons', () => {
    render(<AccessingTheMembers />)
    const loginButton = screen.getByTestId('accessing-the-members-login')
    const signupButton = screen.getByTestId('accessing-the-members-signup')
    expect(loginButton).toBeTruthy()
    expect(signupButton).toBeTruthy()
  })

  it('toggles login form when sign in button is clicked', () => {
    render(<AccessingTheMembers />)
    const loginButton = screen.getByTestId('accessing-the-members-login')
    
    // Login form should not be visible initially
    expect(screen.queryByTestId('accessing-the-members-email')).toBeNull()
    
    // Click to show login form
    fireEvent.click(loginButton)
    expect(screen.getByTestId('accessing-the-members-email')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-password')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-submit')).toBeTruthy()
    
    // Click again to hide
    fireEvent.click(loginButton)
    expect(screen.queryByTestId('accessing-the-members-email')).toBeNull()
  })

  it('has required data-testid attributes', () => {
    render(<AccessingTheMembers />)
    
    // Main wrapper
    expect(screen.getByTestId('accessing-the-members')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('accessing-the-members-login')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-signup')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-cta-signup')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('accessing-the-members-list')).toBeTruthy()
    const items = screen.getAllByTestId('accessing-the-members-item')
    expect(items.length).toBeGreaterThan(5)
  })

  it('shows login form fields when expanded', () => {
    render(<AccessingTheMembers />)
    const loginButton = screen.getByTestId('accessing-the-members-login')
    
    fireEvent.click(loginButton)
    
    // Verify all form elements
    expect(screen.getByTestId('accessing-the-members-email')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-password')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-submit')).toBeTruthy()
    expect(screen.getByTestId('accessing-the-members-forgot-password')).toBeTruthy()
  })

  it('renders all member benefits with proper structure', () => {
    render(<AccessingTheMembers />)
    
    const benefitItems = screen.getAllByTestId('accessing-the-members-item')
    expect(benefitItems.length).toBe(7)
    
    // Check specific benefits are present
    expect(screen.getByText('Resource Library')).toBeTruthy()
    expect(screen.getByText('Member Badge')).toBeTruthy()
  })
})
