/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCanTrack from './UserCanTrack'

describe('UserCanTrack', () => {
  it('renders without crashing', () => {
    render(<UserCanTrack />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<UserCanTrack />)
    
    // Check for student names (using getAllByText for multiple instances)
    expect(screen.getAllByText('Emma Wilson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Liam Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Olivia Brown').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Noah Davis').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ava Martinez').length).toBeGreaterThan(0)
    
    // Check for title (using getAllByText for safety)
    expect(screen.getAllByText('Student Progress Tracker').length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<UserCanTrack />)
    
    // Check for summary stats headers (using getAllByText since they appear multiple times)
    expect(screen.getAllByText('Total Students').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Average Progress').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Average Score').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserCanTrack />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usercantrack"]')).toBeTruthy()
    
    // Search input
    expect(document.querySelector('[data-testid="usercantrack-search"]')).toBeTruthy()
    
    // Sort select
    expect(document.querySelector('[data-testid="usercantrack-sort"]')).toBeTruthy()
    
    // Student list container
    expect(document.querySelector('[data-testid="usercantrack-list"]')).toBeTruthy()
    
    // Student list items
    const items = document.querySelectorAll('[data-testid="usercantrack-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // View details buttons
    const viewButtons = document.querySelectorAll('[data-testid="usercantrack-view-details"]')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays student progress information', () => {
    render(<UserCanTrack />)
    
    // Check for progress-related text (using getAllByText for multiple instances)
    expect(screen.getAllByText(/Overall Progress/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Assignments/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Topics/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Last Active/).length).toBeGreaterThan(0)
  })

  it('displays current topics for students', () => {
    render(<UserCanTrack />)
    
    // Check for specific current topics (using getAllByText for multiple instances)
    expect(screen.getAllByText('Quadratic Equations').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fractions & Decimals').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Trigonometry').length).toBeGreaterThan(0)
  })
})
