import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildWorkforce from './BuildWorkforce'

describe('BuildWorkforce', () => {
  it('renders without crashing', () => {
    render(<BuildWorkforce />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard header', () => {
    render(<BuildWorkforce />)
    expect(screen.getByText('Workforce Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Application volumes, trends, and analytics/i)).toBeInTheDocument()
  })

  it('displays summary cards with aggregate data', () => {
    render(<BuildWorkforce />)
    expect(screen.getByTestId('summary-card-total')).toBeInTheDocument()
    expect(screen.getByTestId('summary-card-new')).toBeInTheDocument()
    expect(screen.getByTestId('summary-card-review')).toBeInTheDocument()
    expect(screen.getByTestId('summary-card-shortlisted')).toBeInTheDocument()
    expect(screen.getByText('Total Applications')).toBeInTheDocument()
  })

  it('displays mock application volumes data', () => {
    render(<BuildWorkforce />)
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Product Manager')).toBeInTheDocument()
    expect(screen.getByText('HR Business Partner')).toBeInTheDocument()
  })

  it('has tab navigation', () => {
    render(<BuildWorkforce />)
    expect(screen.getByTestId('tab-volumes')).toBeInTheDocument()
    expect(screen.getByTestId('tab-trends')).toBeInTheDocument()
    expect(screen.getByTestId('tab-departments')).toBeInTheDocument()
    expect(screen.getByTestId('tab-grades')).toBeInTheDocument()
  })

  it('has department and grade filters', () => {
    render(<BuildWorkforce />)
    expect(screen.getByTestId('filter-department')).toBeInTheDocument()
    expect(screen.getByTestId('filter-grade')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<BuildWorkforce />)
    // Verify main wrapper
    expect(screen.getByTestId('build-workforce')).toBeInTheDocument()
    
    // Verify header
    expect(screen.getByTestId('workforce-header')).toBeInTheDocument()
    
    // Verify summary cards
    expect(screen.getByTestId('workforce-summary-cards')).toBeInTheDocument()
    
    // Verify tabs
    expect(screen.getByTestId('workforce-tabs')).toBeInTheDocument()
    
    // Verify filters
    expect(screen.getByTestId('workforce-filters')).toBeInTheDocument()
    
    // Verify content area
    expect(screen.getByTestId('workforce-content')).toBeInTheDocument()
    
    // Verify list items
    expect(screen.getByTestId('volumes-list')).toBeInTheDocument()
    const volumeItems = screen.getAllByTestId('volume-item')
    expect(volumeItems.length).toBeGreaterThan(0)
    
    // Verify footer
    expect(screen.getByTestId('workforce-footer')).toBeInTheDocument()
  })

  it('displays HR Business Partner role enforcement notice', () => {
    render(<BuildWorkforce />)
    expect(screen.getByText('HR Business Partner Access')).toBeInTheDocument()
    expect(screen.getByText('BR-009 Enforced')).toBeInTheDocument()
  })

  it('shows API endpoint information in footer', () => {
    render(<BuildWorkforce />)
    expect(screen.getByText(/GET \/api\/analytics\/application-volumes/i)).toBeInTheDocument()
    expect(screen.getByText(/GET \/api\/analytics\/trends/i)).toBeInTheDocument()
  })
})
