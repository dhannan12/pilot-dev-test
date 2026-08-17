import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HiringTrack from './HiringTrack'

describe('HiringTrack', () => {
  it('renders without crashing', () => {
    render(<HiringTrack />)
    expect(document.body).toBeTruthy()
  })

  it('displays the recruitment pipeline header', () => {
    render(<HiringTrack />)
    expect(screen.getByText('Recruitment Pipeline')).toBeInTheDocument()
    expect(screen.getByText(/Track and manage candidates/)).toBeInTheDocument()
  })

  it('displays mock candidate data', () => {
    render(<HiringTrack />)
    // Check for specific candidate names
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
  })

  it('displays pipeline stage metrics', () => {
    render(<HiringTrack />)
    // Check for stage labels using getAllByText since they appear in multiple places
    expect(screen.getAllByText('Applied').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Screening').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Interview').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Offer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hired').length).toBeGreaterThan(0)
  })

  it('displays search and filter inputs', () => {
    render(<HiringTrack />)
    const searchInput = screen.getByPlaceholderText(/Search by name or position/)
    const stageFilter = screen.getByLabelText(/Filter by Stage/)
    expect(searchInput).toBeInTheDocument()
    expect(stageFilter).toBeInTheDocument()
  })

  it('displays candidate cards with action buttons', () => {
    render(<HiringTrack />)
    const viewDetailsButtons = screen.getAllByText('View Details')
    const updateButtons = screen.getAllByText('Update')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    expect(updateButtons.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<HiringTrack />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('hiring-track')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metrics')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-filters')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-search')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-stage-filter')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-list')).toBeInTheDocument()
    
    // Check for candidate cards
    const candidateCards = screen.getAllByTestId('hiring-track-candidate-card')
    expect(candidateCards.length).toBeGreaterThan(0)
    
    // Check for action buttons
    const viewDetailsButtons = screen.getAllByTestId('hiring-track-view-details')
    const updateButtons = screen.getAllByTestId('hiring-track-update-status')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    expect(updateButtons.length).toBeGreaterThan(0)
  })

  it('displays all stage metrics with correct testids', () => {
    render(<HiringTrack />)
    expect(screen.getByTestId('hiring-track-metric-applied')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metric-screening')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metric-interview')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metric-offer')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metric-hired')).toBeInTheDocument()
    expect(screen.getByTestId('hiring-track-metric-rejected')).toBeInTheDocument()
  })
})
