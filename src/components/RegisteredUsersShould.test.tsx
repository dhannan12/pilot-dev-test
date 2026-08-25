import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUsersShould from './RegisteredUsersShould'

describe('RegisteredUsersShould', () => {
  it('renders without crashing', () => {
    render(<RegisteredUsersShould />)
    expect(document.body).toBeTruthy()
  })

  it('displays rewards tracking title', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText('My Rewards')).toBeTruthy()
    expect(screen.getByText('Track your points and redeem rewards')).toBeTruthy()
  })

  it('displays points summary', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText('Available Points')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-earned-points"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-spent-points"]')).toBeTruthy()
  })

  it('displays tier status', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText('Rewards Tier')).toBeTruthy()
  })

  it('displays transaction history', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText('Transaction History')).toBeTruthy()
    expect(screen.getByText('Coffee purchase - Large Latte')).toBeTruthy()
  })

  it('displays redeem rewards section', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText('Redeem Rewards')).toBeTruthy()
    expect(screen.getByText('Free Coffee')).toBeTruthy()
    expect(screen.getByText('Free Pastry')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUsersShould />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="registeredusersshould"]')).toBeTruthy()
    
    // Summary section
    expect(document.querySelector('[data-testid="registeredusersshould-summary"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-total-points"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-earned-points"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-spent-points"]')).toBeTruthy()
    
    // Tier section
    expect(document.querySelector('[data-testid="registeredusersshould-tier"]')).toBeTruthy()
    
    // History section
    expect(document.querySelector('[data-testid="registeredusersshould-history"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-item"]')).toBeTruthy()
    
    // Filter buttons
    expect(document.querySelector('[data-testid="registeredusersshould-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-filter-earned"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-filter-spent"]')).toBeTruthy()
    
    // Redeem section
    expect(document.querySelector('[data-testid="registeredusersshould-redeem"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-redeem-coffee"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-redeem-pastry"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-redeem-discount"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="registeredusersshould-redeem-merch"]')).toBeTruthy()
  })

  it('displays at least 5 mock transactions', () => {
    render(<RegisteredUsersShould />)
    const items = document.querySelectorAll('[data-testid="registeredusersshould-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
