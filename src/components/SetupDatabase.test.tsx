import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupDatabase from './SetupDatabase'

describe('SetupDatabase', () => {
  it('renders without crashing', () => {
    render(<SetupDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema title', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Database Schema Setup')).toBeTruthy()
  })

  it('displays mock database tables', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('health_metrics')).toBeTruthy()
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('activity_logs')).toBeTruthy()
    expect(screen.getByText('medications')).toBeTruthy()
    expect(screen.getByText('appointments')).toBeTruthy()
    expect(screen.getByText('sleep_tracking')).toBeTruthy()
  })

  it('displays table statuses', () => {
    render(<SetupDatabase />)
    const readyElements = screen.getAllByText('ready')
    expect(readyElements.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Ready')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Total Records')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupDatabase />)
    // Main wrapper
    expect(screen.getByTestId('setupdatabase')).toBeTruthy()
    // List container
    expect(screen.getByTestId('setupdatabase-list')).toBeTruthy()
    // List items
    const items = screen.getAllByTestId('setupdatabase-item')
    expect(items.length).toBeGreaterThan(0)
    // Buttons
    expect(screen.getByTestId('setupdatabase-create-table')).toBeTruthy()
  })

  it('displays action buttons when table is selected', () => {
    render(<SetupDatabase />)
    const firstItem = screen.getAllByTestId('setupdatabase-item')[0]
    fireEvent.click(firstItem)
    
    // Action buttons should be present
    expect(screen.getByTestId('setupdatabase-migrate')).toBeTruthy()
    expect(screen.getByTestId('setupdatabase-export')).toBeTruthy()
    expect(screen.getByTestId('setupdatabase-delete')).toBeTruthy()
    expect(screen.getByTestId('setupdatabase-toggle-fields')).toBeTruthy()
  })
})
