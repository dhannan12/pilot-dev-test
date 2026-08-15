import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DatabaseSchemaSetup from './DatabaseSchemaSetup'

describe('DatabaseSchemaSetup', () => {
  it('renders without crashing', () => {
    render(<DatabaseSchemaSetup />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema setup title', () => {
    render(<DatabaseSchemaSetup />)
    expect(screen.getByText('Database Schema Setup')).toBeTruthy()
  })

  it('displays mock table data', () => {
    render(<DatabaseSchemaSetup />)
    expect(screen.getByText('claims')).toBeTruthy()
    expect(screen.getByText('claimants')).toBeTruthy()
    expect(screen.getByText('adjusters')).toBeTruthy()
    expect(screen.getByText('documents')).toBeTruthy()
    expect(screen.getByText('claim_notes')).toBeTruthy()
  })

  it('shows status summary cards', () => {
    render(<DatabaseSchemaSetup />)
    expect(screen.getByText('Created')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('Migrating')).toBeTruthy()
    expect(screen.getByText('Errors')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DatabaseSchemaSetup />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="database-schema-setup"]')).toBeTruthy()
    
    // Filter select
    expect(document.querySelector('[data-testid="database-schema-setup-status-filter"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="database-schema-setup-validate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="database-schema-setup-migrate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="database-schema-setup-export"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="database-schema-setup-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelectorAll('[data-testid="database-schema-setup-item"]').length).toBeGreaterThan(0)
  })

  it('filters tables by status', () => {
    render(<DatabaseSchemaSetup />)
    const filterSelect = document.querySelector('[data-testid="database-schema-setup-status-filter"]') as HTMLSelectElement
    
    // Change to 'created' filter
    fireEvent.change(filterSelect, { target: { value: 'created' } })
    
    // Should still show tables
    const items = document.querySelectorAll('[data-testid="database-schema-setup-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('selects a table and shows details', () => {
    render(<DatabaseSchemaSetup />)
    const firstItem = document.querySelector('[data-testid="database-schema-setup-item"]') as HTMLElement
    
    // Click the first table
    fireEvent.click(firstItem)
    
    // Details should be visible
    expect(document.querySelector('[data-testid="database-schema-setup-details"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="database-schema-setup-view-sql"]')).toBeTruthy()
  })

  it('displays table column information', () => {
    render(<DatabaseSchemaSetup />)
    const firstItem = document.querySelector('[data-testid="database-schema-setup-item"]') as HTMLElement
    
    // Click to select table
    fireEvent.click(firstItem)
    
    // Should show column details
    expect(screen.getByText(/Columns/)).toBeTruthy()
  })

  it('shows relationship information for tables', () => {
    render(<DatabaseSchemaSetup />)
    const firstItem = document.querySelector('[data-testid="database-schema-setup-item"]') as HTMLElement
    
    // Click to select table
    fireEvent.click(firstItem)
    
    // Should show relationships section
    expect(screen.getByText(/Relationships:/)).toBeTruthy()
  })
})
