import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DepotStaffViews from './DepotStaffViews'

describe('DepotStaffViews', () => {
  it('renders without crashing', () => {
    render(<DepotStaffViews />)
    expect(document.body).toBeTruthy()
  })

  it('displays the current bookings header', () => {
    render(<DepotStaffViews />)
    expect(screen.getByText('Current Bookings')).toBeTruthy()
  })

  it('displays mock booking data', () => {
    render(<DepotStaffViews />)
    // Check for booking numbers
    expect(screen.getByText('BK-2024-001')).toBeTruthy()
    expect(screen.getByText('BK-2024-002')).toBeTruthy()
    
    // Check for customer names
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    
    // Check for equipment names (may appear multiple times)
    const excavators = screen.getAllByText('Excavator CAT 320')
    expect(excavators.length).toBeGreaterThan(0)
    expect(screen.getByText('Concrete Mixer')).toBeTruthy()
  })

  it('displays booking statistics', () => {
    render(<DepotStaffViews />)
    expect(screen.getByText('Total Bookings')).toBeTruthy()
    // Check for stats section (multiple instances of status names exist)
    const statCards = document.querySelectorAll('.text-sm.text-gray-600.mb-1')
    expect(statCards.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<DepotStaffViews />)
    
    // Main wrapper
    expect(screen.getByTestId('depotstaffviews')).toBeTruthy()
    
    // Search input
    expect(screen.getByTestId('depotstaffviews-search')).toBeTruthy()
    
    // Status filter
    expect(screen.getByTestId('depotstaffviews-status-filter')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('depotstaffviews-list')).toBeTruthy()
    
    // List items (should have at least 5 mock items)
    const items = screen.getAllByTestId('depotstaffviews-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // Action buttons
    const viewDetailsButtons = screen.getAllByTestId('depotstaffviews-view-details')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    
    const editButtons = screen.getAllByTestId('depotstaffviews-edit')
    expect(editButtons.length).toBeGreaterThan(0)
  })

  it('displays financial information', () => {
    render(<DepotStaffViews />)
    // Check for currency formatting
    expect(screen.getByText(/\$2,500\.00/)).toBeTruthy()
    expect(screen.getByText(/\$850\.00/)).toBeTruthy()
  })

  it('shows status badges', () => {
    render(<DepotStaffViews />)
    // Check for different status badges (using querySelector to avoid duplicates)
    const statusBadges = document.querySelectorAll('.text-xs.font-medium.border')
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it('displays search and filter controls', () => {
    render(<DepotStaffViews />)
    expect(screen.getByPlaceholderText(/Search by booking number/)).toBeTruthy()
    expect(screen.getByText('Filter by Status')).toBeTruthy()
  })
})
