import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserInputsFamily from './UserInputsFamily'

describe('UserInputsFamily', () => {
  it('renders without crashing', () => {
    render(<UserInputsFamily />)
    expect(document.body).toBeTruthy()
  })

  it('displays ticket types and pricing information', () => {
    render(<UserInputsFamily />)
    expect(screen.getByText(/Ticket Types & Pricing/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Adult/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Child/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Senior/i).length).toBeGreaterThanOrEqual(1)
  })

  it('has required data-testid attributes', () => {
    render(<UserInputsFamily />)
    
    // Main wrapper
    expect(screen.getByTestId('userinputsfamily')).toBeInTheDocument()
    
    // Form inputs
    expect(screen.getByTestId('userinputsfamily-name')).toBeInTheDocument()
    expect(screen.getByTestId('userinputsfamily-age')).toBeInTheDocument()
    expect(screen.getByTestId('userinputsfamily-tickettype')).toBeInTheDocument()
    
    // Action buttons
    expect(screen.getByTestId('userinputsfamily-add')).toBeInTheDocument()
    expect(screen.getByTestId('userinputsfamily-loadmock')).toBeInTheDocument()
    expect(screen.getByTestId('userinputsfamily-clear')).toBeInTheDocument()
  })

  it('allows adding a family member', () => {
    render(<UserInputsFamily />)
    
    const nameInput = screen.getByTestId('userinputsfamily-name') as HTMLInputElement
    const ageInput = screen.getByTestId('userinputsfamily-age') as HTMLInputElement
    const addButton = screen.getByTestId('userinputsfamily-add')
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(ageInput, { target: { value: '30' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument()
  })

  it('loads mock family data', () => {
    render(<UserInputsFamily />)
    
    const loadMockButton = screen.getByTestId('userinputsfamily-loadmock')
    fireEvent.click(loadMockButton)
    
    // Check that mock data is loaded
    expect(screen.getByTestId('userinputsfamily-list')).toBeInTheDocument()
    const items = screen.getAllByTestId('userinputsfamily-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('displays total amount when family members are added', () => {
    render(<UserInputsFamily />)
    
    const loadMockButton = screen.getByTestId('userinputsfamily-loadmock')
    fireEvent.click(loadMockButton)
    
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Amount/i)).toBeInTheDocument()
    expect(screen.getByTestId('userinputsfamily-submit')).toBeInTheDocument()
  })

  it('can remove family members', () => {
    render(<UserInputsFamily />)
    
    const loadMockButton = screen.getByTestId('userinputsfamily-loadmock')
    fireEvent.click(loadMockButton)
    
    const removeButtons = screen.getAllByTestId('userinputsfamily-remove')
    const initialCount = removeButtons.length
    
    fireEvent.click(removeButtons[0])
    
    const updatedItems = screen.getAllByTestId('userinputsfamily-item')
    expect(updatedItems.length).toBe(initialCount - 1)
  })

  it('clears all family members', () => {
    render(<UserInputsFamily />)
    
    const loadMockButton = screen.getByTestId('userinputsfamily-loadmock')
    fireEvent.click(loadMockButton)
    
    expect(screen.getByTestId('userinputsfamily-list')).toBeInTheDocument()
    
    const clearButton = screen.getByTestId('userinputsfamily-clear')
    fireEvent.click(clearButton)
    
    expect(screen.queryByTestId('userinputsfamily-list')).not.toBeInTheDocument()
    expect(screen.getByText(/No family members added yet/i)).toBeInTheDocument()
  })
})
