import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserTriesTo from './UserTriesTo'

describe('UserTriesTo', () => {
  it('renders without crashing', () => {
    render(<UserTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main component wrapper', () => {
    render(<UserTriesTo />)
    const wrapper = screen.getByTestId('usertriesto')
    expect(wrapper).toBeTruthy()
  })

  it('displays no goal set alert message', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Wellness Goal Not Set/i)).toBeTruthy()
    expect(screen.getByText(/To access personalized insights/i)).toBeTruthy()
  })

  it('displays mock insights data', () => {
    render(<UserTriesTo />)
    expect(screen.getByText('Sleep Quality Analysis')).toBeTruthy()
    expect(screen.getByText('Activity Trends')).toBeTruthy()
    expect(screen.getByText('Nutrition Balance')).toBeTruthy()
    expect(screen.getByText('Stress Management')).toBeTruthy()
    expect(screen.getByText('Health Score')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserTriesTo />)
    // Main wrapper
    expect(document.querySelector('[data-testid="usertriesto"]')).toBeTruthy()
    // Setup goal button
    expect(document.querySelector('[data-testid="usertriesto-setup-goal"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="usertriesto-list"]')).toBeTruthy()
    // List items (should be 5)
    const items = document.querySelectorAll('[data-testid="usertriesto-item"]')
    expect(items.length).toBe(5)
  })

  it('shows modal when insight is clicked', () => {
    render(<UserTriesTo />)
    const firstInsight = document.querySelector('[data-testid="usertriesto-item"]')
    expect(firstInsight).toBeTruthy()
    
    if (firstInsight) {
      fireEvent.click(firstInsight)
      const modal = screen.getByTestId('usertriesto-modal')
      expect(modal).toBeTruthy()
      expect(screen.getByText(/Insight Locked/i)).toBeTruthy()
    }
  })

  it('modal has required buttons with data-testid', () => {
    render(<UserTriesTo />)
    const firstInsight = document.querySelector('[data-testid="usertriesto-item"]')
    
    if (firstInsight) {
      fireEvent.click(firstInsight)
      expect(document.querySelector('[data-testid="usertriesto-modal-setup"]')).toBeTruthy()
      expect(document.querySelector('[data-testid="usertriesto-modal-close"]')).toBeTruthy()
    }
  })

  it('closes modal when close button is clicked', () => {
    render(<UserTriesTo />)
    const firstInsight = document.querySelector('[data-testid="usertriesto-item"]')
    
    if (firstInsight) {
      fireEvent.click(firstInsight)
      expect(screen.getByTestId('usertriesto-modal')).toBeTruthy()
      
      const closeButton = screen.getByTestId('usertriesto-modal-close')
      fireEvent.click(closeButton)
      
      // Modal should be removed from DOM
      expect(document.querySelector('[data-testid="usertriesto-modal"]')).toBeFalsy()
    }
  })

  it('displays benefits section', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Why Set a Wellness Goal/i)).toBeTruthy()
    expect(screen.getByText('Personalized Tracking')).toBeTruthy()
    expect(screen.getByText('Progress Monitoring')).toBeTruthy()
    expect(screen.getByText('Smart Recommendations')).toBeTruthy()
  })
})
