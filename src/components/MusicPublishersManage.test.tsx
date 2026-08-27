import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MusicPublishersManage from './MusicPublishersManage'

describe('MusicPublishersManage', () => {
  it('renders without crashing', () => {
    render(<MusicPublishersManage />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock publisher data', () => {
    render(<MusicPublishersManage />)
    
    // Check for publisher names in mock data
    expect(screen.getByText('Universal Music Publishing Group')).toBeTruthy()
    expect(screen.getByText('Sony Music Publishing')).toBeTruthy()
    expect(screen.getByText('Warner Chappell Music')).toBeTruthy()
    expect(screen.getByText('BMG Rights Management')).toBeTruthy()
    expect(screen.getByText('Kobalt Music Publishing')).toBeTruthy()
  })

  it('displays header and description', () => {
    render(<MusicPublishersManage />)
    
    expect(screen.getByText('Music Publishers Management')).toBeTruthy()
    expect(screen.getByText('Manage publisher rights, territories, and distribution channels')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MusicPublishersManage />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="musicpublishersmanage"]')).toBeTruthy()
    
    // Search and filter inputs
    expect(document.querySelector('[data-testid="musicpublishersmanage-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicpublishersmanage-filter"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="musicpublishersmanage-add"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="musicpublishersmanage-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicpublishersmanage-item"]')).toBeTruthy()
    
    // Action buttons in table
    expect(document.querySelector('[data-testid="musicpublishersmanage-view"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicpublishersmanage-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="musicpublishersmanage-delete"]')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<MusicPublishersManage />)
    
    expect(screen.getByText('Total Publishers')).toBeTruthy()
    expect(screen.getByText('Active Publishers')).toBeTruthy()
    expect(screen.getByText('Total Songs Managed')).toBeTruthy()
    expect(screen.getByText('Avg Revenue Share')).toBeTruthy()
  })

  it('shows at least 5 mock publishers', () => {
    render(<MusicPublishersManage />)
    
    const publisherItems = document.querySelectorAll('[data-testid="musicpublishersmanage-item"]')
    expect(publisherItems.length).toBeGreaterThanOrEqual(5)
  })
})
