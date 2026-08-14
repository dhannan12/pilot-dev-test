import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DefineTargetUsers from './DefineTargetUsers'

describe('DefineTargetUsers', () => {
  it('renders without crashing', () => {
    render(<DefineTargetUsers />)
    expect(document.body).toBeTruthy()
  })

  it('displays the header and description', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Target Users & Personas')).toBeTruthy()
    expect(screen.getByText('Define and understand your target audience through detailed user personas')).toBeTruthy()
  })

  it('displays all mock personas by default', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Michael Rodriguez')).toBeTruthy()
    expect(screen.getByText('Emily Watson')).toBeTruthy()
    expect(screen.getByText('James Thompson')).toBeTruthy()
    expect(screen.getByText('Priya Patel')).toBeTruthy()
  })

  it('displays segment filter buttons', () => {
    render(<DefineTargetUsers />)
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBeGreaterThan(5)
    expect(screen.getAllByText('All')[0]).toBeTruthy()
    expect(screen.getAllByText('Early Adopter').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Decision Maker').length).toBeGreaterThan(0)
  })

  it('filters personas by segment when filter is clicked', () => {
    render(<DefineTargetUsers />)
    
    // Click on "Early Adopter" filter button (first occurrence)
    const buttons = screen.getAllByRole('button')
    const earlyAdopterButton = buttons.find(btn => btn.textContent === 'Early Adopter')
    if (earlyAdopterButton) {
      fireEvent.click(earlyAdopterButton)
    }
    
    // Should show Sarah Chen (Early Adopter)
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    
    // Should not show Michael Rodriguez (Decision Maker) - check by occupation
    const occupations = screen.queryAllByText(/Product Manager|Engineering Director/)
    expect(occupations.some(el => el.textContent?.includes('Engineering Director'))).toBe(false)
  })

  it('displays summary statistics', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Total Personas')).toBeTruthy()
    expect(screen.getByText('User Segments')).toBeTruthy()
    expect(screen.getByText('Avg Age')).toBeTruthy()
    expect(screen.getByText('Total Goals')).toBeTruthy()
  })

  it('shows persona demographics', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Product Manager, 32')).toBeTruthy()
    const earlyAdopters = screen.getAllByText('Early Adopter')
    expect(earlyAdopters.length).toBeGreaterThan(0)
  })

  it('displays goals for personas', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Stay ahead of tech trends')).toBeTruthy()
    expect(screen.getByText('Build high-performing engineering teams')).toBeTruthy()
  })

  it('displays pain points for personas', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText('Too many disconnected tools')).toBeTruthy()
    expect(screen.getByText('Difficult to measure team productivity objectively')).toBeTruthy()
  })

  it('displays persona quotes', () => {
    render(<DefineTargetUsers />)
    expect(screen.getByText(/"I need tools that work seamlessly together, not more apps to juggle."/)).toBeTruthy()
  })

  it('opens detailed modal when persona card is clicked', () => {
    render(<DefineTargetUsers />)
    
    // Find and click a persona card
    const personaCard = screen.getByText('Sarah Chen').closest('div')
    if (personaCard) {
      fireEvent.click(personaCard)
    }
    
    // Should show "All Goals" heading in modal
    expect(screen.getByText('All Goals')).toBeTruthy()
    expect(screen.getByText('Behaviors')).toBeTruthy()
    expect(screen.getByText('Technographics')).toBeTruthy()
  })

  it('closes modal when close button is clicked', () => {
    render(<DefineTargetUsers />)
    
    // Open modal
    const personaCard = screen.getByText('Sarah Chen').closest('div')
    if (personaCard) {
      fireEvent.click(personaCard)
    }
    
    // Close modal using the × button
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    
    // Modal-specific content should not be visible (checking for unique modal headings)
    const allGoalsHeadings = screen.queryAllByText('All Goals')
    // After closing, there should be no "All Goals" heading (it's only in modal)
    expect(allGoalsHeadings.length).toBe(0)
  })
})
