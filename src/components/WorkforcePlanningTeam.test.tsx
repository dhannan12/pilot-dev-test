import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkforcePlanningTeam from './WorkforcePlanningTeam'

describe('WorkforcePlanningTeam', () => {
  it('renders without crashing', () => {
    render(<WorkforcePlanningTeam />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Workforce Planning Dashboard')).toBeTruthy()
  })

  it('displays key metrics', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Total Open Roles')).toBeTruthy()
    expect(screen.getByText('Total Applications')).toBeTruthy()
    expect(screen.getByText('Avg Apps/Opening')).toBeTruthy()
  })

  it('displays department overview section', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Department Overview')).toBeTruthy()
  })

  it('displays role-level analysis table', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText(/Role-Level Analysis/)).toBeTruthy()
  })

  it('displays mock role data', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Account Executive')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
  })

  it('displays filter controls', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Filter by Department')).toBeTruthy()
    expect(screen.getByText('Sort By')).toBeTruthy()
  })

  it('displays hiring forecast insights', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Hiring Forecast Insights')).toBeTruthy()
    expect(screen.getByText('High Priority Roles')).toBeTruthy()
    expect(screen.getByText('Undersubscribed Roles')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<WorkforcePlanningTeam />)
    // Main wrapper
    expect(document.querySelector('[data-testid="workforceplanningteam"]')).toBeTruthy()
    // Department filter
    expect(document.querySelector('[data-testid="workforceplanningteam-department"]')).toBeTruthy()
    // Sort select
    expect(document.querySelector('[data-testid="workforceplanningteam-sort"]')).toBeTruthy()
    // Export button
    expect(document.querySelector('[data-testid="workforceplanningteam-export"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="workforceplanningteam-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="workforceplanningteam-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays department summary items', () => {
    render(<WorkforcePlanningTeam />)
    const deptItems = document.querySelectorAll('[data-testid="workforceplanningteam-department-item"]')
    expect(deptItems.length).toBeGreaterThan(0)
  })

  it('displays urgency badges for roles', () => {
    render(<WorkforcePlanningTeam />)
    const criticalBadges = screen.getAllByText('CRITICAL')
    expect(criticalBadges.length).toBeGreaterThan(0)
    const highBadges = screen.getAllByText('HIGH')
    expect(highBadges.length).toBeGreaterThan(0)
  })
})
