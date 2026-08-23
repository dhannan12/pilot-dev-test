import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RegisteredUsersShould from './RegisteredUsersShould'

describe('RegisteredUsersShould', () => {
  it('renders without crashing', () => {
    render(<RegisteredUsersShould />)
    expect(document.body).toBeTruthy()
  })

  it('displays user rewards points balance', () => {
    render(<RegisteredUsersShould />)
    const pointsBalance = screen.getByTestId('registeredusersshould-points-balance')
    expect(pointsBalance).toBeTruthy()
    expect(pointsBalance.textContent).toBe('450')
  })

  it('displays mock transaction data', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText(/Purchase: Large Cappuccino/i)).toBeTruthy()
    expect(screen.getByText(/Purchase: Espresso/i)).toBeTruthy()
    expect(screen.getByText(/Redeemed: Free Medium Coffee/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<RegisteredUsersShould />)
    
    // Verify main wrapper
    expect(screen.getByTestId('registeredusersshould')).toBeTruthy()
    
    // Verify tab buttons
    expect(screen.getByTestId('registeredusersshould-tab-transactions')).toBeTruthy()
    expect(screen.getByTestId('registeredusersshould-tab-rewards')).toBeTruthy()
    
    // Verify points balance
    expect(screen.getByTestId('registeredusersshould-points-balance')).toBeTruthy()
    
    // Verify list container and items
    expect(screen.getByTestId('registeredusersshould-list')).toBeTruthy()
    expect(screen.getAllByTestId('registeredusersshould-item').length).toBeGreaterThan(0)
  })

  it('displays transaction history by default', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByTestId('registeredusersshould-transactions-section')).toBeTruthy()
  })

  it('displays multiple transaction items', () => {
    render(<RegisteredUsersShould />)
    const items = screen.getAllByTestId('registeredusersshould-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays reward cards with redeem buttons', () => {
    render(<RegisteredUsersShould />)
    
    // Switch to rewards tab
    const rewardsTab = screen.getByTestId('registeredusersshould-tab-rewards')
    fireEvent.click(rewardsTab)
    
    // Verify rewards section appears
    expect(screen.getByTestId('registeredusersshould-rewards-section')).toBeTruthy()
    
    // Verify reward cards exist
    const rewardCards = screen.getAllByTestId('registeredusersshould-reward-card')
    expect(rewardCards.length).toBeGreaterThanOrEqual(5)
  })

  it('shows tier membership status', () => {
    render(<RegisteredUsersShould />)
    expect(screen.getByText(/Gold Member/i)).toBeTruthy()
  })
})
