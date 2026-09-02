import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock tradespeople data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Mike Chen')).toBeTruthy()
    expect(screen.getByText('Emily Davis')).toBeTruthy()
    expect(screen.getByText('Robert Taylor')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-area')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('filters tradespeople by valid service area', () => {
    render(<UserAttemptsTo />)
    
    const input = screen.getByTestId('userattemptsto-area') as HTMLInputElement
    const filterButton = screen.getByTestId('userattemptsto-submit')
    
    fireEvent.change(input, { target: { value: 'Downtown' } })
    fireEvent.click(filterButton)
    
    // Should show filtered results
    expect(screen.getByText(/Found/)).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
  })

  it('shows error when filtering by invalid service area', () => {
    render(<UserAttemptsTo />)
    
    const input = screen.getByTestId('userattemptsto-area') as HTMLInputElement
    const filterButton = screen.getByTestId('userattemptsto-submit')
    
    fireEvent.change(input, { target: { value: 'Invalid Area' } })
    fireEvent.click(filterButton)
    
    // Should show error message
    const errorElement = screen.getByTestId('userattemptsto-error')
    expect(errorElement).toBeTruthy()
    expect(screen.getByText(/Service Area Not Found/)).toBeTruthy()
    expect(screen.getByText(/outside our defined service areas/)).toBeTruthy()
  })

  it('resets filter when reset button is clicked', () => {
    render(<UserAttemptsTo />)
    
    const input = screen.getByTestId('userattemptsto-area') as HTMLInputElement
    const filterButton = screen.getByTestId('userattemptsto-submit')
    const resetButton = screen.getByTestId('userattemptsto-reset')
    
    // Apply filter
    fireEvent.change(input, { target: { value: 'Downtown' } })
    fireEvent.click(filterButton)
    
    // Reset
    fireEvent.click(resetButton)
    
    // Should show all tradespeople again
    expect(input.value).toBe('')
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Robert Taylor')).toBeTruthy()
  })

  it('allows clicking on predefined area tags', () => {
    render(<UserAttemptsTo />)
    
    const areaTag = screen.getAllByTestId('userattemptsto-area-tag')[0]
    fireEvent.click(areaTag)
    
    const input = screen.getByTestId('userattemptsto-area') as HTMLInputElement
    expect(input.value).toBeTruthy()
  })

  it('displays contact buttons for each tradesperson', () => {
    render(<UserAttemptsTo />)
    
    const contactButtons = screen.getAllByTestId('userattemptsto-contact')
    expect(contactButtons.length).toBeGreaterThan(0)
  })
})
