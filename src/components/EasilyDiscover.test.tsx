import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EasilyDiscover from './EasilyDiscover'

describe('EasilyDiscover', () => {
  it('renders without crashing', () => {
    render(<EasilyDiscover />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('Discover New Craft Beverages')).toBeTruthy()
  })

  it('displays mock beverage data', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('Hazy Dream IPA')).toBeTruthy()
    expect(screen.getByText('Midnight Stout')).toBeTruthy()
    expect(screen.getByText('Golden Wheat Ale')).toBeTruthy()
    expect(screen.getByText('Amber Horizon Lager')).toBeTruthy()
    expect(screen.getByText('Tropical Sour')).toBeTruthy()
  })

  it('shows at least 5 beverages', () => {
    render(<EasilyDiscover />)
    const beverages = screen.getAllByRole('img')
    expect(beverages.length).toBeGreaterThanOrEqual(5)
  })

  it('allows selecting a beverage', () => {
    render(<EasilyDiscover />)
    const initialSelectedCount = screen.getByText(/Selected:/)
    expect(initialSelectedCount.textContent).toContain('0')
    
    const beverageCard = screen.getByText('Hazy Dream IPA').closest('div')?.parentElement
    if (beverageCard) {
      fireEvent.click(beverageCard)
      const updatedSelectedCount = screen.getByText(/Selected:/)
      expect(updatedSelectedCount.textContent).toContain('1')
    }
  })

  it('displays validation message when no beverages selected', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('(Select at least 1)')).toBeTruthy()
  })

  it('can filter by beverage type', () => {
    render(<EasilyDiscover />)
    const filterSelect = screen.getByLabelText('Filter by Type') as HTMLSelectElement
    
    fireEvent.change(filterSelect, { target: { value: 'IPA' } })
    
    expect(screen.getByText('Hazy Dream IPA')).toBeTruthy()
  })

  it('shows new arrivals filter checkbox', () => {
    render(<EasilyDiscover />)
    const newOnlyCheckbox = screen.getByLabelText('Show New Arrivals Only')
    expect(newOnlyCheckbox).toBeTruthy()
  })

  it('displays beverage details including price and rating', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('$8.99')).toBeTruthy()
    expect(screen.getByText('4.5')).toBeTruthy()
  })

  it('shows continue button with item count', () => {
    render(<EasilyDiscover />)
    const continueButton = screen.getByText(/Continue with/)
    expect(continueButton).toBeTruthy()
    expect(continueButton.textContent).toContain('0 items')
  })

  it('updates continue button when beverages are selected', () => {
    render(<EasilyDiscover />)
    
    const beverageCard = screen.getByText('Tropical Sour').closest('div')?.parentElement
    if (beverageCard) {
      fireEvent.click(beverageCard)
      const continueButton = screen.getByText(/Continue with/)
      expect(continueButton.textContent).toContain('1 item')
    }
  })

  it('displays brewery information for each beverage', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('Sunset Brewing Co.')).toBeTruthy()
    expect(screen.getByText('Dark Horse Brewery')).toBeTruthy()
    expect(screen.getByText('Harvest Fields Brewery')).toBeTruthy()
  })

  it('shows ABV and IBU information', () => {
    render(<EasilyDiscover />)
    expect(screen.getByText('6.8% ABV')).toBeTruthy()
    expect(screen.getByText('55 IBU')).toBeTruthy()
  })

  it('allows deselecting a beverage', () => {
    render(<EasilyDiscover />)
    
    const beverageCard = screen.getByText('Golden Wheat Ale').closest('div')?.parentElement
    if (beverageCard) {
      // Select
      fireEvent.click(beverageCard)
      let selectedCount = screen.getByText(/Selected:/)
      expect(selectedCount.textContent).toContain('1')
      
      // Deselect
      fireEvent.click(beverageCard)
      selectedCount = screen.getByText(/Selected:/)
      expect(selectedCount.textContent).toContain('0')
    }
  })
})
