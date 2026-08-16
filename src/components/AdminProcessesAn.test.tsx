import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminProcessesAn from './AdminProcessesAn'

describe('AdminProcessesAn', () => {
  it('renders without crashing', () => {
    render(<AdminProcessesAn />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<AdminProcessesAn />)
    expect(screen.getByText(/Absence Request Processing/i)).toBeTruthy()
  })

  it('displays mock absence request data', () => {
    render(<AdminProcessesAn />)
    expect(screen.getByText('Emma Watson')).toBeTruthy()
    expect(screen.getByText('James Chen')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Brown')).toBeTruthy()
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminProcessesAn />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="adminprocessesan"]')).toBeTruthy()
    
    // Filter select
    expect(document.querySelector('[data-testid="adminprocessesan-filter"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="adminprocessesan-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="adminprocessesan-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays status filter dropdown', () => {
    render(<AdminProcessesAn />)
    const filter = screen.getByTestId('adminprocessesan-filter')
    expect(filter).toBeTruthy()
  })

  it('displays absence request list', () => {
    render(<AdminProcessesAn />)
    const list = screen.getByTestId('adminprocessesan-list')
    expect(list).toBeTruthy()
  })

  it('displays multiple absence request items', () => {
    render(<AdminProcessesAn />)
    const items = screen.getAllByTestId('adminprocessesan-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
