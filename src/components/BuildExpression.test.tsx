import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildExpression from './BuildExpression'

describe('BuildExpression', () => {
  it('renders without crashing', () => {
    render(<BuildExpression />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<BuildExpression />)
    expect(screen.getByText('Expression of Interest')).toBeTruthy()
    const description = screen.getByText(/Submit your interest/)
    expect(description).toBeTruthy()
  })

  it('displays mock vacancy data in select dropdown', () => {
    render(<BuildExpression />)
    const vacancySelect = screen.getByTestId('build-expression-vacancy')
    expect(vacancySelect).toBeTruthy()
    const options = vacancySelect.querySelectorAll('option')
    expect(options.length).toBeGreaterThan(1)
  })

  it('displays mock expressions in list view', () => {
    render(<BuildExpression />)
    const listTab = screen.getByTestId('build-expression-tab-list')
    fireEvent.click(listTab)
    
    const expressionList = screen.getByTestId('build-expression-list')
    expect(expressionList).toBeTruthy()
    
    const items = screen.getAllByTestId('build-expression-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes', () => {
    render(<BuildExpression />)
    
    expect(screen.getByTestId('build-expression')).toBeTruthy()
    expect(screen.getByTestId('build-expression-tab-submit')).toBeTruthy()
    expect(screen.getByTestId('build-expression-tab-list')).toBeTruthy()
    expect(screen.getByTestId('build-expression-name')).toBeTruthy()
    expect(screen.getByTestId('build-expression-email')).toBeTruthy()
    expect(screen.getByTestId('build-expression-vacancy')).toBeTruthy()
    expect(screen.getByTestId('build-expression-grade')).toBeTruthy()
    expect(screen.getByTestId('build-expression-cover-note')).toBeTruthy()
    expect(screen.getByTestId('build-expression-submit')).toBeTruthy()
  })

  it('validates mandatory cover note', () => {
    render(<BuildExpression />)
    
    const nameInput = screen.getByTestId('build-expression-name') as HTMLInputElement
    const emailInput = screen.getByTestId('build-expression-email') as HTMLInputElement
    const submitButton = screen.getByTestId('build-expression-submit')
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    const errorContainer = document.querySelector('[data-testid="build-expression-errors"]')
    expect(errorContainer).toBeTruthy()
  })

  it('displays grade level validation', () => {
    render(<BuildExpression />)
    
    const vacancySelect = screen.getByTestId('build-expression-vacancy') as HTMLSelectElement
    const gradeSelect = screen.getByTestId('build-expression-grade') as HTMLSelectElement
    
    fireEvent.change(vacancySelect, { target: { value: 'vac-1' } })
    fireEvent.change(gradeSelect, { target: { value: 'Grade 7' } })
    
    const gradeValidation = document.querySelector('[data-testid="build-expression-grade-validation"]')
    expect(gradeValidation).toBeTruthy()
  })

  it('switches between submit and list views', () => {
    render(<BuildExpression />)
    
    expect(screen.getByTestId('build-expression-submit')).toBeTruthy()
    
    const listTab = screen.getByTestId('build-expression-tab-list')
    fireEvent.click(listTab)
    expect(screen.getByTestId('build-expression-list')).toBeTruthy()
    
    const submitTab = screen.getByTestId('build-expression-tab-submit')
    fireEvent.click(submitTab)
    expect(screen.getByTestId('build-expression-submit')).toBeTruthy()
  })

  it('displays notification sent indicator', () => {
    render(<BuildExpression />)
    
    const listTab = screen.getByTestId('build-expression-tab-list')
    fireEvent.click(listTab)
    
    expect(document.body.textContent).toContain('Notified')
    expect(document.body.textContent).toContain('BR-007')
  })
})
