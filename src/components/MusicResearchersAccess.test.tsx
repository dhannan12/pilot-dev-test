import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MusicResearchersAccess from './MusicResearchersAccess'

describe('MusicResearchersAccess', () => {
  it('renders without crashing', () => {
    render(<MusicResearchersAccess />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<MusicResearchersAccess />)
    expect(screen.getByText(/Music Research Data Analysis/i)).toBeTruthy()
    expect(screen.getByText(/Global Music Trends 2024/i)).toBeTruthy()
    expect(screen.getByText(/Genre Evolution Analysis/i)).toBeTruthy()
    expect(screen.getByText(/Listener Demographics Study/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MusicResearchersAccess />)
    
    // Main wrapper
    const wrapper = document.querySelector('[data-testid="musicresearchersaccess"]')
    expect(wrapper).toBeTruthy()
    
    // Search input
    const search = document.querySelector('[data-testid="musicresearchersaccess-search"]')
    expect(search).toBeTruthy()
    
    // Category select
    const category = document.querySelector('[data-testid="musicresearchersaccess-category"]')
    expect(category).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="musicresearchersaccess-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="musicresearchersaccess-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    const viewButton = document.querySelector('[data-testid="musicresearchersaccess-view"]')
    expect(viewButton).toBeTruthy()
    
    const downloadButton = document.querySelector('[data-testid="musicresearchersaccess-download"]')
    expect(downloadButton).toBeTruthy()
    
    const exportAllButton = document.querySelector('[data-testid="musicresearchersaccess-export-all"]')
    expect(exportAllButton).toBeTruthy()
  })

  it('renders all analysis sections', () => {
    render(<MusicResearchersAccess />)
    const items = document.querySelectorAll('[data-testid="musicresearchersaccess-item"]')
    expect(items.length).toBe(7) // 7 mock analysis sections
  })

  it('displays category badges', () => {
    render(<MusicResearchersAccess />)
    const categoryBadges = document.querySelectorAll('.bg-blue-100, .bg-purple-100, .bg-green-100')
    expect(categoryBadges.length).toBeGreaterThan(0)
  })
})
