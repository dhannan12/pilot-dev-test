import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MusicResearchersExport from './MusicResearchersExport'

describe('MusicResearchersExport', () => {
  it('renders without crashing', () => {
    render(<MusicResearchersExport />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<MusicResearchersExport />)
    expect(screen.getByText('Bohemian Rhapsody')).toBeTruthy()
    expect(screen.getByText('Michael Jackson')).toBeTruthy()
    expect(screen.getByText('Eagles')).toBeTruthy()
    expect(screen.getByText('Nirvana')).toBeTruthy()
    expect(screen.getByText('Guns N Roses')).toBeTruthy()
  })

  it('displays page title and description', () => {
    render(<MusicResearchersExport />)
    expect(screen.getByText('Music Research Data Export')).toBeTruthy()
    expect(screen.getByText('Select tracks and export data for analysis')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MusicResearchersExport />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="musicresearchersexport"]')).toBeTruthy()
    
    // Controls
    expect(document.querySelector('[data-testid="musicresearchersexport-genre"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicresearchersexport-format"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicresearchersexport-submit"]')).toBeTruthy()
    
    // Selection controls
    expect(document.querySelector('[data-testid="musicresearchersexport-select-all"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="musicresearchersexport-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicresearchersexport-item"]')).toBeTruthy()
  })

  it('displays export format options', () => {
    render(<MusicResearchersExport />)
    const formatSelect = screen.getByTestId('musicresearchersexport-format')
    expect(formatSelect).toBeTruthy()
    expect(screen.getByText('CSV')).toBeTruthy()
    expect(screen.getByText('JSON')).toBeTruthy()
    expect(screen.getByText('XLSX')).toBeTruthy()
  })

  it('displays genre filter options', () => {
    render(<MusicResearchersExport />)
    const genreSelect = screen.getByTestId('musicresearchersexport-genre')
    expect(genreSelect).toBeTruthy()
    expect(screen.getByText('All Genres')).toBeTruthy()
  })

  it('displays track count', () => {
    render(<MusicResearchersExport />)
    expect(screen.getByText(/Available Tracks/)).toBeTruthy()
  })
})
