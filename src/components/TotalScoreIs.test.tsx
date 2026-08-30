import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TotalScoreIs from './TotalScoreIs'

describe('TotalScoreIs', () => {
  it('renders without crashing', () => {
    render(<TotalScoreIs />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<TotalScoreIs />)
    expect(screen.getByText('Addition Problems')).toBeTruthy()
    expect(screen.getByText('Subtraction Problems')).toBeTruthy()
    expect(screen.getByText('Multiplication Problems')).toBeTruthy()
    expect(screen.getByText('Division Problems')).toBeTruthy()
    expect(screen.getByText('Word Problems')).toBeTruthy()
  })

  it('calculates total score correctly', () => {
    render(<TotalScoreIs />)
    const totalElement = screen.getByTestId('totalscoreis-total')
    // Initial total: 18+15+17+14+19+16+18 = 117 out of 140 (7*20)
    expect(totalElement.textContent).toContain('117')
    expect(totalElement.textContent).toContain('140')
  })

  it('displays percentage correctly', () => {
    render(<TotalScoreIs />)
    const percentageElement = screen.getByTestId('totalscoreis-percentage')
    // 117/140 = 83.57% ≈ 84%
    expect(percentageElement.textContent).toContain('84%')
  })

  it('has required data-testid attributes', () => {
    render(<TotalScoreIs />)
    // Main wrapper
    expect(screen.getByTestId('totalscoreis')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('totalscoreis-list')).toBeTruthy()
    const items = screen.getAllByTestId('totalscoreis-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    expect(screen.getByTestId('totalscoreis-reset')).toBeTruthy()
    expect(screen.getByTestId('totalscoreis-clear')).toBeTruthy()
    
    // Input fields
    const scoreInput = screen.getByTestId('totalscoreis-score-1')
    expect(scoreInput).toBeTruthy()
    
    // Summary stats
    expect(screen.getByTestId('totalscoreis-item-count')).toBeTruthy()
    expect(screen.getByTestId('totalscoreis-average')).toBeTruthy()
    expect(screen.getByTestId('totalscoreis-grade')).toBeTruthy()
  })

  it('updates score when input changes', () => {
    render(<TotalScoreIs />)
    const scoreInput = screen.getByTestId('totalscoreis-score-1') as HTMLInputElement
    
    fireEvent.change(scoreInput, { target: { value: '20' } })
    
    const totalElement = screen.getByTestId('totalscoreis-total')
    // New total: 20+15+17+14+19+16+18 = 119
    expect(totalElement.textContent).toContain('119')
  })

  it('resets scores when reset button is clicked', () => {
    render(<TotalScoreIs />)
    
    // Change a score first
    const scoreInput = screen.getByTestId('totalscoreis-score-1') as HTMLInputElement
    fireEvent.change(scoreInput, { target: { value: '5' } })
    
    // Click reset
    const resetButton = screen.getByTestId('totalscoreis-reset')
    fireEvent.click(resetButton)
    
    // Check that the original score is restored
    const totalElement = screen.getByTestId('totalscoreis-total')
    expect(totalElement.textContent).toContain('117')
  })

  it('clears all scores when clear button is clicked', () => {
    render(<TotalScoreIs />)
    
    const clearButton = screen.getByTestId('totalscoreis-clear')
    fireEvent.click(clearButton)
    
    const totalElement = screen.getByTestId('totalscoreis-total')
    expect(totalElement.textContent).toContain('0')
  })

  it('displays correct grade based on percentage', () => {
    render(<TotalScoreIs />)
    const gradeElement = screen.getByTestId('totalscoreis-grade')
    // 84% should be a B
    expect(gradeElement.textContent).toContain('B')
  })

  it('displays correct item count', () => {
    render(<TotalScoreIs />)
    const itemCountElement = screen.getByTestId('totalscoreis-item-count')
    expect(itemCountElement.textContent).toContain('7')
  })

  it('calculates average score correctly', () => {
    render(<TotalScoreIs />)
    const averageElement = screen.getByTestId('totalscoreis-average')
    // 117 / 7 ≈ 17
    expect(averageElement.textContent).toContain('17')
  })
})
