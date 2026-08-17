import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NBrowse from './NBrowse'

describe('NBrowse', () => {
  it('renders without crashing', () => {
    render(<NBrowse />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<NBrowse />)
    // Check for component title
    expect(screen.getByText('Browse Open Roles')).toBeTruthy()
    
    // Check for some role titles from mock data
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('Data Scientist')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NBrowse />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('nbrowse')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-filters')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-department-filter')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-location-filter')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-grade-filter')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-reset')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-results-count')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-roles-list')).toBeTruthy()
  })

  it('filters roles by department', () => {
    render(<NBrowse />)
    
    const departmentFilter = screen.getByTestId('nbrowse-department-filter')
    
    // Filter by Engineering
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    
    // Should show Engineering roles
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('DevOps Engineer')).toBeTruthy()
    
    // Should not show Product Manager
    expect(screen.queryByText('Product Manager')).toBeFalsy()
  })

  it('filters roles by location', () => {
    render(<NBrowse />)
    
    const locationFilter = screen.getByTestId('nbrowse-location-filter')
    
    // Filter by Remote
    fireEvent.change(locationFilter, { target: { value: 'Remote' } })
    
    // Should show Remote roles
    expect(screen.getByText('Data Scientist')).toBeTruthy()
    expect(screen.getByText('HR Business Partner')).toBeTruthy()
    
    // Should not show San Francisco roles
    expect(screen.queryByText('Senior Software Engineer')).toBeFalsy()
  })

  it('filters roles by grade level', () => {
    render(<NBrowse />)
    
    const gradeFilter = screen.getByTestId('nbrowse-grade-filter')
    
    // Filter by Level 5
    fireEvent.change(gradeFilter, { target: { value: 'Level 5' } })
    
    // Should show Level 5 roles
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Marketing Manager')).toBeTruthy()
    
    // Should not show Level 3 roles
    expect(screen.queryByText('UX Designer')).toBeFalsy()
  })

  it('applies multiple filters simultaneously', () => {
    render(<NBrowse />)
    
    const departmentFilter = screen.getByTestId('nbrowse-department-filter')
    const locationFilter = screen.getByTestId('nbrowse-location-filter')
    
    // Filter by Engineering department and San Francisco location
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    fireEvent.change(locationFilter, { target: { value: 'San Francisco, CA' } })
    
    // Should show only Senior Software Engineer
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    
    // Should not show DevOps Engineer (Austin) or other departments
    expect(screen.queryByText('DevOps Engineer')).toBeFalsy()
    expect(screen.queryByText('Product Manager')).toBeFalsy()
  })

  it('resets filters when reset button is clicked', () => {
    render(<NBrowse />)
    
    const departmentFilter = screen.getByTestId('nbrowse-department-filter')
    const resetButton = screen.getByTestId('nbrowse-reset')
    
    // Apply a filter
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    
    // Reset filters
    fireEvent.click(resetButton)
    
    // All roles should be visible again
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('Data Scientist')).toBeTruthy()
  })

  it('displays no results message when no roles match filters', () => {
    render(<NBrowse />)
    
    const departmentFilter = screen.getByTestId('nbrowse-department-filter')
    const locationFilter = screen.getByTestId('nbrowse-location-filter')
    
    // Apply filters that won't match any role
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    fireEvent.change(locationFilter, { target: { value: 'Chicago, IL' } })
    
    // Should show no results message
    expect(screen.getByTestId('nbrowse-no-results')).toBeTruthy()
    expect(screen.getByText('No roles match your selected filters.')).toBeTruthy()
  })

  it('displays results count', () => {
    render(<NBrowse />)
    
    const resultsCount = screen.getByTestId('nbrowse-results-count')
    
    // Should show all 8 roles initially
    expect(resultsCount.textContent).toContain('8')
    expect(resultsCount.textContent).toContain('8')
  })

  it('renders role cards with all required information', () => {
    render(<NBrowse />)
    
    // Check that role cards are rendered
    const roleCards = screen.getAllByTestId('nbrowse-role-card')
    expect(roleCards.length).toBeGreaterThan(0)
    
    // Check that apply buttons are present
    const applyButtons = screen.getAllByTestId('nbrowse-apply-button')
    expect(applyButtons.length).toBe(roleCards.length)
  })
})
