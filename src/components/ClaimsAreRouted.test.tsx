import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsAreRouted from './ClaimsAreRouted'

describe('ClaimsAreRouted', () => {
  it('renders without crashing', () => {
    render(<ClaimsAreRouted />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with adjusters and claims', () => {
    render(<ClaimsAreRouted />)
    
    // Check for header
    expect(screen.getByText('Claims Routing System')).toBeTruthy()
    
    // Check for adjuster names
    expect(screen.getByText('Sarah Martinez')).toBeTruthy()
    expect(screen.getByText('John Chen')).toBeTruthy()
    
    // Check for claim numbers
    expect(screen.getByText('MVC-2026-001523')).toBeTruthy()
    expect(screen.getByText('MVC-2026-001524')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsAreRouted />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="claimsarerouted"]')
    expect(mainWrapper).toBeTruthy()
    
    // Check for routing mode radio buttons
    const autoModeRadio = document.querySelector('[data-testid="claimsarerouted-mode-auto"]')
    expect(autoModeRadio).toBeTruthy()
    
    const manualModeRadio = document.querySelector('[data-testid="claimsarerouted-mode-manual"]')
    expect(manualModeRadio).toBeTruthy()
    
    // Check for adjuster list
    const adjusterList = document.querySelector('[data-testid="claimsarerouted-adjuster-list"]')
    expect(adjusterList).toBeTruthy()
    
    // Check for adjuster items
    const adjusterItems = document.querySelectorAll('[data-testid="claimsarerouted-adjuster-item"]')
    expect(adjusterItems.length).toBeGreaterThan(0)
    
    // Check for pending claims list
    const pendingList = document.querySelector('[data-testid="claimsarerouted-pending-list"]')
    expect(pendingList).toBeTruthy()
    
    // Check for claim items
    const claimItems = document.querySelectorAll('[data-testid="claimsarerouted-claim-item"]')
    expect(claimItems.length).toBeGreaterThan(0)
    
    // Check for assigned claims list
    const assignedList = document.querySelector('[data-testid="claimsarerouted-assigned-list"]')
    expect(assignedList).toBeTruthy()
    
    // Check for route buttons
    const routeButtons = document.querySelectorAll('[data-testid="claimsarerouted-route-button"]')
    expect(routeButtons.length).toBeGreaterThan(0)
  })

  it('shows both automatic and manual routing modes', () => {
    render(<ClaimsAreRouted />)
    
    // Check for routing mode options
    expect(screen.getByText('Automatic Routing')).toBeTruthy()
    expect(screen.getByText('Manual Assignment')).toBeTruthy()
  })

  it('displays adjuster workload and capacity', () => {
    render(<ClaimsAreRouted />)
    
    // Check for workload indicators (multiple occurrences)
    const workloadLabels = screen.getAllByText('Workload')
    expect(workloadLabels.length).toBeGreaterThan(0)
    
    // Check for adjuster specialties
    expect(screen.getByText('Sarah Martinez')).toBeTruthy()
    expect(screen.getByText('John Chen')).toBeTruthy()
  })
})
