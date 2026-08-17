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
    expect(screen.getByText('Browse Open Roles')).toBeTruthy()
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('UX Designer')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NBrowse />)
    // Main wrapper
    expect(screen.getByTestId('nbrowse')).toBeTruthy()
    // Filters
    expect(screen.getByTestId('nbrowse-department')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-location')).toBeTruthy()
    expect(screen.getByTestId('nbrowse-grade-level')).toBeTruthy()
    // Buttons
    expect(screen.getByTestId('nbrowse-reset')).toBeTruthy()
    // List container
    expect(screen.getByTestId('nbrowse-list')).toBeTruthy()
    // List items
    expect(screen.getAllByTestId('nbrowse-item').length).toBeGreaterThan(0)
  })

  it('filters jobs by department', () => {
    render(<NBrowse />)
    const departmentFilter = screen.getByTestId('nbrowse-department') as HTMLSelectElement
    
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('DevOps Engineer')).toBeTruthy()
  })

  it('filters jobs by location', () => {
    render(<NBrowse />)
    const locationFilter = screen.getByTestId('nbrowse-location') as HTMLSelectElement
    
    fireEvent.change(locationFilter, { target: { value: 'Remote' } })
    
    expect(screen.getByText('UX Designer')).toBeTruthy()
    expect(screen.getByText('Marketing Manager')).toBeTruthy()
  })

  it('filters jobs by grade level', () => {
    render(<NBrowse />)
    const gradeLevelFilter = screen.getByTestId('nbrowse-grade-level') as HTMLSelectElement
    
    fireEvent.change(gradeLevelFilter, { target: { value: 'L5' } })
    
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Marketing Manager')).toBeTruthy()
  })

  it('resets filters when reset button is clicked', () => {
    render(<NBrowse />)
    const departmentFilter = screen.getByTestId('nbrowse-department') as HTMLSelectElement
    const resetButton = screen.getByTestId('nbrowse-reset')
    
    // Apply a filter
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    expect(departmentFilter.value).toBe('Engineering')
    
    // Reset
    fireEvent.click(resetButton)
    expect(departmentFilter.value).toBe('all')
  })

  it('shows all jobs when no filters are applied', () => {
    render(<NBrowse />)
    const items = screen.getAllByTestId('nbrowse-item')
    expect(items.length).toBe(8) // All mock jobs
  })

  it('displays "no results" message when filters match no jobs', () => {
    render(<NBrowse />)
    const departmentFilter = screen.getByTestId('nbrowse-department') as HTMLSelectElement
    const locationFilter = screen.getByTestId('nbrowse-location') as HTMLSelectElement
    
    // Apply filters that shouldn't match
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    fireEvent.change(locationFilter, { target: { value: 'Chicago, IL' } })
    
    expect(screen.getByText('No jobs match your selected filters.')).toBeTruthy()
  })

  it('has action buttons for each job listing', () => {
    render(<NBrowse />)
    const viewDetailsButtons = screen.getAllByTestId('nbrowse-view-details')
    const applyButtons = screen.getAllByTestId('nbrowse-apply')
    
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    expect(applyButtons.length).toBeGreaterThan(0)
  })
})
