import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTotalCost from './CalculateTotalCost'

describe('CalculateTotalCost', () => {
  it('renders without crashing', () => {
    render(<CalculateTotalCost />)
    expect(document.body).toBeTruthy()
  })

  it('displays service cost calculator title', () => {
    render(<CalculateTotalCost />)
    expect(screen.getByText('Service Cost Calculator')).toBeTruthy()
  })

  it('displays mock services data', () => {
    render(<CalculateTotalCost />)
    expect(screen.getAllByText('Plumbing Installation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Electrical Wiring').length).toBeGreaterThan(0)
    expect(screen.getByText('Carpentry Work')).toBeTruthy()
    expect(screen.getByText('HVAC Repair')).toBeTruthy()
    expect(screen.getByText('Painting Interior')).toBeTruthy()
  })

  it('calculates service cost correctly', () => {
    render(<CalculateTotalCost />)
    // Plumbing: 85 * 6 = 510 (appears in service list and summary)
    expect(screen.getAllByText('$510.00').length).toBeGreaterThan(0)
    // Electrical: 95 * 8 = 760 (appears in service list and summary)
    expect(screen.getAllByText('$760.00').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CalculateTotalCost />)
    // Main wrapper
    expect(screen.getByTestId('calculatetotalcost')).toBeTruthy()
    // List container
    expect(screen.getByTestId('calculatetotalcost-list')).toBeTruthy()
    // List items
    const items = screen.getAllByTestId('calculatetotalcost-item')
    expect(items.length).toBeGreaterThan(0)
    // Input fields
    expect(screen.getByTestId('calculatetotalcost-hourlyrate')).toBeTruthy()
    expect(screen.getByTestId('calculatetotalcost-estimatedhours')).toBeTruthy()
    // Buttons
    expect(screen.getByTestId('calculatetotalcost-submit')).toBeTruthy()
    expect(screen.getByTestId('calculatetotalcost-clear')).toBeTruthy()
  })

  it('allows service selection and deselection', () => {
    render(<CalculateTotalCost />)
    const checkbox = screen.getByTestId('calculatetotalcost-checkbox-3') as HTMLInputElement
    
    // Initially unchecked
    expect(checkbox.checked).toBe(false)
    
    // Click to select
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
    
    // Click to deselect
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it('updates custom cost calculation when inputs change', () => {
    render(<CalculateTotalCost />)
    
    const hourlyRateInput = screen.getByTestId('calculatetotalcost-hourlyrate') as HTMLInputElement
    const estimatedHoursInput = screen.getByTestId('calculatetotalcost-estimatedhours') as HTMLInputElement
    
    // Change hourly rate to 100
    fireEvent.change(hourlyRateInput, { target: { value: '100' } })
    expect(hourlyRateInput.value).toBe('100')
    
    // Change estimated hours to 10
    fireEvent.change(estimatedHoursInput, { target: { value: '10' } })
    expect(estimatedHoursInput.value).toBe('10')
    
    // Should calculate 100 * 10 = 1000
    expect(screen.getByText('$1000.00')).toBeTruthy()
  })

  it('clears selection when clear button is clicked', () => {
    render(<CalculateTotalCost />)
    
    const clearButton = screen.getByTestId('calculatetotalcost-clear')
    fireEvent.click(clearButton)
    
    // After clearing, should show "No services selected"
    expect(screen.getByText('No services selected')).toBeTruthy()
  })

  it('displays grand total with tax', () => {
    render(<CalculateTotalCost />)
    // Default selected services are 1 and 2
    // Service 1: 85 * 6 = 510
    // Service 2: 95 * 8 = 760
    // Subtotal: 1270
    // Tax (10%): 127
    // Grand Total: 1397
    expect(screen.getByText('$1270.00')).toBeTruthy()
    expect(screen.getByText('$127.00')).toBeTruthy()
    expect(screen.getByText('$1397.00')).toBeTruthy()
  })
})
