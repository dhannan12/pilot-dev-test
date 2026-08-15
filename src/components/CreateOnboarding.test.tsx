import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateOnboarding from './CreateOnboarding'

describe('CreateOnboarding', () => {
  it('renders without crashing', () => {
    render(<CreateOnboarding />)
    expect(document.body).toBeTruthy()
  })

  it('displays the database schema header', () => {
    render(<CreateOnboarding />)
    const heading = screen.getByText(/Onboarding Database Schema/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock table data', () => {
    render(<CreateOnboarding />)
    // Check for table names using getAllByText since they appear multiple times
    expect(screen.getAllByText('employees').length).toBeGreaterThan(0)
    expect(screen.getAllByText('onboarding_checklists').length).toBeGreaterThan(0)
    expect(screen.getAllByText('departments').length).toBeGreaterThan(0)
  })

  it('displays statistics', () => {
    render(<CreateOnboarding />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    // Use getAllByText since 'Relationships' appears twice
    expect(screen.getAllByText('Relationships').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CreateOnboarding />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="createonboarding"]')).toBeTruthy()
    
    // Verify search input
    expect(document.querySelector('[data-testid="createonboarding-search"]')).toBeTruthy()
    
    // Verify list container
    expect(document.querySelector('[data-testid="createonboarding-list"]')).toBeTruthy()
    
    // Verify list items
    const items = document.querySelectorAll('[data-testid="createonboarding-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify action buttons
    expect(document.querySelector('[data-testid="createonboarding-export"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createonboarding-generate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createonboarding-edit"]')).toBeTruthy()
  })

  it('displays table details when a table is selected', () => {
    render(<CreateOnboarding />)
    // First table (employees) should be selected by default
    expect(screen.getByText(/Core employee information and profile data/i)).toBeTruthy()
    expect(screen.getByText('Fields')).toBeTruthy()
  })

  it('shows field information in the selected table', () => {
    render(<CreateOnboarding />)
    // Check for some field names from the employees table
    expect(screen.getByText('id')).toBeTruthy()
    expect(screen.getByText('first_name')).toBeTruthy()
    expect(screen.getByText('email')).toBeTruthy()
  })

  it('displays relationships for tables', () => {
    render(<CreateOnboarding />)
    // Use getAllByText since 'Relationships' appears twice (in stats and in table detail)
    expect(screen.getAllByText('Relationships').length).toBeGreaterThan(0)
  })
})
