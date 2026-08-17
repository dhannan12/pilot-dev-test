import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StudentsAccessThe from './StudentsAccessThe'

describe('StudentsAccessThe', () => {
  it('renders without crashing', () => {
    render(<StudentsAccessThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays student welcome message and header', () => {
    render(<StudentsAccessThe />)
    expect(screen.getByText(/School Canteen Pre-Order/i)).toBeTruthy()
    expect(screen.getByText(/Welcome back, Emma Johnson!/i)).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<StudentsAccessThe />)
    expect(screen.getByText(/Chicken Caesar Wrap/i)).toBeTruthy()
    expect(screen.getByText(/Margherita Pizza Slice/i)).toBeTruthy()
    expect(screen.getByText(/Garden Salad Bowl/i)).toBeTruthy()
    expect(screen.getByText(/Turkey & Cheese Sandwich/i)).toBeTruthy()
    expect(screen.getByText(/Pasta Primavera/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<StudentsAccessThe />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="studentsaccessthe"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="studentsaccessthe-submit"]')).toBeTruthy()
    
    // Date input
    expect(document.querySelector('[data-testid="studentsaccessthe-date"]')).toBeTruthy()
    
    // Instructions textarea
    expect(document.querySelector('[data-testid="studentsaccessthe-instructions"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="studentsaccessthe-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="studentsaccessthe-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Add buttons
    const addButtons = document.querySelectorAll('[data-testid="studentsaccessthe-add"]')
    expect(addButtons.length).toBeGreaterThan(0)
  })

  it('allows adding items to order', () => {
    render(<StudentsAccessThe />)
    
    const addButtons = screen.getAllByTestId('studentsaccessthe-add')
    fireEvent.click(addButtons[0])
    
    // Should show quantity controls after adding
    expect(screen.getByTestId('studentsaccessthe-increase')).toBeTruthy()
    expect(screen.getByTestId('studentsaccessthe-decrease')).toBeTruthy()
  })

  it('calculates order total correctly', () => {
    render(<StudentsAccessThe />)
    
    // Add first item (Chicken Caesar Wrap - $6.50)
    const addButtons = screen.getAllByTestId('studentsaccessthe-add')
    fireEvent.click(addButtons[0])
    
    // Should show total in order summary
    expect(screen.getByText(/Total:/)).toBeTruthy()
    const totalElements = screen.getAllByText(/\$6\.50/)
    expect(totalElements.length).toBeGreaterThan(0)
  })

  it('requires pickup date before submission', () => {
    render(<StudentsAccessThe />)
    
    const submitButton = screen.getByTestId('studentsaccessthe-submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('shows success message after submission', () => {
    render(<StudentsAccessThe />)
    
    // Add an item
    const addButtons = screen.getAllByTestId('studentsaccessthe-add')
    fireEvent.click(addButtons[0])
    
    // Fill in date
    const dateInput = screen.getByTestId('studentsaccessthe-date') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    // Submit
    const submitButton = screen.getByTestId('studentsaccessthe-submit')
    fireEvent.click(submitButton)
    
    // Should show success message
    expect(screen.getByText(/Order Submitted Successfully!/i)).toBeTruthy()
  })

  it('allows placing another order after submission', () => {
    render(<StudentsAccessThe />)
    
    // Add an item and submit
    const addButtons = screen.getAllByTestId('studentsaccessthe-add')
    fireEvent.click(addButtons[0])
    
    const dateInput = screen.getByTestId('studentsaccessthe-date') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    const submitButton = screen.getByTestId('studentsaccessthe-submit')
    fireEvent.click(submitButton)
    
    // Click new order button
    const newOrderButton = screen.getByTestId('studentsaccessthe-new-order')
    fireEvent.click(newOrderButton)
    
    // Should be back to form
    expect(screen.getByText(/Available Menu Items/i)).toBeTruthy()
  })
})
