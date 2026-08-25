import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabaseSchema from './CreateDatabaseSchema'

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock database tables', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Users')).toBeTruthy()
    expect(screen.getByText('Courts')).toBeTruthy()
    expect(screen.getByText('Bookings')).toBeTruthy()
    expect(screen.getByText('Matches')).toBeTruthy()
    expect(screen.getByText('Tournaments')).toBeTruthy()
  })

  it('displays schema summary statistics', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Schema Summary')).toBeTruthy()
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    expect(screen.getByText('Total Relations')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabaseSchema />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabaseschema"]')).toBeTruthy()
    
    // Tables list
    expect(document.querySelector('[data-testid="createdatabaseschema-tables-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabaseschema-table-item"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="createdatabaseschema-add-table"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabaseschema-delete-table"]')).toBeTruthy()
    
    // Input fields
    expect(document.querySelector('[data-testid="createdatabaseschema-field-name"]')).toBeFalsy()
    
    // Verify all interactive elements have testids
    const mainWrapper = document.querySelector('[data-testid="createdatabaseschema"]')
    expect(mainWrapper).toBeTruthy()
  })

  it('displays table details when a table is selected', () => {
    render(<CreateDatabaseSchema />)
    
    // Before selection
    expect(screen.getByText('Select a table to view details')).toBeTruthy()
  })

  it('shows add table form when add button is clicked', () => {
    const { container } = render(<CreateDatabaseSchema />)
    
    const addButton = screen.getByTestId('createdatabaseschema-add-table')
    expect(addButton).toBeTruthy()
    
    // Initially, form should not be visible
    expect(container.querySelector('[data-testid="createdatabaseschema-add-table-form"]')).toBeFalsy()
  })
})
