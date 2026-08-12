import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildInventoryManagement from './BuildInventoryManagement'

describe('BuildInventoryManagement', () => {
  it('renders without crashing', () => {
    render(<BuildInventoryManagement />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<BuildInventoryManagement />)
    expect(screen.getByText('Inventory Management')).toBeTruthy()
  })

  it('displays stats cards', () => {
    render(<BuildInventoryManagement />)
    expect(screen.getByText('Total Items')).toBeTruthy()
    expect(screen.getByText('Low Stock Alerts')).toBeTruthy()
    const outOfStockElements = screen.getAllByText('Out of Stock')
    expect(outOfStockElements.length).toBeGreaterThan(0)
  })

  it('displays mock inventory items', () => {
    render(<BuildInventoryManagement />)
    expect(screen.getByText('Pale Ale Malt')).toBeTruthy()
    expect(screen.getByText('Cascade Hops')).toBeTruthy()
    expect(screen.getByText('US-05 Yeast')).toBeTruthy()
    expect(screen.getByText('Wheat Malt')).toBeTruthy()
    expect(screen.getByText('Citra Hops')).toBeTruthy()
  })

  it('displays search and filter controls', () => {
    render(<BuildInventoryManagement />)
    expect(screen.getByPlaceholderText('Search by name or supplier...')).toBeTruthy()
    const categoryLabels = screen.getAllByText('Category')
    expect(categoryLabels.length).toBeGreaterThan(0)
    expect(screen.getByText('Sort By')).toBeTruthy()
  })

  it('displays table headers', () => {
    render(<BuildInventoryManagement />)
    const itemHeaders = screen.getAllByText(/Item/i)
    const stockHeaders = screen.getAllByText(/Stock Level/i)
    
    expect(itemHeaders.length).toBeGreaterThan(0)
    expect(stockHeaders.length).toBeGreaterThan(0)
    expect(screen.getByText(/Supplier/i)).toBeTruthy()
    expect(screen.getAllByText(/Status/i).length).toBeGreaterThan(0)
  })

  it('displays status badges', () => {
    render(<BuildInventoryManagement />)
    const inStockElements = screen.getAllByText('In Stock')
    expect(inStockElements.length).toBeGreaterThan(0)
  })

  it('displays supplier information', () => {
    render(<BuildInventoryManagement />)
    const briessSuppliers = screen.getAllByText('Briess Malt & Ingredients')
    const yakimaSuppliers = screen.getAllByText('Yakima Chief Hops')
    const fermentisSuppliers = screen.getAllByText('Fermentis')
    
    expect(briessSuppliers.length).toBeGreaterThan(0)
    expect(yakimaSuppliers.length).toBeGreaterThan(0)
    expect(fermentisSuppliers.length).toBeGreaterThan(0)
  })

  it('displays action buttons', () => {
    render(<BuildInventoryManagement />)
    const editButtons = screen.getAllByText('Edit')
    const restockButtons = screen.getAllByText('Restock')
    
    expect(editButtons.length).toBeGreaterThan(0)
    expect(restockButtons.length).toBeGreaterThan(0)
  })
})
