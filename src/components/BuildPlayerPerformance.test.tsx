import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildPlayerPerformance from './BuildPlayerPerformance'

describe('BuildPlayerPerformance', () => {
  it('renders without crashing', () => {
    render(<BuildPlayerPerformance />)
    expect(document.body).toBeTruthy()
  })

  it('displays performance metrics with mock data', () => {
    render(<BuildPlayerPerformance />)
    
    // Check for key performance metrics
    expect(screen.getByText('Win Rate')).toBeTruthy()
    expect(screen.getByText('Service Accuracy')).toBeTruthy()
    expect(screen.getByText('First Serve %')).toBeTruthy()
  })

  it('displays match history table', () => {
    render(<BuildPlayerPerformance />)
    
    // Check for table headers
    expect(screen.getByText('Recent Match History')).toBeTruthy()
    expect(screen.getByText('Opponent')).toBeTruthy()
    expect(screen.getByText('Result')).toBeTruthy()
    
    // Check for match opponents
    expect(screen.getByText('Maria Santos')).toBeTruthy()
    expect(screen.getByText('Chen Wei')).toBeTruthy()
  })

  it('displays skill ratings', () => {
    render(<BuildPlayerPerformance />)
    
    expect(screen.getByText('Skill Ratings')).toBeTruthy()
    expect(screen.getByText('Serve')).toBeTruthy()
    expect(screen.getByText('Forehand')).toBeTruthy()
    expect(screen.getByText('Backhand')).toBeTruthy()
  })

  it('displays performance trend chart', () => {
    render(<BuildPlayerPerformance />)
    
    expect(screen.getByText('Performance Trend (2026)')).toBeTruthy()
    expect(screen.getByText('Jan')).toBeTruthy()
    expect(screen.getByText('Aug')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildPlayerPerformance />)
    
    // Main wrapper
    expect(screen.getByTestId('buildplayerperformance')).toBeTruthy()
    
    // Controls
    expect(screen.getByTestId('buildplayerperformance-period')).toBeTruthy()
    expect(screen.getByTestId('buildplayerperformance-surface')).toBeTruthy()
    expect(screen.getByTestId('buildplayerperformance-overview')).toBeTruthy()
    expect(screen.getByTestId('buildplayerperformance-detailed')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('buildplayerperformance-export')).toBeTruthy()
    expect(screen.getByTestId('buildplayerperformance-refresh')).toBeTruthy()
    expect(screen.getByTestId('buildplayerperformance-compare')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('buildplayerperformance-list')).toBeTruthy()
    
    // List items - check at least one exists
    const items = screen.getAllByTestId('buildplayerperformance-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('renders at least 5 mock matches', () => {
    render(<BuildPlayerPerformance />)
    
    const matchItems = screen.getAllByTestId('buildplayerperformance-item')
    expect(matchItems.length).toBeGreaterThanOrEqual(5)
  })

  it('renders all 6 performance metrics', () => {
    render(<BuildPlayerPerformance />)
    
    const metricCards = screen.getAllByTestId('buildplayerperformance-metric-card')
    expect(metricCards.length).toBe(6)
  })

  it('renders all 6 skill ratings', () => {
    render(<BuildPlayerPerformance />)
    
    const skillItems = screen.getAllByTestId('buildplayerperformance-skill-item')
    expect(skillItems.length).toBe(6)
  })

  it('renders trend bars', () => {
    render(<BuildPlayerPerformance />)
    
    const trendBars = screen.getAllByTestId('buildplayerperformance-trend-bar')
    expect(trendBars.length).toBeGreaterThan(0)
  })
})
