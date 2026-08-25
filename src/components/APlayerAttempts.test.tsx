import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import APlayerAttempts from './APlayerAttempts'

describe('APlayerAttempts', () => {
  it('renders without crashing', () => {
    render(<APlayerAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock tournament data', () => {
    render(<APlayerAttempts />)
    expect(screen.getByText(/Spring Championship 2026/i)).toBeTruthy()
    expect(screen.getByText(/City Open Series/i)).toBeTruthy()
    expect(screen.getByText(/Autumn Invitational/i)).toBeTruthy()
    expect(screen.getByText(/Regional Masters Cup/i)).toBeTruthy()
    expect(screen.getByText(/Winter Classic Tournament/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<APlayerAttempts />)
    // Main wrapper
    expect(screen.getByTestId('aplayerattempts')).toBeTruthy()
    // Input fields
    expect(screen.getByTestId('aplayerattempts-name')).toBeTruthy()
    expect(screen.getByTestId('aplayerattempts-email')).toBeTruthy()
    expect(screen.getByTestId('aplayerattempts-skilllevel')).toBeTruthy()
    // List container
    expect(screen.getByTestId('aplayerattempts-list')).toBeTruthy()
    // List items (should have at least 5)
    const items = screen.getAllByTestId('aplayerattempts-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    // Submit button
    expect(screen.getByTestId('aplayerattempts-submit')).toBeTruthy()
  })

  it('renders form fields with correct labels', () => {
    render(<APlayerAttempts />)
    expect(screen.getByLabelText(/Player Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
    expect(screen.getByLabelText(/Skill Level/i)).toBeTruthy()
    expect(screen.getByText(/Select Tournament/i)).toBeTruthy()
  })

  it('displays registration button', () => {
    render(<APlayerAttempts />)
    const submitButton = screen.getByTestId('aplayerattempts-submit')
    expect(submitButton.textContent).toContain('Register')
  })
})
