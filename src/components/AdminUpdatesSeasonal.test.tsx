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
    expect(screen.getByText('Manage Seasonal Offerings')).toBeInTheDocument()
    expect(screen.getByText('Pumpkin Spice Latte')).toBeInTheDocument()
    expect(screen.getByText('Peppermint Mocha')).toBeInTheDocument()
    expect(screen.getByText('Iced Caramel Macchiato')).toBeInTheDocument()
    expect(screen.getByText('Cherry Blossom Tea')).toBeInTheDocument()
    expect(screen.getByText('Gingerbread Latte')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<AdminUpdatesSeasonal />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="adminupdatesseasonal"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="adminupdatesseasonal-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-season"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-price"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-available"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="adminupdatesseasonal-submit"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="adminupdatesseasonal-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="adminupdatesseasonal-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons (edit, toggle, delete)
    expect(document.querySelector('[data-testid="adminupdatesseasonal-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-toggle"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminupdatesseasonal-delete"]')).toBeTruthy()
  })

  it('displays form fields', () => {
    render(<AdminUpdatesSeasonal />)
    expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Season/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Available Now/i)).toBeInTheDocument()
  })

  it('displays seasonal offerings with details', () => {
    render(<AdminUpdatesSeasonal />)
    
    // Check for price display
    expect(screen.getByText('$5.99')).toBeInTheDocument()
    expect(screen.getByText('$6.49')).toBeInTheDocument()
    
    // Check for season badges (use getAllByText since some seasons appear multiple times)
    expect(screen.getAllByText('Fall').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Winter').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Summer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Spring').length).toBeGreaterThan(0)
  })
})
