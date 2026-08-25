import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsA from './UserSubmitsA'

describe('UserSubmitsA', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the review submission form', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Submit a Review')).toBeTruthy()
    expect(screen.getByLabelText(/Restaurant/)).toBeTruthy()
    expect(screen.getByLabelText(/Rating/)).toBeTruthy()
    expect(screen.getByLabelText(/Review Title/)).toBeTruthy()
    expect(screen.getByLabelText(/Your Review/)).toBeTruthy()
    expect(screen.getByLabelText(/Your Name/)).toBeTruthy()
  })

  it('displays mock reviews', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Recent Reviews')).toBeTruthy()
    expect(screen.getByText('Outstanding dining experience!')).toBeTruthy()
    expect(screen.getByText('The Hungry Wolf')).toBeTruthy()
    expect(screen.getByText(/Mary O'Connor/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsA />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usersubmitsa"]')).toBeTruthy()
    
    // Form elements
    expect(document.querySelector('[data-testid="usersubmitsa-restaurant"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-rating"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-title"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-review"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-submit"]')).toBeTruthy()
    
    // List elements
    expect(document.querySelector('[data-testid="usersubmitsa-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-item"]')).toBeTruthy()
  })

  it('allows user to fill out the form', () => {
    render(<UserSubmitsA />)
    
    const restaurantSelect = screen.getByTestId('usersubmitsa-restaurant') as HTMLSelectElement
    const ratingInput = screen.getByTestId('usersubmitsa-rating') as HTMLInputElement
    const titleInput = screen.getByTestId('usersubmitsa-title') as HTMLInputElement
    const reviewTextarea = screen.getByTestId('usersubmitsa-review') as HTMLTextAreaElement
    const nameInput = screen.getByTestId('usersubmitsa-name') as HTMLInputElement
    
    fireEvent.change(restaurantSelect, { target: { value: '1' } })
    fireEvent.change(ratingInput, { target: { value: '4' } })
    fireEvent.change(titleInput, { target: { value: 'Great food!' } })
    fireEvent.change(reviewTextarea, { target: { value: 'Really enjoyed the meal.' } })
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    expect(restaurantSelect.value).toBe('1')
    expect(ratingInput.value).toBe('4')
    expect(titleInput.value).toBe('Great food!')
    expect(reviewTextarea.value).toBe('Really enjoyed the meal.')
    expect(nameInput.value).toBe('John Doe')
  })

  it('submits a new review', () => {
    render(<UserSubmitsA />)
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('usersubmitsa-restaurant'), { target: { value: '1' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-rating'), { target: { value: '5' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-title'), { target: { value: 'Amazing experience' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-review'), { target: { value: 'The food was fantastic!' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-name'), { target: { value: 'Test User' } })
    
    // Submit the form
    const submitButton = screen.getByTestId('usersubmitsa-submit')
    fireEvent.click(submitButton)
    
    // Check for success message
    expect(screen.getByText(/Review submitted successfully/)).toBeTruthy()
    
    // Check if the new review appears in the list
    expect(screen.getByText('Amazing experience')).toBeTruthy()
    expect(screen.getByText('The food was fantastic!')).toBeTruthy()
  })
})
