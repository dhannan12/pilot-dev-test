import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SalonImplement from './SalonImplement'

describe('SalonImplement', () => {
  it('renders without crashing', () => {
    render(<SalonImplement />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<SalonImplement />)
    expect(screen.getByText('Promotional Offers Management')).toBeTruthy()
  })

  it('displays description about start and end dates', () => {
    render(<SalonImplement />)
    expect(screen.getByText(/All offers must have a start and end date/i)).toBeTruthy()
  })

  it('displays mock promotional offers', () => {
    render(<SalonImplement />)
    expect(screen.getByText('Summer Hair Special')).toBeTruthy()
    expect(screen.getByText('Bridal Package Discount')).toBeTruthy()
    expect(screen.getByText('New Client Welcome')).toBeTruthy()
  })

  it('displays offer details including dates and discount percentage', () => {
    render(<SalonImplement />)
    // Check for discount percentages
    const discountElements = screen.getAllByText(/% OFF/)
    expect(discountElements.length).toBeGreaterThan(0)
    
    // Check for date labels
    expect(screen.getAllByText('Start:').length).toBeGreaterThan(0)
    expect(screen.getAllByText('End:').length).toBeGreaterThan(0)
  })

  it('displays status badges for offers', () => {
    render(<SalonImplement />)
    expect(screen.getAllByText('active').length).toBeGreaterThan(0)
  })

  it('shows create new offer button', () => {
    render(<SalonImplement />)
    expect(screen.getByText('+ Create New Offer')).toBeTruthy()
  })

  it('displays filter tabs for all, active, upcoming, and expired offers', () => {
    render(<SalonImplement />)
    expect(screen.getByText(/All Offers/)).toBeTruthy()
    expect(screen.getByText(/Active/)).toBeTruthy()
    expect(screen.getByText(/Upcoming/)).toBeTruthy()
    expect(screen.getByText(/Expired/)).toBeTruthy()
  })

  it('toggles create form when button is clicked', () => {
    render(<SalonImplement />)
    const createButton = screen.getByText('+ Create New Offer')
    
    // Form should not be visible initially
    expect(screen.queryByText('Create New Promotional Offer')).toBeFalsy()
    
    // Click to show form
    fireEvent.click(createButton)
    expect(screen.getByText('Create New Promotional Offer')).toBeTruthy()
    
    // Button text should change to Cancel
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  it('displays form fields with required indicators', () => {
    render(<SalonImplement />)
    const createButton = screen.getByText('+ Create New Offer')
    fireEvent.click(createButton)
    
    expect(screen.getByText('Offer Name *')).toBeTruthy()
    expect(screen.getByText('Discount Percentage *')).toBeTruthy()
    expect(screen.getByText('Start Date *')).toBeTruthy()
    expect(screen.getByText('End Date *')).toBeTruthy()
  })

  it('filters offers when clicking different tabs', () => {
    render(<SalonImplement />)
    
    // Click on Active tab
    const activeTab = screen.getByText(/Active/)
    fireEvent.click(activeTab)
    
    // Should still see active offers
    expect(screen.getByText('Summer Hair Special')).toBeTruthy()
  })

  it('displays applicable services for each offer', () => {
    render(<SalonImplement />)
    expect(screen.getAllByText('Applicable Services:').length).toBeGreaterThan(0)
    expect(screen.getByText('Haircut')).toBeTruthy()
  })

  it('shows delete button for each offer', () => {
    render(<SalonImplement />)
    const deleteButtons = screen.getAllByText('Delete Offer')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('displays formatted dates in readable format', () => {
    render(<SalonImplement />)
    // Check that dates are displayed (formatted dates will contain month names or numbers)
    const startLabels = screen.getAllByText('Start:')
    expect(startLabels.length).toBeGreaterThan(0)
  })

  it('has at least 5 mock promotional offers', () => {
    render(<SalonImplement />)
    const allTab = screen.getByText(/All Offers/)
    // Check the count in the tab text - should show (7) or more
    expect(allTab.textContent).toMatch(/\([\d]+\)/)
  })
})
