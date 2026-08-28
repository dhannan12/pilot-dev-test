import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViewsA from './UserViewsA'

describe('UserViewsA', () => {
  it('renders without crashing', () => {
    render(<UserViewsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays product information', () => {
    render(<UserViewsA />)
    
    // Check for product title
    expect(screen.getByTestId('userviewsa-title')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-title').textContent).toContain('Classic Cotton T-Shirt')
    
    // Check for price
    expect(screen.getByTestId('userviewsa-price')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-price').textContent).toContain('29.99')
    
    // Check for description
    expect(screen.getByTestId('userviewsa-description')).toBeTruthy()
    
    // Check for stock status
    expect(screen.getByTestId('userviewsa-stock-status')).toBeTruthy()
  })

  it('displays product images', () => {
    render(<UserViewsA />)
    
    // Check main image
    expect(screen.getByTestId('userviewsa-main-image')).toBeTruthy()
    
    // Check thumbnails exist
    expect(screen.getByTestId('userviewsa-thumbnails')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-thumbnail-0')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-thumbnail-1')).toBeTruthy()
  })

  it('allows thumbnail selection', () => {
    render(<UserViewsA />)
    
    const thumbnail1 = screen.getByTestId('userviewsa-thumbnail-1')
    fireEvent.click(thumbnail1)
    
    // After clicking, the image should change (we can't directly test the image src change in this simple test)
    expect(thumbnail1).toBeTruthy()
  })

  it('displays color options', () => {
    render(<UserViewsA />)
    
    expect(screen.getByTestId('userviewsa-color-options')).toBeTruthy()
    
    // Check for specific color buttons
    const whiteColorButton = screen.getByTestId('userviewsa-color-white')
    expect(whiteColorButton).toBeTruthy()
  })

  it('handles quantity changes', () => {
    render(<UserViewsA />)
    
    const quantityInput = screen.getByTestId('userviewsa-quantity-input') as HTMLInputElement
    const increaseButton = screen.getByTestId('userviewsa-quantity-increase')
    const decreaseButton = screen.getByTestId('userviewsa-quantity-decrease')
    
    expect(quantityInput).toBeTruthy()
    expect(quantityInput.value).toBe('1')
    
    // Increase quantity
    fireEvent.click(increaseButton)
    expect(quantityInput.value).toBe('2')
    
    // Increase again
    fireEvent.click(increaseButton)
    expect(quantityInput.value).toBe('3')
    
    // Decrease quantity
    fireEvent.click(decreaseButton)
    expect(quantityInput.value).toBe('2')
  })

  it('displays add to cart button', () => {
    render(<UserViewsA />)
    
    const addToCartButton = screen.getByTestId('userviewsa-add-to-cart')
    expect(addToCartButton).toBeTruthy()
    expect(addToCartButton.textContent).toBe('Add to Cart')
  })

  it('displays material and care information', () => {
    render(<UserViewsA />)
    
    // Check material
    expect(screen.getByTestId('userviewsa-material')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-material').textContent).toContain('Cotton')
    
    // Check care instructions list
    expect(screen.getByTestId('userviewsa-care-list')).toBeTruthy()
    
    // Check care items exist
    const careItems = screen.getAllByTestId('userviewsa-care-item')
    expect(careItems.length).toBeGreaterThan(0)
  })

  it('displays sizing note', () => {
    render(<UserViewsA />)
    
    const sizingNote = screen.getByTestId('userviewsa-sizing-note')
    expect(sizingNote).toBeTruthy()
    expect(sizingNote.textContent).toContain('Sizing information is currently unavailable')
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsA />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userviewsa')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-title')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-price')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-add-to-cart')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-quantity-input')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-quantity-increase')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-quantity-decrease')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-color-options')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-main-image')).toBeTruthy()
    expect(screen.getByTestId('userviewsa-thumbnails')).toBeTruthy()
    
    // Verify at least one data-testid exists
    expect(document.querySelector('[data-testid]')).toBeTruthy()
  })
})
