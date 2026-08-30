import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MemberPaysAnnual from './MemberPaysAnnual'

describe('MemberPaysAnnual', () => {
  it('renders without crashing', () => {
    render(<MemberPaysAnnual />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock membership tiers', () => {
    render(<MemberPaysAnnual />)
    expect(screen.getAllByText(/Basic Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Premium Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Elite Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Family Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Corporate Membership/i).length).toBeGreaterThan(0)
  })

  it('displays annual fees for membership tiers', () => {
    render(<MemberPaysAnnual />)
    expect(screen.getByText(/\$299\/year/i)).toBeTruthy()
    expect(screen.getByText(/\$599\/year/i)).toBeTruthy()
    expect(screen.getByText(/\$999\/year/i)).toBeTruthy()
  })

  it('displays payment summary section', () => {
    render(<MemberPaysAnnual />)
    expect(screen.getByText(/Payment Summary/i)).toBeTruthy()
    expect(screen.getByText(/Total Amount:/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MemberPaysAnnual />)
    
    // Main wrapper
    expect(screen.getByTestId('memberpaysannual')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('memberpaysannual-member')).toBeTruthy()
    expect(screen.getByTestId('memberpaysannual-payment-method')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('memberpaysannual-list')).toBeTruthy()
    const items = screen.getAllByTestId('memberpaysannual-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    expect(screen.getByTestId('memberpaysannual-submit')).toBeTruthy()
    expect(screen.getByTestId('memberpaysannual-cancel')).toBeTruthy()
    
    // Card inputs (shown by default for credit card)
    expect(screen.getByTestId('memberpaysannual-card-number')).toBeTruthy()
    expect(screen.getByTestId('memberpaysannual-card-expiry')).toBeTruthy()
    expect(screen.getByTestId('memberpaysannual-card-cvv')).toBeTruthy()
  })

  it('displays member selection dropdown', () => {
    render(<MemberPaysAnnual />)
    expect(screen.getByTestId('memberpaysannual-member')).toBeTruthy()
    expect(screen.getAllByText(/John Smith/i).length).toBeGreaterThan(0)
  })

  it('displays payment method options', () => {
    render(<MemberPaysAnnual />)
    const paymentSelect = screen.getByTestId('memberpaysannual-payment-method')
    expect(paymentSelect).toBeTruthy()
  })
})
