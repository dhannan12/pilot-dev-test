import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays membership portal access message', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Membership Portal Access Required/i)).toBeTruthy()
    expect(screen.getByText(/Please log in to access your membership benefits/i)).toBeTruthy()
  })

  it('displays login form with username and password inputs', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByTestId('userattemptsto-username')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-password')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
  })

  it('displays locked portal sections with mock data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Member Dashboard/i)).toBeTruthy()
    expect(screen.getByText(/Exclusive Deals/i)).toBeTruthy()
    expect(screen.getByText(/Order History/i)).toBeTruthy()
    expect(screen.getByText(/VIP Events/i)).toBeTruthy()
    expect(screen.getByText(/Personal Stylist/i)).toBeTruthy()
  })

  it('displays membership benefits preview', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Why Join Our Membership/i)).toBeTruthy()
    expect(screen.getByText(/Exclusive Discounts/i)).toBeTruthy()
    expect(screen.getByText(/Free Shipping/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    // Login form elements
    expect(screen.getByTestId('userattemptsto-username')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-password')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
    // List container and items
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBe(6)
  })

  it('displays forgot password and signup buttons', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByTestId('userattemptsto-forgot')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-signup')).toBeTruthy()
  })

  it('displays help/contact support button', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByTestId('userattemptsto-help')).toBeTruthy()
  })
})
