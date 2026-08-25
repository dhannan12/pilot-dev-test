import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminUpdatesSeasonal from './AdminUpdatesSeasonal'

describe('AdminUpdatesSeasonal', () => {
  it('renders without crashing', () => {
    render(<AdminUpdatesSeasonal />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<AdminUpdatesSeasonal />)
    
    // Check for component title
    expect(screen.getByText('Manage Seasonal Offerings')).toBeTruthy()
    
    // Check for at least one mock item
    expect(screen.getByText('Pumpkin Spice Latte')).toBeTruthy()
    expect(screen.getByText('Peppermint Mocha')).toBeTruthy()
    expect(screen.getByText('Iced Lavender Honey Latte')).toBeTruthy()
    
    // Check for form elements
    expect(screen.getByText('Add New Offering')).toBeTruthy()
    expect(screen.getByText('Current Offerings')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminUpdatesSeasonal />)
    
    // Main wrapper
    expect(screen.getByTestId('adminupdatesseasonal')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('adminupdatesseasonal-name')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-description')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-price')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-season')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-startdate')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-enddate')).toBeTruthy()
    expect(screen.getByTestId('adminupdatesseasonal-isactive')).toBeTruthy()
    
    // Submit button
    expect(screen.getByTestId('adminupdatesseasonal-submit')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('adminupdatesseasonal-list')).toBeTruthy()
    
    // List items (should have multiple)
    const items = screen.getAllByTestId('adminupdatesseasonal-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons on items
    const editButtons = screen.getAllByTestId('adminupdatesseasonal-edit')
    expect(editButtons.length).toBeGreaterThan(0)
    
    const toggleButtons = screen.getAllByTestId('adminupdatesseasonal-toggle')
    expect(toggleButtons.length).toBeGreaterThan(0)
    
    const deleteButtons = screen.getAllByTestId('adminupdatesseasonal-delete')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('displays seasonal offering details', () => {
    render(<AdminUpdatesSeasonal />)
    
    // Check for price display (multiple items may have this price)
    const priceElements = screen.getAllByText(/\$5\.95/)
    expect(priceElements.length).toBeGreaterThan(0)
    
    // Check for season (multiple items may be Fall)
    const seasonElements = screen.getAllByText(/Fall/)
    expect(seasonElements.length).toBeGreaterThan(0)
    
    // Check for active status badge (multiple active items)
    const activeElements = screen.getAllByText('Active')
    expect(activeElements.length).toBeGreaterThan(0)
  })
})
