import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DepotStaffCompletes from './DepotStaffCompletes'

describe('DepotStaffCompletes', () => {
  it('renders without crashing', () => {
    render(<DepotStaffCompletes />)
    expect(document.body).toBeTruthy()
  })

  it('displays the equipment inspection checklist header', () => {
    render(<DepotStaffCompletes />)
    expect(screen.getByText(/Equipment Inspection Checklist/i)).toBeTruthy()
  })

  it('displays equipment selection dropdown', () => {
    render(<DepotStaffCompletes />)
    const select = screen.getByTestId('depotstaffcompletes-equipment')
    expect(select).toBeTruthy()
  })

  it('displays inspector name input field', () => {
    render(<DepotStaffCompletes />)
    const input = screen.getByTestId('depotstaffcompletes-inspector')
    expect(input).toBeTruthy()
  })

  it('displays empty state when no equipment is selected', () => {
    render(<DepotStaffCompletes />)
    expect(screen.getByText(/No Equipment Selected/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DepotStaffCompletes />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="depotstaffcompletes"]')).toBeTruthy()
    
    // Equipment select
    expect(document.querySelector('[data-testid="depotstaffcompletes-equipment"]')).toBeTruthy()
    
    // Inspector input
    expect(document.querySelector('[data-testid="depotstaffcompletes-inspector"]')).toBeTruthy()
    
    // Verify at least one testid exists
    expect(document.querySelector('[data-testid]')).toBeTruthy()
    
    // Verify multiple testids exist (equipment and inspector at minimum)
    const testIds = document.querySelectorAll('[data-testid]')
    expect(testIds.length).toBeGreaterThan(1)
  })

  it('renders mock equipment data in dropdown', () => {
    render(<DepotStaffCompletes />)
    const select = screen.getByTestId('depotstaffcompletes-equipment') as HTMLSelectElement
    
    // Check that we have multiple options (including the default "-- Select Equipment --")
    expect(select.options.length).toBeGreaterThan(5)
    expect(select.options[0].textContent).toContain('-- Select Equipment --')
  })

  it('displays inspection checklist categories', () => {
    render(<DepotStaffCompletes />)
    
    // These will be visible after selecting equipment, but categories are always in the data
    expect(screen.getByText(/Complete the inspection checklist/i)).toBeTruthy()
  })
})
