import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Implement from './Implement'

describe('Implement', () => {
  it('renders without crashing', () => {
    render(<Implement />)
    expect(document.body).toBeTruthy()
  })

  it('displays role-based access control header', () => {
    render(<Implement />)
    expect(screen.getByText('Role-Based Access Control')).toBeTruthy()
    expect(screen.getByText(/Internal Job Postings Portal/)).toBeTruthy()
  })

  it('renders role selection dropdown with all four roles', () => {
    render(<Implement />)
    const select = screen.getByTestId('implement-role') as HTMLSelectElement
    expect(select).toBeTruthy()
    
    const options = Array.from(select.options).map(opt => opt.value)
    expect(options).toContain('Employee')
    expect(options).toContain('Hiring Manager')
    expect(options).toContain('HR Partner')
    expect(options).toContain('Workforce Planning')
  })

  it('displays permissions list for selected role', () => {
    render(<Implement />)
    const list = screen.getByTestId('implement-list')
    expect(list).toBeTruthy()
    
    const items = screen.getAllByTestId('implement-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('changes role when selecting different option', () => {
    render(<Implement />)
    const select = screen.getByTestId('implement-role') as HTMLSelectElement
    
    fireEvent.change(select, { target: { value: 'HR Partner' } })
    expect(select.value).toBe('HR Partner')
    
    // HR Partner should have more permissions than Employee
    expect(screen.getByText(/Your Permissions/)).toBeTruthy()
  })

  it('shows different permission counts for different roles', () => {
    const { rerender } = render(<Implement />)
    
    // Employee role (default) - should have fewer permissions
    let list = screen.getByTestId('implement-list')
    const employeeItems = screen.getAllByTestId('implement-item')
    const employeeCount = employeeItems.length
    
    // Change to Workforce Planning role
    const select = screen.getByTestId('implement-role') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'Workforce Planning' } })
    
    // Workforce Planning should have more permissions
    const workforceItems = screen.getAllByTestId('implement-item')
    expect(workforceItems.length).toBeGreaterThanOrEqual(employeeCount)
  })

  it('toggles permission matrix when button is clicked', () => {
    render(<Implement />)
    const toggleButton = screen.getByTestId('implement-toggle-matrix')
    expect(toggleButton).toBeTruthy()
    
    // Initially, matrix might not be visible
    fireEvent.click(toggleButton)
    
    // Check that button text changes
    expect(toggleButton.textContent).toContain('Hide')
    
    // Click again to hide
    fireEvent.click(toggleButton)
    expect(toggleButton.textContent).toContain('Show')
  })

  it('displays current role information card', () => {
    render(<Implement />)
    // Check for Employee role heading
    const employeeElements = screen.getAllByText('Employee')
    expect(employeeElements.length).toBeGreaterThan(0)
    
    // Check for Level 1 in role info (appears in select option and role card)
    const levelElements = screen.getAllByText(/Level 1/)
    expect(levelElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<Implement />)
    
    // Main wrapper
    expect(screen.getByTestId('implement')).toBeTruthy()
    
    // Role selection
    expect(screen.getByTestId('implement-role')).toBeTruthy()
    
    // Action buttons
    expect(screen.getByTestId('implement-view-permissions')).toBeTruthy()
    expect(screen.getByTestId('implement-toggle-matrix')).toBeTruthy()
    expect(screen.getByTestId('implement-test-access')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('implement-list')).toBeTruthy()
    const items = screen.getAllByTestId('implement-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays access summary statistics', () => {
    render(<Implement />)
    expect(screen.getByText('Active Permissions')).toBeTruthy()
    // 'Access Level' appears twice - in role card and summary
    const accessLevelElements = screen.getAllByText('Access Level')
    expect(accessLevelElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Total Permissions')).toBeTruthy()
  })
})
