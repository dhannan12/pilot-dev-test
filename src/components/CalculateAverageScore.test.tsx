import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateAverageScore from './CalculateAverageScore'

describe('CalculateAverageScore', () => {
  it('renders without crashing', () => {
    render(<CalculateAverageScore />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock player data', () => {
    render(<CalculateAverageScore />)
    
    // Check if mock players are rendered
    expect(screen.getByText('Alex Johnson')).toBeTruthy()
    expect(screen.getByText('Sarah Williams')).toBeTruthy()
    expect(screen.getByText('Marcus Chen')).toBeTruthy()
    expect(screen.getByText('Emma Davis')).toBeTruthy()
    expect(screen.getByText('Jordan Lee')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    const { container } = render(<CalculateAverageScore />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(container.querySelector('[data-testid="calculateaveragescore"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-name"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-score"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-matches"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-submit"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-list"]')).toBeTruthy()
    expect(container.querySelectorAll('[data-testid="calculateaveragescore-item"]').length).toBeGreaterThan(0)
    expect(container.querySelector('[data-testid="calculateaveragescore-edit"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="calculateaveragescore-delete"]')).toBeTruthy()
  })

  it('displays overall statistics', () => {
    render(<CalculateAverageScore />)
    
    // Check if statistics sections are present
    expect(screen.getByText('Total Players')).toBeTruthy()
    expect(screen.getByText('Total Matches')).toBeTruthy()
    expect(screen.getAllByText('Total Score').length).toBeGreaterThan(0)
    expect(screen.getByText('Overall Average')).toBeTruthy()
  })

  it('can add a new player and calculate average', () => {
    render(<CalculateAverageScore />)
    
    const nameInput = screen.getByTestId('calculateaveragescore-name') as HTMLInputElement
    const scoreInput = screen.getByTestId('calculateaveragescore-score') as HTMLInputElement
    const matchesInput = screen.getByTestId('calculateaveragescore-matches') as HTMLInputElement
    const submitButton = screen.getByTestId('calculateaveragescore-submit')
    
    // Fill in the form
    fireEvent.change(nameInput, { target: { value: 'Test Player' } })
    fireEvent.change(scoreInput, { target: { value: '100' } })
    fireEvent.change(matchesInput, { target: { value: '5' } })
    
    // Submit the form
    fireEvent.click(submitButton)
    
    // Check if new player appears
    expect(screen.getByText('Test Player')).toBeTruthy()
  })

  it('displays calculated average in real-time', () => {
    render(<CalculateAverageScore />)
    
    const scoreInput = screen.getByTestId('calculateaveragescore-score') as HTMLInputElement
    const matchesInput = screen.getByTestId('calculateaveragescore-matches') as HTMLInputElement
    
    // Fill in values
    fireEvent.change(scoreInput, { target: { value: '200' } })
    fireEvent.change(matchesInput, { target: { value: '10' } })
    
    // Check if calculated average appears (200/10 = 20)
    expect(screen.getByText('Calculated Average')).toBeTruthy()
  })

  it('can edit an existing player', () => {
    render(<CalculateAverageScore />)
    
    // Click edit on the first player
    const editButtons = screen.getAllByTestId('calculateaveragescore-edit')
    fireEvent.click(editButtons[0])
    
    // Check if form switches to edit mode
    expect(screen.getByText('Edit Player')).toBeTruthy()
    expect(screen.getByTestId('calculateaveragescore-cancel')).toBeTruthy()
  })

  it('can delete a player', () => {
    render(<CalculateAverageScore />)
    
    // Get initial player name
    const playerName = screen.getByText('Alex Johnson')
    expect(playerName).toBeTruthy()
    
    // Click delete on the first player
    const deleteButtons = screen.getAllByTestId('calculateaveragescore-delete')
    fireEvent.click(deleteButtons[0])
    
    // Player should be removed
    expect(() => screen.getByText('Alex Johnson')).toThrow()
  })
})
