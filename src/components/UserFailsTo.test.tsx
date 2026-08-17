import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserFailsTo from './UserFailsTo'

describe('UserFailsTo', () => {
  it('renders without crashing', () => {
    render(<UserFailsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays membership tiers', () => {
    render(<UserFailsTo />)
    expect(screen.getByText('Basic')).toBeTruthy()
    expect(screen.getByText('Premium')).toBeTruthy()
    expect(screen.getByText('Elite')).toBeTruthy()
    expect(screen.getByText('Family')).toBeTruthy()
    expect(screen.getByText('Corporate')).toBeTruthy()
  })

  it('displays form fields', () => {
    render(<UserFailsTo />)
    expect(screen.getByTestId('userfailsto-firstname')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-lastname')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-email')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserFailsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('userfailsto')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('userfailsto-firstname')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-lastname')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-email')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('userfailsto-submit')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-reset')).toBeTruthy()
    expect(screen.getByTestId('userfailsto-help')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('userfailsto-list')).toBeTruthy()
    const items = screen.getAllByTestId('userfailsto-item')
    expect(items.length).toBe(5) // 5 membership tiers
  })

  it('shows error when submitting without selecting membership', () => {
    render(<UserFailsTo />)
    
    const submitButton = screen.getByTestId('userfailsto-submit')
    fireEvent.click(submitButton)
    
    // Error banner should appear
    expect(screen.getByTestId('userfailsto-error-banner')).toBeTruthy()
    expect(screen.getByText(/Membership Selection Required/i)).toBeTruthy()
  })

  it('allows user to select a membership', () => {
    render(<UserFailsTo />)
    
    const membershipItems = screen.getAllByTestId('userfailsto-item')
    const firstMembership = membershipItems[0]
    
    fireEvent.click(firstMembership)
    
    // Check if the membership is selected (visual indication)
    expect(firstMembership.className).toContain('border-indigo-600')
  })

  it('clears error after selecting membership', () => {
    render(<UserFailsTo />)
    
    // First, submit without selection to trigger error
    const submitButton = screen.getByTestId('userfailsto-submit')
    fireEvent.click(submitButton)
    
    expect(screen.getByTestId('userfailsto-error-banner')).toBeTruthy()
    
    // Then select a membership
    const membershipItems = screen.getAllByTestId('userfailsto-item')
    fireEvent.click(membershipItems[0])
    
    // Error should be cleared
    expect(screen.queryByTestId('userfailsto-error-banner')).toBeFalsy()
  })

  it('resets form when reset button is clicked', () => {
    render(<UserFailsTo />)
    
    // Fill in some data
    const firstNameInput = screen.getByTestId('userfailsto-firstname') as HTMLInputElement
    const lastNameInput = screen.getByTestId('userfailsto-lastname') as HTMLInputElement
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    
    expect(firstNameInput.value).toBe('John')
    expect(lastNameInput.value).toBe('Doe')
    
    // Click reset
    const resetButton = screen.getByTestId('userfailsto-reset')
    fireEvent.click(resetButton)
    
    // Form should be cleared
    expect(firstNameInput.value).toBe('')
    expect(lastNameInput.value).toBe('')
  })

  it('displays all 5 membership tiers in the list', () => {
    render(<UserFailsTo />)
    
    const items = screen.getAllByTestId('userfailsto-item')
    expect(items.length).toBe(5)
  })

  it('shows required field indicator for membership selection', () => {
    render(<UserFailsTo />)
    
    // Use getAllByText to get all matches and check the heading with asterisk
    const headings = screen.getAllByText(/Select Your Membership/i)
    const formHeading = headings.find(el => el.tagName === 'H2')
    expect(formHeading).toBeTruthy()
    // Check for asterisk in the parent element
    expect(formHeading?.textContent).toContain('*')
  })
})
