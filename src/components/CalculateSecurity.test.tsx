import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateSecurity from './CalculateSecurity'

describe('CalculateSecurity', () => {
  it('renders without crashing', () => {
    render(<CalculateSecurity />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<CalculateSecurity />)
    expect(screen.getByText('Security Deposit Calculator')).toBeTruthy()
  })

  it('displays mock property data', () => {
    render(<CalculateSecurity />)
    expect(screen.getByText(/123 Maple Street, Downtown/i)).toBeTruthy()
    expect(screen.getByText(/456 Oak Avenue, Riverside/i)).toBeTruthy()
    expect(screen.getByText(/789 Pine Road, Suburbs/i)).toBeTruthy()
  })

  it('calculates security deposit when property is selected', () => {
    render(<CalculateSecurity />)
    const property = screen.getByText(/123 Maple Street, Downtown/i)
    fireEvent.click(property)
    expect(screen.getByText('SECURITY DEPOSIT REQUIRED')).toBeTruthy()
    const depositElements = screen.getAllByText(/\$2,500\.00/)
    expect(depositElements.length).toBeGreaterThan(0)
  })

  it('switches to custom rent input mode', () => {
    render(<CalculateSecurity />)
    const customButton = screen.getByText('Custom Rent Amount')
    fireEvent.click(customButton)
    expect(screen.getByPlaceholderText('0.00')).toBeTruthy()
  })

  it('calculates security deposit with custom rent amount', () => {
    render(<CalculateSecurity />)
    const customButton = screen.getByText('Custom Rent Amount')
    fireEvent.click(customButton)
    
    const input = screen.getByPlaceholderText('0.00')
    fireEvent.change(input, { target: { value: '3000' } })
    
    expect(screen.getByText('SECURITY DEPOSIT REQUIRED')).toBeTruthy()
    const depositElements = screen.getAllByText(/\$3,000\.00/)
    expect(depositElements.length).toBeGreaterThan(0)
  })

  it('shows empty state when no selection is made', () => {
    render(<CalculateSecurity />)
    expect(screen.getByText(/Select a property to calculate security deposit/i)).toBeTruthy()
  })
})
