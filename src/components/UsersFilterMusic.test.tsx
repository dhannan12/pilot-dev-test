import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UsersFilterMusic from './UsersFilterMusic'

describe('UsersFilterMusic', () => {
  it('renders without crashing', () => {
    render(<UsersFilterMusic />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UsersFilterMusic />)
    expect(screen.getByText('Music Library')).toBeTruthy()
    expect(screen.getByText('Bohemian Rhapsody')).toBeTruthy()
    expect(screen.getByText('Queen')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UsersFilterMusic />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('usersfiltermusic')).toBeTruthy()
    expect(screen.getByTestId('usersfiltermusic-all')).toBeTruthy()
    expect(screen.getByTestId('usersfiltermusic-rock')).toBeTruthy()
    expect(screen.getByTestId('usersfiltermusic-list')).toBeTruthy()
    expect(screen.getAllByTestId('usersfiltermusic-item').length).toBeGreaterThan(0)
  })

  it('filters tracks by genre', () => {
    render(<UsersFilterMusic />)
    
    // Initially shows all tracks (10 tracks)
    expect(screen.getAllByTestId('usersfiltermusic-item').length).toBe(10)
    
    // Click on Rock genre
    const rockButton = screen.getByTestId('usersfiltermusic-rock')
    fireEvent.click(rockButton)
    
    // Should show only Rock tracks (2 tracks: Bohemian Rhapsody, Stairway to Heaven)
    expect(screen.getAllByTestId('usersfiltermusic-item').length).toBe(2)
    expect(screen.getByText('Bohemian Rhapsody')).toBeTruthy()
    expect(screen.getByText('Stairway to Heaven')).toBeTruthy()
  })

  it('shows all tracks when All genre is selected', () => {
    render(<UsersFilterMusic />)
    
    // Click on Jazz
    fireEvent.click(screen.getByTestId('usersfiltermusic-jazz'))
    expect(screen.getAllByTestId('usersfiltermusic-item').length).toBe(2)
    
    // Click on All
    fireEvent.click(screen.getByTestId('usersfiltermusic-all'))
    expect(screen.getAllByTestId('usersfiltermusic-item').length).toBe(10)
  })

  it('displays track count', () => {
    render(<UsersFilterMusic />)
    expect(screen.getByText('Showing 10 tracks')).toBeTruthy()
    
    // Filter by Pop
    fireEvent.click(screen.getByTestId('usersfiltermusic-pop'))
    expect(screen.getByText('Showing 2 tracks')).toBeTruthy()
  })
})
