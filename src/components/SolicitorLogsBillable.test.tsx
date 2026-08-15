import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SolicitorLogsBillable from './SolicitorLogsBillable'

describe('SolicitorLogsBillable', () => {
  it('renders without crashing', () => {
    render(<SolicitorLogsBillable />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SolicitorLogsBillable />)
    expect(screen.getByText('Log Billable Hours')).toBeTruthy()
  })

  it('displays mock time entries', () => {
    render(<SolicitorLogsBillable />)
    // Check for mock data entries - use getAllByText for elements that appear multiple times
    const smithEntries = screen.getAllByText(/Smith v. Jones Corp/)
    expect(smithEntries.length).toBeGreaterThan(0)
    const researchEntries = screen.getAllByText(/Legal Research/)
    expect(researchEntries.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SolicitorLogsBillable />)
    
    // Verify main wrapper
    const mainWrapper = document.querySelector('[data-testid="solicitorlogsbillable"]')
    expect(mainWrapper).toBeTruthy()
    
    // Verify form inputs
    const caseSelect = document.querySelector('[data-testid="solicitorlogsbillable-case"]')
    expect(caseSelect).toBeTruthy()
    
    const dateInput = document.querySelector('[data-testid="solicitorlogsbillable-date"]')
    expect(dateInput).toBeTruthy()
    
    const hoursInput = document.querySelector('[data-testid="solicitorlogsbillable-hours"]')
    expect(hoursInput).toBeTruthy()
    
    const activitySelect = document.querySelector('[data-testid="solicitorlogsbillable-activity"]')
    expect(activitySelect).toBeTruthy()
    
    const descriptionTextarea = document.querySelector('[data-testid="solicitorlogsbillable-description"]')
    expect(descriptionTextarea).toBeTruthy()
    
    // Verify submit button
    const submitButton = document.querySelector('[data-testid="solicitorlogsbillable-submit"]')
    expect(submitButton).toBeTruthy()
    
    // Verify list container
    const listContainer = document.querySelector('[data-testid="solicitorlogsbillable-list"]')
    expect(listContainer).toBeTruthy()
    
    // Verify list items
    const listItems = document.querySelectorAll('[data-testid="solicitorlogsbillable-item"]')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<SolicitorLogsBillable />)
    expect(screen.getByText('Total Entries')).toBeTruthy()
    expect(screen.getByText('Total Hours')).toBeTruthy()
    expect(screen.getByText('Total Billable')).toBeTruthy()
  })

  it('displays case selection dropdown with active cases', () => {
    render(<SolicitorLogsBillable />)
    const caseSelect = document.querySelector('[data-testid="solicitorlogsbillable-case"]') as HTMLSelectElement
    expect(caseSelect).toBeTruthy()
    // Should have at least 5 active cases plus the default "Select a case..." option
    expect(caseSelect.options.length).toBeGreaterThanOrEqual(6)
  })
})
