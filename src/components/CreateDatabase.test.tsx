import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema manager title', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Manager')).toBeTruthy()
  })

  it('displays mock tables', () => {
    render(<CreateDatabase />)
    expect(screen.getAllByText('job_postings').length).toBeGreaterThan(0)
    expect(screen.getAllByText('departments').length).toBeGreaterThan(0)
    expect(screen.getAllByText('applications').length).toBeGreaterThan(0)
    expect(screen.getAllByText('employees').length).toBeGreaterThan(0)
    expect(screen.getAllByText('job_requirements').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelector('[data-testid="createdatabase-item"]')).toBeTruthy()
    
    // Key interactive buttons
    expect(document.querySelector('[data-testid="createdatabase-new-table"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-preview-sql"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-add-field"]')).toBeTruthy()
    
    // Fields list
    expect(document.querySelector('[data-testid="createdatabase-fields-list"]')).toBeTruthy()
  })

  it('shows table fields when a table is selected', () => {
    render(<CreateDatabase />)
    // First table should be selected by default
    expect(screen.getByText('Field Name')).toBeTruthy()
    expect(screen.getByText('Type')).toBeTruthy()
    expect(screen.getByText('Primary Key')).toBeTruthy()
  })

  it('displays table status badges', () => {
    render(<CreateDatabase />)
    expect(screen.getAllByText('created').length).toBeGreaterThan(0)
    expect(screen.getByText('draft')).toBeTruthy()
  })
})
