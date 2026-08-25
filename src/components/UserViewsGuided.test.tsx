import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserViewsGuided from './UserViewsGuided'

describe('UserViewsGuided', () => {
  it('renders without crashing', () => {
    render(<UserViewsGuided />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<UserViewsGuided />)
    expect(screen.getByText('Guided Tour Options')).toBeTruthy()
  })

  it('displays at least 5 mock tour items', () => {
    render(<UserViewsGuided />)
    const tourItems = document.querySelectorAll('[data-testid="userviewsguided-item"]')
    expect(tourItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays tour details for each tour', () => {
    render(<UserViewsGuided />)
    // Check for expected tour names
    expect(screen.getByText('General Museum Tour')).toBeTruthy()
    expect(screen.getByText('Medieval Dundalk Experience')).toBeTruthy()
    expect(screen.getByText('Industrial Heritage Walk')).toBeTruthy()
  })

  it('displays available times for tours', () => {
    render(<UserViewsGuided />)
    const times10AM = screen.getAllByText('10:00 AM')
    const times2PM = screen.getAllByText('2:00 PM')
    expect(times10AM.length).toBeGreaterThan(0)
    expect(times2PM.length).toBeGreaterThan(0)
  })

  it('displays tour highlights', () => {
    render(<UserViewsGuided />)
    expect(screen.getByText('Medieval Artifacts')).toBeTruthy()
    expect(screen.getByText('Castle Ruins Tour')).toBeTruthy()
  })

  it('has book buttons for each tour', () => {
    render(<UserViewsGuided />)
    const bookButtons = document.querySelectorAll('[data-testid="userviewsguided-book"]')
    expect(bookButtons.length).toBeGreaterThanOrEqual(5)
  })

  it('handles book button click', () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UserViewsGuided />)
    const bookButtons = document.querySelectorAll('[data-testid="userviewsguided-book"]')
    
    fireEvent.click(bookButtons[0])
    expect(alertMock).toHaveBeenCalledWith('Booking tour ID: 1')
    
    alertMock.mockRestore()
  })

  it('has required data-testid attributes', () => {
    render(<UserViewsGuided />)
    
    // Main wrapper
    const wrapper = document.querySelector('[data-testid="userviewsguided"]')
    expect(wrapper).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="userviewsguided-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="userviewsguided-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Book buttons
    const bookButtons = document.querySelectorAll('[data-testid="userviewsguided-book"]')
    expect(bookButtons.length).toBeGreaterThan(0)
  })

  it('displays pricing information', () => {
    render(<UserViewsGuided />)
    // Check for euro symbol and pricing
    const priceElements = screen.getAllByText(/€\d+/)
    expect(priceElements.length).toBeGreaterThan(0)
  })

  it('displays important information section', () => {
    render(<UserViewsGuided />)
    expect(screen.getByText('Important Information')).toBeTruthy()
  })
})
