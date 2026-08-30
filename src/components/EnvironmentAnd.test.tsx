import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EnvironmentAnd from './EnvironmentAnd'

describe('EnvironmentAnd', () => {
  it('renders without crashing', () => {
    render(<EnvironmentAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock environment data', () => {
    render(<EnvironmentAnd />)
    expect(screen.getByText('Environment & Project Configuration')).toBeTruthy()
    expect(screen.getAllByText('Development').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Staging').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Production').length).toBeGreaterThan(0)
  })

  it('displays configuration variables section', () => {
    render(<EnvironmentAnd />)
    expect(screen.getByText('Configuration Variables')).toBeTruthy()
    expect(screen.getByText('Add Variable')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<EnvironmentAnd />)
    // Main wrapper
    expect(document.querySelector('[data-testid="environmentand"]')).toBeTruthy()
    // Lists
    expect(document.querySelector('[data-testid="environmentand-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-item"]')).toBeTruthy()
    // Inputs
    expect(document.querySelector('[data-testid="environmentand-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-environment"]')).toBeTruthy()
    // Buttons
    expect(document.querySelector('[data-testid="environmentand-add"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-toggle-secrets"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-save"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-export"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-import"]')).toBeTruthy()
  })

  it('displays environment items with correct data', () => {
    render(<EnvironmentAnd />)
    const items = document.querySelectorAll('[data-testid="environmentand-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('has edit and delete buttons for variables', () => {
    render(<EnvironmentAnd />)
    expect(document.querySelector('[data-testid="environmentand-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="environmentand-delete"]')).toBeTruthy()
  })
})
