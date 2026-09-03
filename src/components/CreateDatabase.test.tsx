import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema title and description', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Database Schema Designer/i)).toBeTruthy()
    expect(screen.getByText(/Hair Salon Booking System/i)).toBeTruthy()
  })

  it('displays all mock tables', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('customers')).toBeTruthy()
    expect(screen.getByText('stylists')).toBeTruthy()
    expect(screen.getByText('services')).toBeTruthy()
    expect(screen.getByText('appointments')).toBeTruthy()
    expect(screen.getByText('notifications')).toBeTruthy()
  })

  it('displays table descriptions', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Customer account information/i)).toBeTruthy()
    expect(screen.getByText(/Stylist profiles and availability/i)).toBeTruthy()
    expect(screen.getByText(/Available salon services/i)).toBeTruthy()
  })

  it('shows schema overview initially', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Schema Overview')).toBeTruthy()
    expect(screen.getByText(/Total Tables:/i)).toBeTruthy()
  })

  it('selects a table when clicked', () => {
    render(<CreateDatabase />)
    const items = screen.getAllByTestId('createdatabase-item')
    fireEvent.click(items[0])
    expect(screen.getByText('Table Details')).toBeTruthy()
  })

  it('displays table statistics when selected', () => {
    render(<CreateDatabase />)
    const items = screen.getAllByTestId('createdatabase-item')
    fireEvent.click(items[0])
    expect(screen.getByText(/Total Fields:/i)).toBeTruthy()
    expect(screen.getByText(/Primary Keys:/i)).toBeTruthy()
    expect(screen.getByText(/Foreign Keys:/i)).toBeTruthy()
  })

  it('clears selection when clear button is clicked', () => {
    render(<CreateDatabase />)
    const items = screen.getAllByTestId('createdatabase-item')
    fireEvent.click(items[0])
    expect(screen.getByText('Table Details')).toBeTruthy()
    
    const clearButton = screen.getByTestId('createdatabase-clear-selection')
    fireEvent.click(clearButton)
    expect(screen.getByText('Schema Overview')).toBeTruthy()
  })

  it('toggles SQL preview when button is clicked', () => {
    render(<CreateDatabase />)
    const toggleButton = screen.getByTestId('createdatabase-toggle-sql')
    
    // Initially SQL is hidden
    expect(screen.queryByTestId('createdatabase-sql-output')).toBeFalsy()
    
    // Click to show SQL
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('createdatabase-sql-output')).toBeTruthy()
    const createTableElements = screen.getAllByText(/CREATE TABLE/i)
    expect(createTableElements.length).toBeGreaterThan(0)
    
    // Click again to hide
    fireEvent.click(toggleButton)
    expect(screen.queryByTestId('createdatabase-sql-output')).toBeFalsy()
  })

  it('validates schema when validate button is clicked', () => {
    render(<CreateDatabase />)
    const validateButton = screen.getByTestId('createdatabase-validate')
    fireEvent.click(validateButton)
    expect(screen.getByText(/Validating/i)).toBeTruthy()
  })

  it('displays field types and constraints', () => {
    render(<CreateDatabase />)
    expect(screen.getAllByText(/UUID/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/VARCHAR/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/NOT NULL/i).length).toBeGreaterThan(0)
  })

  it('shows primary key and foreign key indicators', () => {
    render(<CreateDatabase />)
    const pkElements = screen.getAllByText('PK')
    const fkElements = screen.getAllByText('FK')
    expect(pkElements.length).toBeGreaterThan(0)
    expect(fkElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(screen.getByTestId('createdatabase')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('createdatabase-validate')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-toggle-sql')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-export')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('createdatabase-list')).toBeTruthy()
    const items = screen.getAllByTestId('createdatabase-item')
    expect(items.length).toBe(5)
  })

  it('displays relationship information', () => {
    render(<CreateDatabase />)
    expect(screen.getAllByText(/Relationships:/i).length).toBeGreaterThan(0)
  })

  it('shows correct number of fields for each table', () => {
    render(<CreateDatabase />)
    const fieldCounts = screen.getAllByText(/\d+ fields/)
    expect(fieldCounts.length).toBe(5) // One for each table
  })
})
