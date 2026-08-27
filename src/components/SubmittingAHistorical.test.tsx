import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmittingAHistorical from './SubmittingAHistorical'

describe('SubmittingAHistorical', () => {
  it('renders without crashing', () => {
    render(<SubmittingAHistorical />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data for submitted documents', () => {
    render(<SubmittingAHistorical />)
    expect(screen.getByText(/Treaty of Versailles Original Draft/i)).toBeTruthy()
    expect(screen.getByText(/Declaration of Independence Manuscript/i)).toBeTruthy()
    expect(screen.getByText(/Magna Carta Charter/i)).toBeTruthy()
    expect(screen.getByText(/Emancipation Proclamation/i)).toBeTruthy()
    expect(screen.getByText(/United Nations Charter/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SubmittingAHistorical />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="submittingahistorical"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="submittingahistorical-title"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submittingahistorical-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submittingahistorical-documenttype"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submittingahistorical-historicaldate"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="submittingahistorical-submit"]')).toBeTruthy()
    
    // List and items
    expect(document.querySelector('[data-testid="submittingahistorical-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="submittingahistorical-item"]').length).toBeGreaterThan(0)
  })

  it('renders the form with all required fields', () => {
    render(<SubmittingAHistorical />)
    expect(screen.getByText(/Submit Historical Document/i)).toBeTruthy()
    expect(screen.getByLabelText(/Document Title/i)).toBeTruthy()
    expect(screen.getByLabelText(/Document Description/i)).toBeTruthy()
    expect(screen.getByLabelText(/Document Type/i)).toBeTruthy()
    expect(screen.getByLabelText(/Historical Date/i)).toBeTruthy()
  })
})
