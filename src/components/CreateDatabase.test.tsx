import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main component with correct heading', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Management')).toBeTruthy()
    expect(screen.getByText('Create and manage database schemas and tables')).toBeTruthy()
  })

  it('displays schemas tab by default', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('New Schema')).toBeTruthy()
    expect(screen.getByText('public')).toBeTruthy()
    expect(screen.getByText('Default public schema')).toBeTruthy()
  })

  it('displays mock schemas data', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('public')).toBeTruthy()
    expect(screen.getByText('auth')).toBeTruthy()
    expect(screen.getByText('inventory')).toBeTruthy()
    expect(screen.getByText('rentals')).toBeTruthy()
    expect(screen.getByText('analytics')).toBeTruthy()
  })

  it('switches to tables tab when clicked', () => {
    render(<CreateDatabase />)
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    expect(screen.getByText('New Table')).toBeTruthy()
  })

  it('displays mock tables data in tables tab', () => {
    render(<CreateDatabase />)
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('equipment')).toBeTruthy()
  })

  it('shows schema form when New Schema button is clicked', () => {
    render(<CreateDatabase />)
    const newSchemaBtn = screen.getByTestId('createdatabase-new-schema')
    fireEvent.click(newSchemaBtn)
    expect(screen.getByText('Create New Schema')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-name')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-description')).toBeTruthy()
  })

  it('shows table form when New Table button is clicked', () => {
    render(<CreateDatabase />)
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    const newTableBtn = screen.getByTestId('createdatabase-new-table')
    fireEvent.click(newTableBtn)
    expect(screen.getByText('Create New Table')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-name')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-schema')).toBeTruthy()
  })

  it('allows adding fields to table', () => {
    render(<CreateDatabase />)
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    const newTableBtn = screen.getByTestId('createdatabase-new-table')
    fireEvent.click(newTableBtn)
    
    const addFieldBtn = screen.getByTestId('createdatabase-add-field')
    fireEvent.click(addFieldBtn)
    
    const fieldItems = screen.getAllByTestId('createdatabase-field-item')
    expect(fieldItems.length).toBeGreaterThan(1)
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(screen.getByTestId('createdatabase')).toBeTruthy()
    
    // Tab buttons
    expect(screen.getByTestId('createdatabase-schemas-tab')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-tables-tab')).toBeTruthy()
    
    // Schema-related elements
    expect(screen.getByTestId('createdatabase-new-schema')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-list')).toBeTruthy()
    
    const schemaItems = screen.getAllByTestId('createdatabase-schema-item')
    expect(schemaItems.length).toBeGreaterThanOrEqual(5)
    
    // Switch to tables tab
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    
    // Table-related elements
    expect(screen.getByTestId('createdatabase-new-table')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-list')).toBeTruthy()
    
    const tableItems = screen.getAllByTestId('createdatabase-table-item')
    expect(tableItems.length).toBeGreaterThanOrEqual(2)
  })

  it('has data-testid on all form inputs', () => {
    render(<CreateDatabase />)
    
    // Show schema form
    const newSchemaBtn = screen.getByTestId('createdatabase-new-schema')
    fireEvent.click(newSchemaBtn)
    
    expect(screen.getByTestId('createdatabase-schema-name')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-description')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-submit')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-schema-cancel')).toBeTruthy()
    
    // Switch to tables tab
    const tablesTab = screen.getByTestId('createdatabase-tables-tab')
    fireEvent.click(tablesTab)
    
    // Show table form
    const newTableBtn = screen.getByTestId('createdatabase-new-table')
    fireEvent.click(newTableBtn)
    
    expect(screen.getByTestId('createdatabase-table-name')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-schema')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-add-field')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-fields-list')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-submit')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-table-cancel')).toBeTruthy()
  })
})
