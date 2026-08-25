import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminTriesTo from './AdminTriesTo'

describe('AdminTriesTo', () => {
  it('renders without crashing', () => {
    render(<AdminTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText('Espresso')).toBeTruthy()
    expect(screen.getByText('Cappuccino')).toBeTruthy()
    expect(screen.getByText('Latte')).toBeTruthy()
    expect(screen.getByText('Americano')).toBeTruthy()
    expect(screen.getByText('Mocha')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminTriesTo />)
    // Main wrapper
    expect(screen.getByTestId('admintriesto')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('admintriesto-name')).toBeTruthy()
    expect(screen.getByTestId('admintriesto-description')).toBeTruthy()
    expect(screen.getByTestId('admintriesto-price')).toBeTruthy()
    
    // Add button
    expect(screen.getByTestId('admintriesto-add')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('admintriesto-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('admintriesto-item')
    expect(items.length).toBe(5)
    
    // Delete buttons
    const deleteButtons = screen.getAllByTestId('admintriesto-delete')
    expect(deleteButtons.length).toBe(5)
  })

  it('shows current item count', () => {
    render(<AdminTriesTo />)
    expect(screen.getByText(/Current items: 5 \/ 20/)).toBeTruthy()
  })

  it('allows adding a new item when under the limit', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name') as HTMLInputElement
    const descInput = screen.getByTestId('admintriesto-description') as HTMLTextAreaElement
    const priceInput = screen.getByTestId('admintriesto-price') as HTMLInputElement
    const addButton = screen.getByTestId('admintriesto-add')
    
    fireEvent.change(nameInput, { target: { value: 'New Coffee' } })
    fireEvent.change(descInput, { target: { value: 'A new coffee drink' } })
    fireEvent.change(priceInput, { target: { value: '5.99' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('New Coffee')).toBeTruthy()
    expect(screen.getByText(/Current items: 6 \/ 20/)).toBeTruthy()
  })

  it('allows deleting items', () => {
    render(<AdminTriesTo />)
    
    const deleteButtons = screen.getAllByTestId('admintriesto-delete')
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByText(/Current items: 4 \/ 20/)).toBeTruthy()
  })

  it('shows validation error for empty fields', () => {
    render(<AdminTriesTo />)
    
    const addButton = screen.getByTestId('admintriesto-add')
    fireEvent.click(addButton)
    
    expect(screen.getByText('All fields are required.')).toBeTruthy()
  })

  it('shows validation error for invalid price', () => {
    render(<AdminTriesTo />)
    
    const nameInput = screen.getByTestId('admintriesto-name') as HTMLInputElement
    const descInput = screen.getByTestId('admintriesto-description') as HTMLTextAreaElement
    const priceInput = screen.getByTestId('admintriesto-price') as HTMLInputElement
    const addButton = screen.getByTestId('admintriesto-add')
    
    fireEvent.change(nameInput, { target: { value: 'Test' } })
    fireEvent.change(descInput, { target: { value: 'Test desc' } })
    fireEvent.change(priceInput, { target: { value: '-5' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('Price must be a valid positive number.')).toBeTruthy()
  })
})
