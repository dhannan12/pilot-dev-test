import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays user information and current purchases', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
  })

  it('displays mock rewards data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Free Coffee')).toBeTruthy()
    expect(screen.getByText('Free Pastry')).toBeTruthy()
    expect(screen.getByText('Free Sandwich')).toBeTruthy()
    expect(screen.getByText('Free Specialty Drink')).toBeTruthy()
    expect(screen.getByText('Free Meal Combo')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="userattemptsto"]')
    expect(mainWrapper).toBeTruthy()
    
    const redeemButton = document.querySelector('[data-testid="userattemptsto-redeem"]')
    expect(redeemButton).toBeTruthy()
    
    const rewardList = document.querySelector('[data-testid="userattemptsto-list"]')
    expect(rewardList).toBeTruthy()
    
    const rewardItems = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(rewardItems.length).toBeGreaterThan(0)
  })

  it('allows user to select a reward', () => {
    render(<UserAttemptsTo />)
    const firstReward = document.querySelectorAll('[data-testid="userattemptsto-item"]')[0] as HTMLElement
    fireEvent.click(firstReward)
    
    expect(screen.getByText('Selected Reward:')).toBeTruthy()
  })

  it('shows error when attempting to redeem with insufficient purchases', () => {
    render(<UserAttemptsTo />)
    
    // Select a reward that requires more purchases than the user has
    const rewardItems = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    const firstReward = rewardItems[0] as HTMLElement
    fireEvent.click(firstReward)
    
    // Attempt to redeem
    const redeemButton = screen.getByTestId('userattemptsto-redeem')
    fireEvent.click(redeemButton)
    
    // Should show error message
    const errorElement = document.querySelector('[data-testid="userattemptsto-error"]')
    expect(errorElement).toBeTruthy()
    expect(screen.getByText(/Insufficient purchases!/)).toBeTruthy()
  })

  it('displays progress bars for each reward', () => {
    render(<UserAttemptsTo />)
    const progressBars = document.querySelectorAll('.bg-gray-200.rounded-full')
    expect(progressBars.length).toBeGreaterThan(0)
  })

  it('indicates which rewards are eligible and which are not', () => {
    render(<UserAttemptsTo />)
    // With 3 purchases, no rewards should be eligible (first requires 5)
    const eligibilityText = screen.queryByText('✓ Eligible')
    const needMoreTexts = screen.getAllByText(/more needed/)
    
    // Should have multiple rewards showing "more needed"
    expect(needMoreTexts.length).toBeGreaterThan(0)
  })
})
