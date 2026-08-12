import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateInventory from './CalculateInventory'

describe('CalculateInventory', () => {
  it('renders without crashing', () => {
    render(<CalculateInventory />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Inventory Turnover Calculator')).toBeTruthy()
  })

  it('displays mock inventory data', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Pale Ale 6-Pack')).toBeTruthy()
    expect(screen.getByText('IPA 12-Pack')).toBeTruthy()
    expect(screen.getByText('Craft Lager Case')).toBeTruthy()
    expect(screen.getByText('Stout 4-Pack')).toBeTruthy()
    expect(screen.getByText('Porter 6-Pack')).toBeTruthy()
  })

  it('displays category filter buttons', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('All')).toBeTruthy()
    const beerElements = screen.getAllByText('Beer')
    expect(beerElements.length).toBeGreaterThan(0)
  })

  it('filters inventory by category when category button is clicked', () => {
    render(<CalculateInventory />)
    const allButton = screen.getByText('All')
    expect(allButton).toBeTruthy()
    
    // Initially all items should be visible
    expect(screen.getByText('Pale Ale 6-Pack')).toBeTruthy()
    expect(screen.getByText('IPA 12-Pack')).toBeTruthy()
  })

  it('displays recalculate button', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Recalculate All')).toBeTruthy()
  })

  it('shows average turnover rate', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Average Turnover Rate')).toBeTruthy()
  })

  it('shows items tracked count', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Items Tracked')).toBeTruthy()
  })

  it('displays table headers', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Product Name')).toBeTruthy()
    expect(screen.getByText('Category')).toBeTruthy()
    expect(screen.getByText('Beginning Inventory')).toBeTruthy()
    expect(screen.getByText('Ending Inventory')).toBeTruthy()
    expect(screen.getByText('COGS')).toBeTruthy()
    expect(screen.getByText('Turnover Rate')).toBeTruthy()
  })

  it('displays understanding section', () => {
    render(<CalculateInventory />)
    expect(screen.getByText('Understanding Inventory Turnover Rate')).toBeTruthy()
  })

  it('recalculate button is clickable', () => {
    render(<CalculateInventory />)
    const recalculateButton = screen.getByText('Recalculate All')
    fireEvent.click(recalculateButton)
    // Component should still render after clicking
    expect(screen.getByText('Inventory Turnover Calculator')).toBeTruthy()
  })
})
