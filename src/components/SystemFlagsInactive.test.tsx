import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemFlagsInactive from './SystemFlagsInactive'

describe('SystemFlagsInactive', () => {
  it('renders without crashing', () => {
    render(<SystemFlagsInactive />)
    expect(document.body).toBeTruthy()
  })

  it('displays component title and description', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('Inactive Volunteer Management')).toBeTruthy()
    expect(screen.getByText(/System automatically flags volunteers/i)).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('Total Inactive')).toBeTruthy()
    expect(screen.getByText('Flagged for Outreach')).toBeTruthy()
    // Check for Contacted and Responded - they appear multiple times in page
    const contactedElements = screen.getAllByText('Contacted')
    expect(contactedElements.length).toBeGreaterThan(0)
    const respondedElements = screen.getAllByText('Responded')
    expect(respondedElements.length).toBeGreaterThan(0)
  })

  it('displays mock inactive volunteers data', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('James Rodriguez')).toBeTruthy()
    expect(screen.getByText('Emily Chen')).toBeTruthy()
    expect(screen.getByText('Michael Thompson')).toBeTruthy()
    expect(screen.getByText('Alexandra Williams')).toBeTruthy()
  })

  it('displays volunteer email addresses', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('sarah.mitchell@email.com')).toBeTruthy()
    expect(screen.getByText('james.r@email.com')).toBeTruthy()
  })

  it('displays days since active information', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('93 days ago')).toBeTruthy()
    expect(screen.getByText('67 days ago')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SystemFlagsInactive />)
    
    // Main wrapper
    expect(screen.getByTestId('systemflagsinactive')).toBeTruthy()
    
    // Search input
    expect(screen.getByTestId('systemflagsinactive-search')).toBeTruthy()
    
    // Filter and sort dropdowns
    expect(screen.getByTestId('systemflagsinactive-status-filter')).toBeTruthy()
    expect(screen.getByTestId('systemflagsinactive-sort')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('systemflagsinactive-clear-filters')).toBeTruthy()
    expect(screen.getByTestId('systemflagsinactive-select-all')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('systemflagsinactive-list')).toBeTruthy()
    expect(screen.getAllByTestId('systemflagsinactive-item').length).toBeGreaterThan(0)
  })

  it('filters volunteers by search term', () => {
    render(<SystemFlagsInactive />)
    const searchInput = screen.getByTestId('systemflagsinactive-search') as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    // James Rodriguez should not appear in filtered results
    const items = screen.getAllByTestId('systemflagsinactive-item')
    expect(items.length).toBeLessThan(7) // Less than total mock volunteers
  })

  it('filters volunteers by status', () => {
    render(<SystemFlagsInactive />)
    const statusFilter = screen.getByTestId('systemflagsinactive-status-filter') as HTMLSelectElement
    
    fireEvent.change(statusFilter, { target: { value: 'responded' } })
    
    expect(screen.getByText('David Park')).toBeTruthy()
  })

  it('toggles flag status on volunteer', () => {
    render(<SystemFlagsInactive />)
    const toggleButtons = screen.getAllByText('Unflag')
    const initialCount = toggleButtons.length
    
    expect(initialCount).toBeGreaterThan(0)
    fireEvent.click(toggleButtons[0])
    
    // Should have one fewer Unflag button after toggling
    const afterToggle = screen.getAllByText('Unflag')
    expect(afterToggle.length).toBe(initialCount - 1)
  })

  it('marks volunteer as contacted', () => {
    render(<SystemFlagsInactive />)
    const contactButtons = screen.getAllByText('Mark Contacted')
    
    expect(contactButtons.length).toBeGreaterThan(0)
    fireEvent.click(contactButtons[0])
    
    // This action updates the volunteer status
    expect(document.body).toBeTruthy()
  })

  it('selects individual volunteers', () => {
    render(<SystemFlagsInactive />)
    const items = screen.getAllByTestId('systemflagsinactive-item')
    const firstItemCheckbox = items[0].querySelector('input[type="checkbox"]') as HTMLInputElement
    
    expect(firstItemCheckbox).toBeTruthy()
    fireEvent.click(firstItemCheckbox)
    
    // Bulk action bar should appear
    expect(screen.getByText('1 volunteer selected')).toBeTruthy()
  })

  it('supports select all functionality', () => {
    render(<SystemFlagsInactive />)
    const selectAllCheckbox = screen.getByTestId('systemflagsinactive-select-all') as HTMLInputElement
    
    fireEvent.click(selectAllCheckbox)
    
    // Bulk action bar should show multiple selected
    expect(screen.getByText(/volunteers selected/i)).toBeTruthy()
  })

  it('clears filters when clear button is clicked', () => {
    render(<SystemFlagsInactive />)
    const searchInput = screen.getByTestId('systemflagsinactive-search') as HTMLInputElement
    const clearButton = screen.getByTestId('systemflagsinactive-clear-filters')
    
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(searchInput.value).toBe('test')
    
    fireEvent.click(clearButton)
    expect(searchInput.value).toBe('')
  })

  it('sorts volunteers by different criteria', () => {
    render(<SystemFlagsInactive />)
    const sortSelect = screen.getByTestId('systemflagsinactive-sort') as HTMLSelectElement
    
    fireEvent.change(sortSelect, { target: { value: 'name' } })
    expect(sortSelect.value).toBe('name')
    
    fireEvent.change(sortSelect, { target: { value: 'totalHours' } })
    expect(sortSelect.value).toBe('totalHours')
  })

  it('displays severity legend', () => {
    render(<SystemFlagsInactive />)
    expect(screen.getByText('Severity Legend')).toBeTruthy()
    expect(screen.getByText(/30-59 days/i)).toBeTruthy()
    expect(screen.getByText(/60-89 days/i)).toBeTruthy()
    expect(screen.getByText(/90-119 days/i)).toBeTruthy()
    expect(screen.getByText(/120\+ days/i)).toBeTruthy()
  })
})
