import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StudentsSubmitOrders from './StudentsSubmitOrders'

describe('StudentsSubmitOrders', () => {
  it('renders without crashing', () => {
    render(<StudentsSubmitOrders />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title and cutoff time', () => {
    render(<StudentsSubmitOrders />)
    expect(screen.getByText('School Canteen Pre-Order')).toBeTruthy()
    expect(screen.getByText(/Order Cutoff:/)).toBeTruthy()
    expect(screen.getByText(/10:00 AM/)).toBeTruthy()
  })

  it('displays menu items with prices', () => {
    render(<StudentsSubmitOrders />)
    expect(screen.getByText('Chicken Sandwich')).toBeTruthy()
    expect(screen.getByText('Veggie Wrap')).toBeTruthy()
    expect(screen.getByText('Fruit Salad')).toBeTruthy()
    expect(screen.getByText('Chocolate Milk')).toBeTruthy()
    expect(screen.getByText('Pizza Slice')).toBeTruthy()
  })

  it('displays recent orders history', () => {
    render(<StudentsSubmitOrders />)
    expect(screen.getByText('Recent Orders')).toBeTruthy()
    expect(screen.getByText('Emma Wilson')).toBeTruthy()
    expect(screen.getByText('Liam Chen')).toBeTruthy()
    expect(screen.getByText('Sophia Martinez')).toBeTruthy()
  })

  it('has student name input field', () => {
    render(<StudentsSubmitOrders />)
    const nameInput = document.querySelector('[data-testid="students-submit-orders-student-name"]')
    expect(nameInput).toBeTruthy()
  })

  it('has submit button', () => {
    render(<StudentsSubmitOrders />)
    const submitButton = document.querySelector('[data-testid="students-submit-orders-submit"]')
    expect(submitButton).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<StudentsSubmitOrders />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="students-submit-orders"]')).toBeTruthy()
    
    // Student name input
    expect(document.querySelector('[data-testid="students-submit-orders-student-name"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="students-submit-orders-submit"]')).toBeTruthy()
    
    // Menu list and items
    expect(document.querySelector('[data-testid="students-submit-orders-menu-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="students-submit-orders-menu-item"]').length).toBeGreaterThan(0)
    
    // History list and items
    expect(document.querySelector('[data-testid="students-submit-orders-history-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="students-submit-orders-history-item"]').length).toBeGreaterThan(0)
  })

  it('allows adding items to cart', () => {
    render(<StudentsSubmitOrders />)
    
    // Find the first quantity input
    const quantityInput = document.querySelector('[data-testid="students-submit-orders-quantity-item-1"]') as HTMLInputElement
    expect(quantityInput).toBeTruthy()
    
    // Set quantity
    fireEvent.change(quantityInput, { target: { value: '2' } })
    
    // Find and click the add button
    const addButton = document.querySelector('[data-testid="students-submit-orders-add-item-1"]') as HTMLButtonElement
    expect(addButton).toBeTruthy()
    fireEvent.click(addButton)
    
    // Cart should now have content
    expect(screen.getByText(/Qty:/)).toBeTruthy()
  })

  it('displays cart total', () => {
    render(<StudentsSubmitOrders />)
    expect(screen.getByText('Total:')).toBeTruthy()
  })

  it('shows empty cart message initially', () => {
    render(<StudentsSubmitOrders />)
    expect(screen.getByText('Your cart is empty')).toBeTruthy()
  })
})
