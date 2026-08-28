import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupBackend from './SetupBackend'

describe('SetupBackend', () => {
  it('renders without crashing', () => {
    render(<SetupBackend />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock API endpoints', () => {
    render(<SetupBackend />)
    // Check for the page title
    expect(screen.getByText('Backend API Configuration')).toBeTruthy()
    // Check for at least one mock endpoint
    expect(screen.getAllByText('/api/products').length).toBeGreaterThan(0)
    expect(screen.getByText('Retrieve all clothing products')).toBeTruthy()
  })

  it('displays statistics', () => {
    render(<SetupBackend />)
    // Should show stats cards
    expect(screen.getByText('Total Endpoints')).toBeTruthy()
    expect(screen.getByText('Active')).toBeTruthy()
    expect(screen.getByText('Avg Response Time')).toBeTruthy()
  })

  it('renders the add endpoint form', () => {
    render(<SetupBackend />)
    expect(screen.getByText('Add New Endpoint')).toBeTruthy()
    expect(screen.getByPlaceholderText('/api/...')).toBeTruthy()
    expect(screen.getByPlaceholderText('Endpoint description')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupBackend />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="setupbackend"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-method"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-path"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-filter"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-test"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupbackend-delete"]')).toBeTruthy()
  })

  it('displays all method badges', () => {
    render(<SetupBackend />)
    // Check that different HTTP methods are displayed
    const methodBadges = document.querySelectorAll('.text-xs.font-semibold')
    expect(methodBadges.length).toBeGreaterThan(0)
  })
})
