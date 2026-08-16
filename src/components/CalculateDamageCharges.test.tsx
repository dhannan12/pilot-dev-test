import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateDamageCharges from './CalculateDamageCharges'

describe('CalculateDamageCharges', () => {
  it('renders without crashing', () => {
    render(<CalculateDamageCharges />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<CalculateDamageCharges />)
    expect(screen.getByText('Calculate Damage Charges')).toBeTruthy()
  })

  it('displays mock equipment returns', () => {
    render(<CalculateDamageCharges />)
    expect(screen.getByText(/Excavator CAT 320/i)).toBeTruthy()
    expect(screen.getByText(/Forklift Toyota 8FD25/i)).toBeTruthy()
    expect(screen.getByText(/Bulldozer Komatsu D65/i)).toBeTruthy()
    expect(screen.getByText(/Crane Liebherr LTM 1060/i)).toBeTruthy()
    expect(screen.getByText(/Loader Volvo L90H/i)).toBeTruthy()
  })

  it('displays prompt to select equipment when none selected', () => {
    render(<CalculateDamageCharges />)
    expect(screen.getByText(/Select an equipment return to begin damage assessment/i)).toBeTruthy()
  })

  it('allows selecting an equipment return', () => {
    render(<CalculateDamageCharges />)
    const firstReturn = screen.getByText(/Excavator CAT 320/i)
    fireEvent.click(firstReturn)
    expect(screen.getByText(/Damage Assessment/i)).toBeTruthy()
  })

  it('displays damage type dropdown when equipment is selected', () => {
    render(<CalculateDamageCharges />)
    const firstReturn = screen.getByText(/Excavator CAT 320/i)
    fireEvent.click(firstReturn)
    const dropdown = screen.getByTestId('calculate-damage-charges-damage-type')
    expect(dropdown).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<CalculateDamageCharges />)
    expect(screen.getByText('Total Returns')).toBeTruthy()
    expect(screen.getByText('Pending Assessment')).toBeTruthy()
    expect(screen.getByText('Assessed')).toBeTruthy()
    expect(screen.getByText('Approved')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateDamageCharges />)
    
    // Main wrapper
    expect(screen.getByTestId('calculate-damage-charges')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('calculate-damage-charges-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('calculate-damage-charges-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Select an equipment to show more testids
    const firstReturn = screen.getByText(/Excavator CAT 320/i)
    fireEvent.click(firstReturn)
    
    // Damage type dropdown
    expect(screen.getByTestId('calculate-damage-charges-damage-type')).toBeTruthy()
    
    // Notes textarea
    expect(screen.getByTestId('calculate-damage-charges-notes')).toBeTruthy()
    
    // Add button
    expect(screen.getByTestId('calculate-damage-charges-add')).toBeTruthy()
    
    // Calculate button should appear after adding damage
    const damageTypeSelect = screen.getByTestId('calculate-damage-charges-damage-type')
    fireEvent.change(damageTypeSelect, { target: { value: '1' } })
    const addButton = screen.getByTestId('calculate-damage-charges-add')
    fireEvent.click(addButton)
    
    expect(screen.getByTestId('calculate-damage-charges-calculate')).toBeTruthy()
  })

  it('allows adding damage charges', () => {
    render(<CalculateDamageCharges />)
    
    // Select equipment
    const firstReturn = screen.getByText(/Excavator CAT 320/i)
    fireEvent.click(firstReturn)
    
    // Select damage type
    const damageTypeSelect = screen.getByTestId('calculate-damage-charges-damage-type')
    fireEvent.change(damageTypeSelect, { target: { value: '1' } })
    
    // Add notes
    const notesTextarea = screen.getByTestId('calculate-damage-charges-notes')
    fireEvent.change(notesTextarea, { target: { value: 'Minor scratches on side panel' } })
    
    // Click add button
    const addButton = screen.getByTestId('calculate-damage-charges-add')
    fireEvent.click(addButton)
    
    // Verify damage was added
    expect(screen.getByText(/Minor scratches on side panel/i)).toBeTruthy()
  })

  it('calculates total damage charges', () => {
    render(<CalculateDamageCharges />)
    
    // Select equipment
    const firstReturn = screen.getByText(/Excavator CAT 320/i)
    fireEvent.click(firstReturn)
    
    // Add a damage charge
    const damageTypeSelect = screen.getByTestId('calculate-damage-charges-damage-type')
    fireEvent.change(damageTypeSelect, { target: { value: '1' } })
    const addButton = screen.getByTestId('calculate-damage-charges-add')
    fireEvent.click(addButton)
    
    // Click calculate
    const calculateButton = screen.getByTestId('calculate-damage-charges-calculate')
    fireEvent.click(calculateButton)
    
    // Verify total is displayed
    expect(screen.getByText(/Total Damage Charges:/i)).toBeTruthy()
  })
})
