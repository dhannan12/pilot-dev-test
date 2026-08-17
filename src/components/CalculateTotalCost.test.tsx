import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTotalCost from './CalculateTotalCost'

describe('CalculateTotalCost', () => {
  it('renders without crashing', () => {
    render(<CalculateTotalCost />)
    expect(document.body).toBeTruthy()
  })

  it('displays component title', () => {
    render(<CalculateTotalCost />)
    expect(screen.getByText('Membership Cost Calculator')).toBeTruthy()
  })

  it('displays mock membership types', () => {
    render(<CalculateTotalCost />)
    expect(screen.getByText('Basic Membership')).toBeTruthy()
    expect(screen.getByText('Standard Membership')).toBeTruthy()
    expect(screen.getByText('Premium Membership')).toBeTruthy()
    expect(screen.getByText('Family Membership')).toBeTruthy()
    expect(screen.getByText('Student Membership')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateTotalCost />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="calculatetotalcost"]')).toBeTruthy()
    
    // Select dropdowns
    expect(document.querySelector('[data-testid="calculatetotalcost-membership"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculatetotalcost-duration"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="calculatetotalcost-submit"]')).toBeFalsy() // Not visible until both selections made
    
    // List container and items
    expect(document.querySelector('[data-testid="calculatetotalcost-list"]')).toBeTruthy()
    const listItems = document.querySelectorAll('[data-testid="calculatetotalcost-item"]')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('displays membership type selector', () => {
    render(<CalculateTotalCost />)
    const select = screen.getByTestId('calculatetotalcost-membership')
    expect(select).toBeTruthy()
  })

  it('displays duration selector', () => {
    render(<CalculateTotalCost />)
    const select = screen.getByTestId('calculatetotalcost-duration')
    expect(select).toBeTruthy()
  })

  it('displays list of membership options', () => {
    render(<CalculateTotalCost />)
    const list = screen.getByTestId('calculatetotalcost-list')
    expect(list).toBeTruthy()
    
    const items = screen.getAllByTestId('calculatetotalcost-item')
    expect(items.length).toBe(5) // We have 5 membership types
  })
})
