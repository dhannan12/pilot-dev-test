import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupDatabase from './SetupDatabase'

describe('SetupDatabase', () => {
  it('renders without crashing', () => {
    render(<SetupDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with multiple tables', () => {
    render(<SetupDatabase />)
    // Check for table names from mock data
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('products')).toBeTruthy()
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('categories')).toBeTruthy()
    expect(screen.getByText('sessions')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupDatabase />)
    // Main wrapper
    expect(document.querySelector('[data-testid="setupdatabase"]')).toBeTruthy()
    // Filter select
    expect(document.querySelector('[data-testid="setupdatabase-filter"]')).toBeTruthy()
    // Initialize all button
    expect(document.querySelector('[data-testid="setupdatabase-initializeall"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="setupdatabase-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="setupdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays database statistics', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Database Statistics')).toBeTruthy()
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Active Tables')).toBeTruthy()
    expect(screen.getByText('Pending Tables')).toBeTruthy()
  })

  it('shows table columns and schema details', () => {
    render(<SetupDatabase />)
    // Check for column information displayed - multiple tables will have this text
    const columnTexts = screen.getAllByText(/columns/i)
    expect(columnTexts.length).toBeGreaterThan(0)
    const recordTexts = screen.getAllByText(/records/i)
    expect(recordTexts.length).toBeGreaterThan(0)
  })

  it('displays status badges for tables', () => {
    render(<SetupDatabase />)
    // Check for status text (active, initialized, pending)
    const statusElements = document.querySelectorAll('.text-xs.font-medium')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('has action buttons for table management', () => {
    render(<SetupDatabase />)
    // Should have initialize or activate buttons depending on status
    const buttons = document.querySelectorAll('button[data-testid*="setupdatabase-"]')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
