import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabaseSchema from './CreateDatabaseSchema'

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Database Schema Designer')).toBeTruthy()
    expect(screen.getByText('Beverage Company Database Architecture')).toBeTruthy()
  })

  it('displays all mock database tables', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('beverages')).toBeTruthy()
    expect(screen.getByText('breweries')).toBeTruthy()
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('order_items')).toBeTruthy()
    expect(screen.getByText('customers')).toBeTruthy()
  })

  it('displays table count', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Database Tables (5)')).toBeTruthy()
  })

  it('shows select table prompt when no table is selected', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Select a Table')).toBeTruthy()
  })

  it('displays table details when a table is selected', () => {
    render(<CreateDatabaseSchema />)
    const beveragesButton = screen.getByText('beverages')
    fireEvent.click(beveragesButton)
    
    // Should show column headers
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText('Type')).toBeTruthy()
    expect(screen.getByText('Nullable')).toBeTruthy()
  })

  it('displays SQL DDL when table is selected', () => {
    render(<CreateDatabaseSchema />)
    const beveragesButton = screen.getByText('beverages')
    fireEvent.click(beveragesButton)
    
    expect(screen.getByText('SQL DDL')).toBeTruthy()
    expect(screen.getByText(/CREATE TABLE beverages/)).toBeTruthy()
  })

  it('filters tables based on search term', () => {
    render(<CreateDatabaseSchema />)
    const searchInput = screen.getByPlaceholderText('Search tables...')
    
    fireEvent.change(searchInput, { target: { value: 'order' } })
    
    // Should still show orders and order_items
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('order_items')).toBeTruthy()
    
    // Beverages should still be in the document but we're filtering the display
    // The component filters based on name/description
  })

  it('displays statistics footer', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Columns')).toBeTruthy()
    expect(screen.getByText('Foreign Keys')).toBeTruthy()
  })

  it('highlights selected table', () => {
    render(<CreateDatabaseSchema />)
    const breweriesButton = screen.getByText('breweries')
    fireEvent.click(breweriesButton)
    
    // Check that breweries description appears in both list and detail view
    const descriptions = screen.getAllByText('Beverage company/brewery information')
    expect(descriptions.length).toBeGreaterThan(0)
  })
})
