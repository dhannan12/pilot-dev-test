import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminTriesTo from './AdminTriesTo'

describe('AdminTriesTo', () => {
  it('renders without crashing', () => {
    render(<AdminTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the admin restaurant listing form', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText(/Admin Restaurant Listing/i)).toBeTruthy()
    expect(screen.getByText(/Add a new restaurant to the West Ireland directory/i)).toBeTruthy()
  })

  it('displays mock data of failed listing attempts', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText(/The Galway Grill/i)).toBeTruthy()
    expect(screen.getByText(/Seafood Shack/i)).toBeTruthy()
    expect(screen.getByText(/West Coast Bistro/i)).toBeTruthy()
    expect(screen.getByText(/Cannot list restaurant: Dietary information is required/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminTriesTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="admintriesto"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="admintriesto-restaurantname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-address"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-cuisine"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-dietaryinfo"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="admintriesto-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="admintriesto-clear"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="admintriesto-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="admintriesto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('shows error when submitting without dietary information', () => {
    render(<AdminTriesTo />)
    
    const restaurantNameInput = document.querySelector('[data-testid="admintriesto-restaurantname"]') as HTMLInputElement
    const addressInput = document.querySelector('[data-testid="admintriesto-address"]') as HTMLInputElement
    const phoneInput = document.querySelector('[data-testid="admintriesto-phone"]') as HTMLInputElement
    const cuisineSelect = document.querySelector('[data-testid="admintriesto-cuisine"]') as HTMLSelectElement
    const submitButton = document.querySelector('[data-testid="admintriesto-submit"]') as HTMLButtonElement
    
    fireEvent.change(restaurantNameInput, { target: { value: 'Test Restaurant' } })
    fireEvent.change(addressInput, { target: { value: 'Test Address' } })
    fireEvent.change(phoneInput, { target: { value: '+353 91 123 456' } })
    fireEvent.change(cuisineSelect, { target: { value: 'Irish' } })
    
    fireEvent.click(submitButton)
    
    // Check for the specific error message near the dietary info field
    expect(screen.getByText(/⚠ Dietary information is required. Please specify available dietary options./i)).toBeTruthy()
  })

  it('clears form when clear button is clicked', () => {
    render(<AdminTriesTo />)
    
    const restaurantNameInput = document.querySelector('[data-testid="admintriesto-restaurantname"]') as HTMLInputElement
    const clearButton = document.querySelector('[data-testid="admintriesto-clear"]') as HTMLButtonElement
    
    fireEvent.change(restaurantNameInput, { target: { value: 'Test Restaurant' } })
    expect(restaurantNameInput.value).toBe('Test Restaurant')
    
    fireEvent.click(clearButton)
    expect(restaurantNameInput.value).toBe('')
  })

  it('displays retry buttons for failed attempts', () => {
    render(<AdminTriesTo />)
    const retryButtons = document.querySelectorAll('[data-testid="admintriesto-retry"]')
    expect(retryButtons.length).toBeGreaterThan(0)
  })
})
