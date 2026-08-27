import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ArtistManagersVerify from './ArtistManagersVerify'

describe('ArtistManagersVerify', () => {
  it('renders without crashing', () => {
    render(<ArtistManagersVerify />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ArtistManagersVerify />)
    expect(screen.getByText('Artist Manager Identity Verification')).toBeTruthy()
  })

  it('displays mock verification requests', () => {
    render(<ArtistManagersVerify />)
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('David Chen')).toBeTruthy()
    expect(screen.getByText('Rebecca Torres')).toBeTruthy()
    expect(screen.getByText('Marcus Johnson')).toBeTruthy()
    expect(screen.getByText('Elena Popov')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ArtistManagersVerify />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="artistmanagersverify"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="artistmanagersverify-managername"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-artistname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-managerid"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-company"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="artistmanagersverify-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-reset"]')).toBeTruthy()
    
    // Filter buttons
    expect(document.querySelector('[data-testid="artistmanagersverify-filter-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-filter-pending"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-filter-verified"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="artistmanagersverify-filter-rejected"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="artistmanagersverify-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="artistmanagersverify-item"]').length).toBeGreaterThan(0)
  })

  it('displays form fields with proper labels', () => {
    render(<ArtistManagersVerify />)
    expect(screen.getByLabelText(/Manager Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
    expect(screen.getByLabelText(/Artist Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Manager ID/i)).toBeTruthy()
    expect(screen.getByLabelText(/Management Company/i)).toBeTruthy()
  })

  it('displays verification status badges', () => {
    render(<ArtistManagersVerify />)
    const verifiedElements = screen.getAllByText('Verified')
    expect(verifiedElements.length).toBeGreaterThan(0)
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
  })
})
