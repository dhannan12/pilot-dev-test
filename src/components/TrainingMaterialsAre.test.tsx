import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TrainingMaterialsAre from './TrainingMaterialsAre'

describe('TrainingMaterialsAre', () => {
  it('renders without crashing', () => {
    render(<TrainingMaterialsAre />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock training materials', () => {
    render(<TrainingMaterialsAre />)
    
    // Check for component title
    expect(screen.getByText(/Training Materials/i)).toBeTruthy()
    
    // Check for at least one mock material
    expect(screen.getByText(/Introduction to Advanced Mathematics Teaching/i)).toBeTruthy()
    expect(screen.getByText(/Differentiated Instruction Strategies/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<TrainingMaterialsAre />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="trainingmaterialsare"]')
    expect(mainWrapper).toBeTruthy()
    
    const searchInput = document.querySelector('[data-testid="trainingmaterialsare-search"]')
    expect(searchInput).toBeTruthy()
    
    const typeFilter = document.querySelector('[data-testid="trainingmaterialsare-type-filter"]')
    expect(typeFilter).toBeTruthy()
    
    const materialsList = document.querySelector('[data-testid="trainingmaterialsare-list"]')
    expect(materialsList).toBeTruthy()
    
    const materialItems = document.querySelectorAll('[data-testid="trainingmaterialsare-item"]')
    expect(materialItems.length).toBeGreaterThan(0)
    
    const viewButtons = document.querySelectorAll('[data-testid="trainingmaterialsare-view"]')
    expect(viewButtons.length).toBeGreaterThan(0)
    
    const downloadButtons = document.querySelectorAll('[data-testid="trainingmaterialsare-download"]')
    expect(downloadButtons.length).toBeGreaterThan(0)
  })

  it('displays all mock materials initially', () => {
    render(<TrainingMaterialsAre />)
    
    const materialItems = document.querySelectorAll('[data-testid="trainingmaterialsare-item"]')
    // Should display all 8 mock materials
    expect(materialItems.length).toBe(8)
  })

  it('shows materials list and controls', () => {
    render(<TrainingMaterialsAre />)
    
    // Verify search and filter controls exist
    const searchInput = screen.getByPlaceholderText(/Search by title/i)
    expect(searchInput).toBeTruthy()
    
    const typeFilter = screen.getByLabelText(/Filter by Type/i)
    expect(typeFilter).toBeTruthy()
  })
})
