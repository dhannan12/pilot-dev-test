import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesProgress from './SystemCalculatesProgress'

describe('SystemCalculatesProgress', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesProgress />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock employee data', () => {
    render(<SystemCalculatesProgress />)
    // Use getAllByText since names appear in both list and detail view
    expect(screen.getAllByText('Alice Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bob Smith').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Carol Davis').length).toBeGreaterThan(0)
    expect(screen.getAllByText('David Wilson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emma Martinez').length).toBeGreaterThan(0)
  })

  it('calculates and displays progress percentage correctly', () => {
    render(<SystemCalculatesProgress />)
    // Alice Johnson has 3 of 5 tasks completed = 60%
    const progressTexts = screen.getAllByText('60%')
    expect(progressTexts.length).toBeGreaterThan(0)
  })

  it('displays progress bars for each employee', () => {
    render(<SystemCalculatesProgress />)
    const employeeList = document.querySelector('[data-testid="systemcalculatesprogress-list"]')
    expect(employeeList).toBeTruthy()
  })

  it('displays onboarding tasks for selected employee', () => {
    render(<SystemCalculatesProgress />)
    expect(screen.getByText('Complete HR paperwork')).toBeTruthy()
    expect(screen.getByText('Setup workstation')).toBeTruthy()
    expect(screen.getByText('IT security training')).toBeTruthy()
  })

  it('toggles task completion when checkbox is clicked', () => {
    render(<SystemCalculatesProgress />)
    const checkboxes = document.querySelectorAll('[data-testid="systemcalculatesprogress-checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(0)
    
    // Get the first checkbox
    const firstCheckbox = checkboxes[0] as HTMLInputElement
    const initialState = firstCheckbox.checked
    
    // Click the checkbox
    fireEvent.click(firstCheckbox)
    
    // State should have changed
    expect(firstCheckbox.checked).toBe(!initialState)
  })

  it('allows switching between employees', () => {
    render(<SystemCalculatesProgress />)
    const employeeItems = document.querySelectorAll('[data-testid="systemcalculatesprogress-item"]')
    expect(employeeItems.length).toBe(5)
    
    // Click on second employee
    fireEvent.click(employeeItems[1])
    
    // Should show Bob Smith's details (name appears in both list and detail)
    expect(screen.getAllByText('Bob Smith').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Marketing').length).toBeGreaterThan(0)
  })

  it('shows refresh button', () => {
    render(<SystemCalculatesProgress />)
    const refreshButton = document.querySelector('[data-testid="systemcalculatesprogress-refresh"]')
    expect(refreshButton).toBeTruthy()
    expect(refreshButton?.textContent).toContain('View Progress Report')
  })

  it('has required data-testid attributes', () => {
    render(<SystemCalculatesProgress />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="systemcalculatesprogress"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="systemcalculatesprogress-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="systemcalculatesprogress-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Checkboxes
    const checkboxes = document.querySelectorAll('[data-testid="systemcalculatesprogress-checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(0)
    
    // Button
    expect(document.querySelector('[data-testid="systemcalculatesprogress-refresh"]')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<SystemCalculatesProgress />)
    expect(screen.getByText('Total Employees')).toBeTruthy()
    expect(screen.getByText('Avg Progress')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
  })

  it('shows correct task count for selected employee', () => {
    render(<SystemCalculatesProgress />)
    // Alice Johnson should have 5 tasks
    expect(screen.getByText(/5 tasks/)).toBeTruthy()
  })
})
