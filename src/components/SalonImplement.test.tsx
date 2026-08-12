import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SalonImplement from './SalonImplement'

describe('SalonImplement', () => {
  it('renders without crashing', () => {
    render(<SalonImplement />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<SalonImplement />)
    expect(screen.getByText('Promotional Offers Management')).toBeTruthy()
  })

  it('displays manager access notification', () => {
    render(<SalonImplement />)
    expect(screen.getByText(/Manager Access Only/i)).toBeTruthy()
    expect(screen.getByText(/Only salon managers can implement promotional offers/i)).toBeTruthy()
  })

  it('displays create new offer button', () => {
    render(<SalonImplement />)
    expect(screen.getByText('+ Create New Offer')).toBeTruthy()
  })

  it('displays mock promotional offers', () => {
    render(<SalonImplement />)
    expect(screen.getByText('Summer Special - 20% Off')).toBeTruthy()
    expect(screen.getByText('New Client Welcome')).toBeTruthy()
    expect(screen.getByText('Color Treatment Package')).toBeTruthy()
    expect(screen.getByText('Weekend Warrior')).toBeTruthy()
    expect(screen.getByText('Loyalty Bonus')).toBeTruthy()
  })

  it('displays offer status badges', () => {
    render(<SalonImplement />)
    const activeBadges = screen.getAllByText('ACTIVE')
    expect(activeBadges.length).toBeGreaterThan(0)
    expect(screen.getByText('SCHEDULED')).toBeTruthy()
    expect(screen.getByText('INACTIVE')).toBeTruthy()
  })

  it('displays discount percentages', () => {
    render(<SalonImplement />)
    expect(screen.getByText('20% OFF')).toBeTruthy()
    expect(screen.getByText('15% OFF')).toBeTruthy()
    expect(screen.getByText('25% OFF')).toBeTruthy()
    expect(screen.getByText('10% OFF')).toBeTruthy()
    expect(screen.getByText('30% OFF')).toBeTruthy()
  })

  it('displays offer descriptions', () => {
    render(<SalonImplement />)
    expect(screen.getByText(/Get 20% off on all haircuts during summer season/i)).toBeTruthy()
    expect(screen.getByText(/First time clients get 15% off/i)).toBeTruthy()
  })

  it('displays valid period information', () => {
    render(<SalonImplement />)
    expect(screen.getAllByText(/Valid Period:/i).length).toBeGreaterThan(0)
  })

  it('displays applicable services', () => {
    render(<SalonImplement />)
    expect(screen.getAllByText(/Applicable Services:/i).length).toBeGreaterThan(0)
  })

  it('displays action buttons for each offer', () => {
    render(<SalonImplement />)
    const activateButtons = screen.getAllByText(/Activate/i)
    const deactivateButtons = screen.getAllByText(/Deactivate/i)
    const deleteButtons = screen.getAllByText(/Delete/i)
    
    expect(activateButtons.length + deactivateButtons.length).toBeGreaterThan(0)
    expect(deleteButtons.length).toBe(5) // 5 mock offers
  })
})
