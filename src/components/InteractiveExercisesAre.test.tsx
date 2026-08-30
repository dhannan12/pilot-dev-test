import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import InteractiveExercisesAre from './InteractiveExercisesAre'

describe('InteractiveExercisesAre', () => {
  it('renders without crashing', () => {
    render(<InteractiveExercisesAre />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<InteractiveExercisesAre />)
    const heading = screen.getByText(/Age-Appropriate Math Exercises/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock exercises data', () => {
    render(<InteractiveExercisesAre />)
    // Check for some exercise titles (at default age 8)
    const multElements = screen.getAllByText(/Multiplication Tables/i)
    expect(multElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Division Practice/i)).toBeTruthy()
  })

  it('shows age selector with default value', () => {
    render(<InteractiveExercisesAre />)
    const ageInput = screen.getByTestId('interactiveexercisesare-age')
    expect(ageInput).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<InteractiveExercisesAre />)
    
    // Main wrapper
    expect(screen.getByTestId('interactiveexercisesare')).toBeTruthy()
    
    // Age selector
    expect(screen.getByTestId('interactiveexercisesare-age')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('interactiveexercisesare-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('interactiveexercisesare-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Select buttons
    const selectButtons = screen.getAllByTestId('interactiveexercisesare-select')
    expect(selectButtons.length).toBeGreaterThan(0)
  })

  it('filters exercises by age appropriately', () => {
    render(<InteractiveExercisesAre />)
    // Default age is 8, which should show medium difficulty exercises
    const multElements = screen.getAllByText(/Multiplication Tables/i)
    expect(multElements.length).toBeGreaterThan(0)
    const divElements = screen.getAllByText(/Division Practice/i)
    expect(divElements.length).toBeGreaterThan(0)
  })

  it('displays difficulty badges', () => {
    render(<InteractiveExercisesAre />)
    // At age 8, only Medium exercises are visible
    const mediumBadges = screen.getAllByText(/Medium/i)
    expect(mediumBadges.length).toBeGreaterThan(0)
  })

  it('shows exercise count', () => {
    render(<InteractiveExercisesAre />)
    const countText = document.body.textContent
    expect(countText).toContain('exercises available')
  })
})
