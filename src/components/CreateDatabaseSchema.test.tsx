import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabaseSchema from './CreateDatabaseSchema'

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title', () => {
    render(<CreateDatabaseSchema />)
    const title = screen.getByText('HairSaloon Database Schema')
    expect(title).toBeTruthy()
  })

  it('displays all mock tables', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('customers')).toBeTruthy()
    expect(screen.getByText('stylists')).toBeTruthy()
    expect(screen.getByText('services')).toBeTruthy()
    expect(screen.getByText('appointments')).toBeTruthy()
    expect(screen.getByText('reviews')).toBeTruthy()
  })

  it('shows table count', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Tables (5)')).toBeTruthy()
  })

  it('displays select a table message when no table is selected', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Select a Table')).toBeTruthy()
    expect(screen.getByText('Choose a table from the list to view its schema details')).toBeTruthy()
  })

  it('shows table details when a table is clicked', () => {
    render(<CreateDatabaseSchema />)
    
    // Click on customers table
    const customersButton = screen.getByText('customers')
    fireEvent.click(customersButton)
    
    // Check for table description
    expect(screen.getByText('Store customer information')).toBeTruthy()
    
    // Check for column headers
    expect(screen.getByText('Column Name')).toBeTruthy()
    expect(screen.getByText('Data Type')).toBeTruthy()
    expect(screen.getByText('Constraints')).toBeTruthy()
  })

  it('displays column information for selected table', () => {
    render(<CreateDatabaseSchema />)
    
    // Click on customers table
    const customersButton = screen.getByText('customers')
    fireEvent.click(customersButton)
    
    // Check for specific columns
    expect(screen.getByText('id')).toBeTruthy()
    expect(screen.getByText('first_name')).toBeTruthy()
    expect(screen.getByText('email')).toBeTruthy()
  })

  it('highlights selected table', () => {
    render(<CreateDatabaseSchema />)
    
    const customersButton = screen.getByText('customers').closest('button')
    expect(customersButton?.classList.contains('bg-indigo-600')).toBe(false)
    
    fireEvent.click(customersButton!)
    expect(customersButton?.classList.contains('bg-indigo-600')).toBe(true)
  })

  it('displays quick stats for selected table', () => {
    render(<CreateDatabaseSchema />)
    
    // Click on customers table
    const customersButton = screen.getByText('customers')
    fireEvent.click(customersButton)
    
    // Check for stats section
    expect(screen.getByText('Quick Stats')).toBeTruthy()
    expect(screen.getByText('Total Columns')).toBeTruthy()
    expect(screen.getByText('Primary Keys')).toBeTruthy()
    expect(screen.getByText('Foreign Keys')).toBeTruthy()
  })

  it('shows foreign key relationships in appointments table', () => {
    render(<CreateDatabaseSchema />)
    
    // Click on appointments table
    const appointmentsButton = screen.getByText('appointments')
    fireEvent.click(appointmentsButton)
    
    // Check for foreign key indicators
    const fkBadges = screen.getAllByText('FK')
    expect(fkBadges.length).toBeGreaterThan(0)
  })
})
