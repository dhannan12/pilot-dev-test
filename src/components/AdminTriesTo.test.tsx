import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminTriesTo from './AdminTriesTo'

describe('AdminTriesTo', () => {
  it('renders without crashing', () => {
    render(<AdminTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock restaurant data', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText("O'Malley's Seafood House")).toBeInTheDocument()
    expect(screen.getByText("The Clew Bay Bistro")).toBeInTheDocument()
    expect(screen.getByText("Croagh Patrick Inn")).toBeInTheDocument()
    expect(screen.getByText("The Atlantic Grill")).toBeInTheDocument()
    expect(screen.getByText("Mayo Mediterranean")).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<AdminTriesTo />)
    
    // Main wrapper
    expect(screen.getByTestId('admintriesto')).toBeInTheDocument()
    
    // Form inputs
    expect(screen.getByTestId('admintriesto-name')).toBeInTheDocument()
    expect(screen.getByTestId('admintriesto-address')).toBeInTheDocument()
    expect(screen.getByTestId('admintriesto-cuisine')).toBeInTheDocument()
    expect(screen.getByTestId('admintriesto-phone')).toBeInTheDocument()
    expect(screen.getByTestId('admintriesto-dietaryinfo')).toBeInTheDocument()
    
    // Submit button
    expect(screen.getByTestId('admintriesto-submit')).toBeInTheDocument()
    
    // List
    expect(screen.getByTestId('admintriesto-list')).toBeInTheDocument()
    
    // List items (should have 5 initially)
    const items = screen.getAllByTestId('admintriesto-item')
    expect(items.length).toBe(5)
  })

  it('shows error when submitting without dietary information', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name')
    const addressInput = screen.getByTestId('admintriesto-address')
    const cuisineInput = screen.getByTestId('admintriesto-cuisine')
    const phoneInput = screen.getByTestId('admintriesto-phone')
    const dietaryInfoInput = screen.getByTestId('admintriesto-dietaryinfo')
    const submitButton = screen.getByTestId('admintriesto-submit')
    
    // Fill all fields except dietary info
    fireEvent.change(nameInput, { target: { value: 'Test Restaurant' } })
    fireEvent.change(addressInput, { target: { value: '123 Test St' } })
    fireEvent.change(cuisineInput, { target: { value: 'Test Cuisine' } })
    fireEvent.change(phoneInput, { target: { value: '+353 12 3456' } })
    fireEvent.change(dietaryInfoInput, { target: { value: '' } })
    
    // Submit form
    fireEvent.click(submitButton)
    
    // Error should be displayed
    expect(screen.getByTestId('admintriesto-error')).toBeInTheDocument()
    expect(screen.getByText(/dietary information is required/i)).toBeInTheDocument()
  })

  it('successfully adds restaurant when all fields including dietary info are provided', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name')
    const addressInput = screen.getByTestId('admintriesto-address')
    const cuisineInput = screen.getByTestId('admintriesto-cuisine')
    const phoneInput = screen.getByTestId('admintriesto-phone')
    const dietaryInfoInput = screen.getByTestId('admintriesto-dietaryinfo')
    const submitButton = screen.getByTestId('admintriesto-submit')
    
    // Fill all fields including dietary info
    fireEvent.change(nameInput, { target: { value: 'New Restaurant' } })
    fireEvent.change(addressInput, { target: { value: '456 New St' } })
    fireEvent.change(cuisineInput, { target: { value: 'Italian' } })
    fireEvent.change(phoneInput, { target: { value: '+353 98 99999' } })
    fireEvent.change(dietaryInfoInput, { target: { value: 'Vegetarian, Vegan options' } })
    
    // Submit form
    fireEvent.click(submitButton)
    
    // New restaurant should be in the list
    expect(screen.getByText('New Restaurant')).toBeInTheDocument()
    
    // Should now have 6 restaurants
    const items = screen.getAllByTestId('admintriesto-item')
    expect(items.length).toBe(6)
  })

  it('clears error when user starts typing in dietary info field', () => {
    render(<AdminTriesTo />)
    
    const dietaryInfoInput = screen.getByTestId('admintriesto-dietaryinfo')
    const submitButton = screen.getByTestId('admintriesto-submit')
    
    // Submit without dietary info to trigger error
    fireEvent.click(submitButton)
    
    // Error should be displayed
    expect(screen.getByTestId('admintriesto-error')).toBeInTheDocument()
    
    // Start typing in dietary info
    fireEvent.change(dietaryInfoInput, { target: { value: 'Vegan' } })
    
    // Error should be cleared
    expect(screen.queryByTestId('admintriesto-error')).not.toBeInTheDocument()
  })
})
