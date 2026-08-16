import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViewsThe from './UserViewsThe'

describe('UserViewsThe', () => {
  it('renders without crashing', () => {
    render(<UserViewsThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays case count cards with mock data', () => {
    render(<UserViewsThe />)
    
    // Check for status labels (using getAllByText since they appear in cards and/or recent cases)
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Closed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('On Hold').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Urgent').length).toBeGreaterThan(0)
  })

  it('displays total case count', () => {
    render(<UserViewsThe />)
    
    // Should show Total Cases label
    expect(screen.getByText('Total Cases')).toBeTruthy()
    
    // Total should be 47 + 23 + 156 + 8 + 5 = 239
    expect(screen.getByText('239')).toBeTruthy()
  })

  it('displays recent cases list', () => {
    render(<UserViewsThe />)
    
    // Check for case numbers
    expect(screen.getByText('CASE-2024-001')).toBeTruthy()
    expect(screen.getByText('CASE-2024-045')).toBeTruthy()
    
    // Check for client names
    expect(screen.getByText('Johnson Corp')).toBeTruthy()
    expect(screen.getByText('Smith Holdings')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsThe />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="userviewsthe"]')
    expect(mainWrapper).toBeTruthy()
    
    // Cards
    const cards = document.querySelectorAll('[data-testid="userviewsthe-card"]')
    expect(cards.length).toBeGreaterThan(0)
    
    // List container
    const list = document.querySelector('[data-testid="userviewsthe-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="userviewsthe-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Filter buttons
    const filterAll = document.querySelector('[data-testid="userviewsthe-filter-all"]')
    expect(filterAll).toBeTruthy()
    
    const filterActive = document.querySelector('[data-testid="userviewsthe-filter-active"]')
    expect(filterActive).toBeTruthy()
    
    // Action buttons
    const addButton = document.querySelector('[data-testid="userviewsthe-addcase"]')
    expect(addButton).toBeTruthy()
    
    const exportButton = document.querySelector('[data-testid="userviewsthe-export"]')
    expect(exportButton).toBeTruthy()
    
    const viewButton = document.querySelector('[data-testid="userviewsthe-view"]')
    expect(viewButton).toBeTruthy()
  })

  it('displays all filter buttons', () => {
    render(<UserViewsThe />)
    
    // Check filter buttons exist
    expect(screen.getByText('All Cases')).toBeTruthy()
    const activeElements = screen.getAllByText('Active')
    expect(activeElements.length).toBeGreaterThan(0)
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    const urgentElements = screen.getAllByText('Urgent')
    expect(urgentElements.length).toBeGreaterThan(0)
  })

  it('displays action buttons', () => {
    render(<UserViewsThe />)
    
    expect(screen.getByText('Add New Case')).toBeTruthy()
    expect(screen.getByText('Export Report')).toBeTruthy()
    expect(screen.getByText('Refresh Data')).toBeTruthy()
  })
})
