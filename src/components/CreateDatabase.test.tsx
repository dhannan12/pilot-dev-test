import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema title', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Design')).toBeTruthy()
    expect(screen.getByText(/Chinese Restaurant Takeaway System/i)).toBeTruthy()
  })

  it('displays all mock database tables', () => {
    render(<CreateDatabase />)
    const items = screen.getAllByTestId('createdatabase-item')
    expect(items.length).toBe(5)
    expect(screen.getAllByText('menu_items').length).toBeGreaterThan(0)
    expect(screen.getAllByText('orders').length).toBeGreaterThan(0)
    expect(screen.getAllByText('order_items').length).toBeGreaterThan(0)
    expect(screen.getAllByText('users').length).toBeGreaterThan(0)
    expect(screen.getAllByText('promotions').length).toBeGreaterThan(0)
  })

  it('shows table details when a table is clicked', () => {
    render(<CreateDatabase />)
    const tableItems = screen.getAllByTestId('createdatabase-item')
    fireEvent.click(tableItems[0])
    // After clicking, should show more detailed information
    expect(screen.getByText('Column Name')).toBeTruthy()
    expect(screen.getByText('Data Type')).toBeTruthy()
    expect(screen.getByText('Constraints')).toBeTruthy()
  })

  it('toggles SQL display when button is clicked', () => {
    render(<CreateDatabase />)
    const sqlButton = screen.getByTestId('createdatabase-toggle-sql')
    
    // Click to show SQL
    fireEvent.click(sqlButton)
    expect(screen.getByText('Hide SQL')).toBeTruthy()
    
    // Click to hide SQL
    fireEvent.click(sqlButton)
    expect(screen.getByText('Show SQL')).toBeTruthy()
  })

  it('resets table selection when reset button is clicked', () => {
    render(<CreateDatabase />)
    const tableItems = screen.getAllByTestId('createdatabase-item')
    const resetButton = screen.getByTestId('createdatabase-reset')
    
    // Select a table
    fireEvent.click(tableItems[0])
    
    // Reset selection
    fireEvent.click(resetButton)
    
    // Should no longer show the close button (which appears when a table is selected)
    const closeButtons = screen.queryAllByTestId('createdatabase-close')
    expect(closeButtons.length).toBe(0)
  })

  it('displays table relationships', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Table Relationships')).toBeTruthy()
    expect(screen.getByText(/user_id references users.id/i)).toBeTruthy()
    expect(screen.getByText(/order_id references orders.id/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Verify main wrapper
    expect(screen.getByTestId('createdatabase')).toBeTruthy()
    
    // Verify buttons
    expect(screen.getByTestId('createdatabase-toggle-sql')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-reset')).toBeTruthy()
    
    // Verify list container and items
    expect(screen.getByTestId('createdatabase-list')).toBeTruthy()
    const items = screen.getAllByTestId('createdatabase-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('generates SQL CREATE TABLE statement when table is selected and SQL is shown', () => {
    render(<CreateDatabase />)
    
    // Select a table
    const tableItems = screen.getAllByTestId('createdatabase-item')
    fireEvent.click(tableItems[0])
    
    // Show SQL
    const sqlButton = screen.getByTestId('createdatabase-toggle-sql')
    fireEvent.click(sqlButton)
    
    // Verify SQL is displayed
    const sqlElement = screen.getByTestId('createdatabase-sql')
    expect(sqlElement).toBeTruthy()
    expect(sqlElement.textContent).toContain('CREATE TABLE')
  })
})
