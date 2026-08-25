import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserInputsMatch from './UserInputsMatch'

describe('UserInputsMatch', () => {
  it('renders without crashing', () => {
    render(<UserInputsMatch />)
    expect(document.body).toBeTruthy()
  })

  it('displays the title and description', () => {
    render(<UserInputsMatch />)
    expect(screen.getByText('User Inputs Match Validator')).toBeTruthy()
    expect(screen.getByText(/Compare and validate user inputs/)).toBeTruthy()
  })

  it('displays mock match history', () => {
    render(<UserInputsMatch />)
    const historyItems = screen.getAllByTestId('userinputsmatch-item')
    expect(historyItems.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes', () => {
    render(<UserInputsMatch />)
    
    // Main wrapper
    expect(screen.getByTestId('userinputsmatch')).toBeTruthy()
    
    // Input fields
    expect(screen.getByTestId('userinputsmatch-input1')).toBeTruthy()
    expect(screen.getByTestId('userinputsmatch-input2')).toBeTruthy()
    
    // Select dropdown
    expect(screen.getByTestId('userinputsmatch-validation-type')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('userinputsmatch-match')).toBeTruthy()
    expect(screen.getByTestId('userinputsmatch-clear')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('userinputsmatch-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('userinputsmatch-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows user to input values', () => {
    render(<UserInputsMatch />)
    
    const input1 = screen.getByTestId('userinputsmatch-input1') as HTMLInputElement
    const input2 = screen.getByTestId('userinputsmatch-input2') as HTMLInputElement
    
    fireEvent.change(input1, { target: { value: 'test@example.com' } })
    fireEvent.change(input2, { target: { value: 'test@example.com' } })
    
    expect(input1.value).toBe('test@example.com')
    expect(input2.value).toBe('test@example.com')
  })

  it('check match button is disabled when inputs are empty', () => {
    render(<UserInputsMatch />)
    const matchButton = screen.getByTestId('userinputsmatch-match') as HTMLButtonElement
    expect(matchButton.disabled).toBe(true)
  })

  it('check match button is enabled when both inputs have values', () => {
    render(<UserInputsMatch />)
    
    const input1 = screen.getByTestId('userinputsmatch-input1') as HTMLInputElement
    const input2 = screen.getByTestId('userinputsmatch-input2') as HTMLInputElement
    const matchButton = screen.getByTestId('userinputsmatch-match') as HTMLButtonElement
    
    fireEvent.change(input1, { target: { value: 'test' } })
    fireEvent.change(input2, { target: { value: 'test' } })
    
    expect(matchButton.disabled).toBe(false)
  })

  it('displays current result after checking match', () => {
    render(<UserInputsMatch />)
    
    const input1 = screen.getByTestId('userinputsmatch-input1') as HTMLInputElement
    const input2 = screen.getByTestId('userinputsmatch-input2') as HTMLInputElement
    const matchButton = screen.getByTestId('userinputsmatch-match')
    
    fireEvent.change(input1, { target: { value: 'test@example.com' } })
    fireEvent.change(input2, { target: { value: 'test@example.com' } })
    fireEvent.click(matchButton)
    
    expect(screen.getByTestId('userinputsmatch-current-result')).toBeTruthy()
  })

  it('clears inputs when clear button is clicked', () => {
    render(<UserInputsMatch />)
    
    const input1 = screen.getByTestId('userinputsmatch-input1') as HTMLInputElement
    const input2 = screen.getByTestId('userinputsmatch-input2') as HTMLInputElement
    const clearButton = screen.getByTestId('userinputsmatch-clear')
    
    fireEvent.change(input1, { target: { value: 'test@example.com' } })
    fireEvent.change(input2, { target: { value: 'test@example.com' } })
    fireEvent.click(clearButton)
    
    expect(input1.value).toBe('')
    expect(input2.value).toBe('')
  })

  it('allows changing validation type', () => {
    render(<UserInputsMatch />)
    
    const validationTypeSelect = screen.getByTestId('userinputsmatch-validation-type') as HTMLSelectElement
    
    fireEvent.change(validationTypeSelect, { target: { value: 'phone' } })
    expect(validationTypeSelect.value).toBe('phone')
    
    fireEvent.change(validationTypeSelect, { target: { value: 'username' } })
    expect(validationTypeSelect.value).toBe('username')
  })
})
