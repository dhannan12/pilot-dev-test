import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemIdentifiesTop from './SystemIdentifiesTop'

describe('SystemIdentifiesTop', () => {
  it('renders without crashing', () => {
    render(<SystemIdentifiesTop />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock contributor data', () => {
    render(<SystemIdentifiesTop />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Top Contributors')).toBeTruthy()
  })

  it('shows statistics summary', () => {
    render(<SystemIdentifiesTop />)
    expect(screen.getByText('Total Hours')).toBeTruthy()
    expect(screen.getByText('Average Hours')).toBeTruthy()
    expect(screen.getByText('Contributors')).toBeTruthy()
  })

  it('displays contributor ranks and badges', () => {
    render(<SystemIdentifiesTop />)
    expect(screen.getByText('#1')).toBeTruthy()
    expect(screen.getByText('#2')).toBeTruthy()
    expect(screen.getByText('#3')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SystemIdentifiesTop />)
    
    // Verify main wrapper
    expect(screen.getByTestId('systemidentifiestop')).toBeTruthy()
    
    // Verify list container
    expect(screen.getByTestId('systemidentifiestop-list')).toBeTruthy()
    
    // Verify list items
    const items = screen.getAllByTestId('systemidentifiestop-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify filter inputs
    expect(screen.getByTestId('systemidentifiestop-timerange')).toBeTruthy()
    expect(screen.getByTestId('systemidentifiestop-minhours')).toBeTruthy()
    
    // Verify buttons
    expect(screen.getByTestId('systemidentifiestop-reset')).toBeTruthy()
    expect(screen.getByTestId('systemidentifiestop-export')).toBeTruthy()
    
    // Verify view buttons
    const viewButtons = screen.getAllByTestId('systemidentifiestop-view')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('renders filter controls', () => {
    render(<SystemIdentifiesTop />)
    expect(screen.getByTestId('systemidentifiestop-timerange')).toBeTruthy()
    expect(screen.getByTestId('systemidentifiestop-minhours')).toBeTruthy()
    expect(screen.getByTestId('systemidentifiestop-reset')).toBeTruthy()
  })

  it('renders action buttons', () => {
    render(<SystemIdentifiesTop />)
    expect(screen.getByTestId('systemidentifiestop-export')).toBeTruthy()
    const viewButtons = screen.getAllByTestId('systemidentifiestop-view')
    expect(viewButtons.length).toBe(7) // One for each contributor
  })
})
