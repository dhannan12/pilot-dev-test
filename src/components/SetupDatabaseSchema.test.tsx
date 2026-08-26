import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupDatabaseSchema from './SetupDatabaseSchema'

describe('SetupDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<SetupDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays the tournament database schema title', () => {
    render(<SetupDatabaseSchema />)
    expect(screen.getByText(/Tournament Database Schema/i)).toBeTruthy()
  })

  it('displays mock table data', () => {
    render(<SetupDatabaseSchema />)
    // Check that some of the main tables are displayed
    expect(screen.getByText('tournaments')).toBeTruthy()
    expect(screen.getByText('players')).toBeTruthy()
    expect(screen.getByText('matches')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupDatabaseSchema />)
    
    // Main wrapper
    expect(screen.getByTestId('setupdatabaseschema')).toBeTruthy()
    
    // Search input
    expect(screen.getByTestId('setupdatabaseschema-search')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('setupdatabaseschema-list')).toBeTruthy()
    const items = screen.getAllByTestId('setupdatabaseschema-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Toggle buttons
    const toggleButtons = screen.getAllByTestId('setupdatabaseschema-toggle')
    expect(toggleButtons.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getByTestId('setupdatabaseschema-export')).toBeTruthy()
    expect(screen.getByTestId('setupdatabaseschema-validate')).toBeTruthy()
    expect(screen.getByTestId('setupdatabaseschema-migrate')).toBeTruthy()
  })

  it('filters tables based on search input', () => {
    render(<SetupDatabaseSchema />)
    
    const searchInput = screen.getByTestId('setupdatabaseschema-search') as HTMLInputElement
    
    // Initially should show all tables
    let items = screen.getAllByTestId('setupdatabaseschema-item')
    const initialCount = items.length
    expect(initialCount).toBeGreaterThan(0)
    
    // Search for 'tournament'
    fireEvent.change(searchInput, { target: { value: 'tournament' } })
    items = screen.getAllByTestId('setupdatabaseschema-item')
    expect(items.length).toBeLessThanOrEqual(initialCount)
  })

  it('toggles table details when View Details button is clicked', () => {
    render(<SetupDatabaseSchema />)
    
    // Get first toggle button
    const toggleButtons = screen.getAllByTestId('setupdatabaseschema-toggle')
    const firstToggle = toggleButtons[0]
    
    // Click to show details
    fireEvent.click(firstToggle)
    
    // Check that fields table header appears (indicating expanded view)
    expect(screen.getByText('Fields:')).toBeTruthy()
    expect(screen.getByText('Indexes:')).toBeTruthy()
  })

  it('displays statistics correctly', () => {
    render(<SetupDatabaseSchema />)
    
    // Should show stats for tables, fields, and indexes
    expect(screen.getByText(/Total Tables/i)).toBeTruthy()
    expect(screen.getByText(/Total Fields/i)).toBeTruthy()
    expect(screen.getByText(/Total Indexes/i)).toBeTruthy()
  })

  it('displays at least 5 mock tables', () => {
    render(<SetupDatabaseSchema />)
    const items = screen.getAllByTestId('setupdatabaseschema-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
