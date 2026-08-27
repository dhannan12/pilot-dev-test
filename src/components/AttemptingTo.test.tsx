import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AttemptingTo from './AttemptingTo'

describe('AttemptingTo', () => {
  it('renders without crashing', () => {
    render(<AttemptingTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock course data', () => {
    render(<AttemptingTo />)
    
    // Check for course titles
    expect(screen.getByText('Introduction to Sailing Fundamentals')).toBeTruthy()
    expect(screen.getByText('Advanced Navigation Techniques')).toBeTruthy()
    expect(screen.getByText('Coastal Cruising and Safety')).toBeTruthy()
    expect(screen.getByText('Racing Strategies and Competition')).toBeTruthy()
    expect(screen.getByText('Boat Maintenance and Repair')).toBeTruthy()
  })

  it('shows non-instructor user role', () => {
    render(<AttemptingTo />)
    
    expect(screen.getByText('Student')).toBeTruthy()
    expect(screen.getByText('Current Role:')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AttemptingTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="attemptingto"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="attemptingto-list"]')).toBeTruthy()
    
    // List items - should have multiple course items
    const items = document.querySelectorAll('[data-testid="attemptingto-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Buttons
    expect(document.querySelector('[data-testid="attemptingto-promote"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="attemptingto-contact"]')).toBeTruthy()
  })

  it('displays permission denied error when non-instructor attempts to promote', () => {
    render(<AttemptingTo />)
    
    // Find and click a promote button for a non-promoted course
    const promoteButtons = screen.getAllByText('Promote Course')
    fireEvent.click(promoteButtons[0])
    
    // Check that error message appears
    expect(screen.getByTestId('attemptingto-error')).toBeTruthy()
    expect(screen.getByText('Permission Denied')).toBeTruthy()
    expect(screen.getByText(/You do not have permission to promote courses/)).toBeTruthy()
    expect(screen.getByText(/Only instructors can promote courses/)).toBeTruthy()
  })

  it('shows promoted status for already promoted courses', () => {
    render(<AttemptingTo />)
    
    // Should find PROMOTED badges
    const promotedBadges = screen.getAllByText('PROMOTED')
    expect(promotedBadges.length).toBeGreaterThan(0)
    
    // Should find "Already Promoted" buttons
    const alreadyPromotedButtons = screen.getAllByText('Already Promoted')
    expect(alreadyPromotedButtons.length).toBeGreaterThan(0)
  })

  it('displays enrollment counts for courses', () => {
    render(<AttemptingTo />)
    
    expect(screen.getByText(/124 enrolled/)).toBeTruthy()
    expect(screen.getByText(/89 enrolled/)).toBeTruthy()
    expect(screen.getByText(/156 enrolled/)).toBeTruthy()
  })

  it('renders contact administrator button', () => {
    render(<AttemptingTo />)
    
    const contactButton = screen.getByTestId('attemptingto-contact')
    expect(contactButton).toBeTruthy()
    expect(contactButton.textContent).toBe('Contact Administrator')
  })

  it('displays help information about instructor access', () => {
    render(<AttemptingTo />)
    
    expect(screen.getByText(/Course promotion is restricted to instructors only/)).toBeTruthy()
    expect(screen.getByText(/Need to promote a course?/)).toBeTruthy()
  })
})
