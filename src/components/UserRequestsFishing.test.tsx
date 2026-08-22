import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserRequestsFishing from './UserRequestsFishing'

describe('UserRequestsFishing', () => {
  it('renders without crashing', () => {
    render(<UserRequestsFishing />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock fishing spot data', () => {
    render(<UserRequestsFishing />)
    // Check for at least some of the mock fishing spots
    expect(screen.getByText('Corrib River Banks')).toBeTruthy()
    expect(screen.getByText('Lough Mask Shore')).toBeTruthy()
    expect(screen.getByText(/Fishing Spot Recommendations/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserRequestsFishing />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userrequestsfishing"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="userrequestsfishing-fishtype"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-experience"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-season"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userrequestsfishing-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-reset"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="userrequestsfishing-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-item"]')).toBeTruthy()
  })

  it('filters fishing spots by experience level', () => {
    render(<UserRequestsFishing />)
    
    const experienceSelect = screen.getByTestId('userrequestsfishing-experience')
    const submitButton = screen.getByTestId('userrequestsfishing-submit')
    
    // Select Beginner level
    fireEvent.change(experienceSelect, { target: { value: 'Beginner' } })
    fireEvent.click(submitButton)
    
    // Should still show beginner spots
    expect(screen.getByText('Lough Mask Shore')).toBeTruthy()
    expect(screen.getByText('Claregalway Pier')).toBeTruthy()
  })

  it('resets filters when reset button is clicked', () => {
    render(<UserRequestsFishing />)
    
    const fishTypeInput = screen.getByTestId('userrequestsfishing-fishtype')
    const resetButton = screen.getByTestId('userrequestsfishing-reset')
    
    // Set a filter
    fireEvent.change(fishTypeInput, { target: { value: 'Salmon' } })
    expect((fishTypeInput as HTMLInputElement).value).toBe('Salmon')
    
    // Reset
    fireEvent.click(resetButton)
    expect((fishTypeInput as HTMLInputElement).value).toBe('')
  })

  it('displays all fishing spots initially', () => {
    render(<UserRequestsFishing />)
    
    const items = document.querySelectorAll('[data-testid="userrequestsfishing-item"]')
    // Should have at least 5 mock items
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
