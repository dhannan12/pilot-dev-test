import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchoolReceive from './SchoolReceive'

describe('SchoolReceive', () => {
  it('renders without crashing', () => {
    render(<SchoolReceive />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard header', () => {
    render(<SchoolReceive />)
    expect(screen.getByText(/Absence Submissions Dashboard/i)).toBeTruthy()
    expect(screen.getByText(/Review and process student absence reports/i)).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<SchoolReceive />)
    expect(screen.getByText(/Total Submissions/i)).toBeTruthy()
    expect(screen.getByText(/Pending Review/i)).toBeTruthy()
    expect(screen.getAllByText(/Approved/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Rejected/i).length).toBeGreaterThan(0)
  })

  it('displays mock submission data in the table', () => {
    render(<SchoolReceive />)
    expect(screen.getByText('Emma Johnson')).toBeTruthy()
    expect(screen.getByText('Liam Chen')).toBeTruthy()
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
    expect(screen.getByText('Noah Williams')).toBeTruthy()
    expect(screen.getByText('Sophia Anderson')).toBeTruthy()
  })

  it('has status filter dropdown', () => {
    render(<SchoolReceive />)
    const filter = screen.getByTestId('schoolreceive-status-filter')
    expect(filter).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SchoolReceive />)
    
    // Main wrapper
    expect(screen.getByTestId('schoolreceive')).toBeTruthy()
    
    // Filter select
    expect(screen.getByTestId('schoolreceive-status-filter')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('schoolreceive-list')).toBeTruthy()
    const items = screen.getAllByTestId('schoolreceive-item')
    expect(items.length).toBeGreaterThan(0)
    
    // View buttons
    const viewButtons = screen.getAllByTestId('schoolreceive-view')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays submission IDs and student information', () => {
    render(<SchoolReceive />)
    expect(screen.getByText('ABS-001')).toBeTruthy()
    expect(screen.getByText('STU-2024-001')).toBeTruthy()
    expect(screen.getAllByText('10th Grade').length).toBeGreaterThan(0)
  })

  it('displays absence types', () => {
    render(<SchoolReceive />)
    expect(screen.getAllByText('Medical').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Illness').length).toBeGreaterThan(0)
    expect(screen.getByText('Family Emergency')).toBeTruthy()
  })
})
