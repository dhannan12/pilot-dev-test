import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DepartmentManagerApproves from './DepartmentManagerApproves'

describe('DepartmentManagerApproves', () => {
  it('renders without crashing', () => {
    render(<DepartmentManagerApproves />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<DepartmentManagerApproves />)
    expect(screen.getByText('Training Approval Dashboard')).toBeTruthy()
  })

  it('displays mock employee data', () => {
    render(<DepartmentManagerApproves />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Kim')).toBeTruthy()
    expect(screen.getByText('Jessica Martinez')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DepartmentManagerApproves />)
    
    // Main wrapper
    expect(screen.getByTestId('departmentmanagerapproves')).toBeTruthy()
    
    // Status filter
    expect(screen.getByTestId('departmentmanagerapproves-status-filter')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('departmentmanagerapproves-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('departmentmanagerapproves-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows filtering employees by status', () => {
    render(<DepartmentManagerApproves />)
    
    const select = screen.getByTestId('departmentmanagerapproves-status-filter') as HTMLSelectElement
    
    // Initially should show all
    fireEvent.change(select, { target: { value: 'pending' } })
    expect(select.value).toBe('pending')
    
    fireEvent.change(select, { target: { value: 'approved' } })
    expect(select.value).toBe('approved')
  })

  it('allows selecting an employee to view details', () => {
    render(<DepartmentManagerApproves />)
    
    const firstItem = screen.getAllByTestId('departmentmanagerapproves-item')[0]
    fireEvent.click(firstItem)
    
    // After clicking, we should see training modules
    expect(screen.getByText('Training Modules')).toBeTruthy()
  })

  it('shows approval and reject buttons for pending employees', () => {
    render(<DepartmentManagerApproves />)
    
    // Click on first employee (pending status)
    const firstItem = screen.getAllByTestId('departmentmanagerapproves-item')[0]
    fireEvent.click(firstItem)
    
    // Should show action buttons
    expect(screen.getByTestId('departmentmanagerapproves-approve')).toBeTruthy()
    expect(screen.getByTestId('departmentmanagerapproves-reject')).toBeTruthy()
  })

  it('shows comments textarea for pending employees', () => {
    render(<DepartmentManagerApproves />)
    
    // Click on first employee (pending status)
    const firstItem = screen.getAllByTestId('departmentmanagerapproves-item')[0]
    fireEvent.click(firstItem)
    
    expect(screen.getByTestId('departmentmanagerapproves-comments')).toBeTruthy()
  })

  it('can approve an employee', () => {
    render(<DepartmentManagerApproves />)
    
    // Click on first pending employee
    const firstItem = screen.getAllByTestId('departmentmanagerapproves-item')[0]
    fireEvent.click(firstItem)
    
    // Click approve button
    const approveBtn = screen.getByTestId('departmentmanagerapproves-approve')
    fireEvent.click(approveBtn)
    
    // After approval, the details panel should reset
    expect(screen.getByText('Select an employee to review their training details')).toBeTruthy()
  })

  it('displays training completion stats', () => {
    render(<DepartmentManagerApproves />)
    
    // Click on first employee
    const firstItem = screen.getAllByTestId('departmentmanagerapproves-item')[0]
    fireEvent.click(firstItem)
    
    // Should display completion rate and average score
    expect(screen.getByText('Completion Rate')).toBeTruthy()
    expect(screen.getByText('Average Score')).toBeTruthy()
  })
})
