import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MusicEnthusiastsAccess from './MusicEnthusiastsAccess'

describe('MusicEnthusiastsAccess', () => {
  it('renders without crashing', () => {
    render(<MusicEnthusiastsAccess />)
    expect(document.body).toBeTruthy()
  })

  it('displays user profile information', () => {
    render(<MusicEnthusiastsAccess />)
    expect(screen.getByText(/Welcome back/i)).toBeTruthy()
    expect(screen.getByText('847')).toBeTruthy()
    expect(screen.getByText(/Favorite Artists/i)).toBeTruthy()
  })

  it('displays recommended tracks by default', () => {
    render(<MusicEnthusiastsAccess />)
    expect(screen.getByText('Blue in Green')).toBeTruthy()
    expect(screen.getByText('One More Time')).toBeTruthy()
    expect(screen.getByText('Karma Police')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MusicEnthusiastsAccess />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="musicenthusiastsaccess"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-tab-tracks"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-tab-playlists"]')).toBeTruthy()
    
    // Genre filter
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-genre-filter"]')).toBeTruthy()
    
    // Tracks list and items
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-tracks-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="musicenthusiastsaccess-track-item"]').length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-play-track"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-add-track"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicenthusiastsaccess-refresh"]')).toBeTruthy()
  })

  it('displays multiple tracks with complete information', () => {
    render(<MusicEnthusiastsAccess />)
    
    // Check for at least 5 tracks
    const trackItems = document.querySelectorAll('[data-testid="musicenthusiastsaccess-track-item"]')
    expect(trackItems.length).toBeGreaterThanOrEqual(5)
    
    // Verify track titles are displayed
    expect(screen.getByText('Blue in Green')).toBeTruthy()
    expect(screen.getByText('One More Time')).toBeTruthy()
    expect(screen.getByText('Karma Police')).toBeTruthy()
  })

  it('displays genre tags in user profile', () => {
    render(<MusicEnthusiastsAccess />)
    
    const genreTags = document.querySelectorAll('[data-testid="musicenthusiastsaccess-genre-tag"]')
    expect(genreTags.length).toBeGreaterThanOrEqual(4)
    
    // Verify genre tags contain expected text
    expect(genreTags[0].textContent).toContain('Jazz')
    expect(genreTags[1].textContent).toContain('Electronic')
  })
})
