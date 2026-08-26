import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlayersAreNotified from './PlayersAreNotified'

describe('PlayersAreNotified', () => {
  it('renders without crashing', () => {
    render(<PlayersAreNotified />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock notification data', () => {
    render(<PlayersAreNotified />)
    expect(screen.getByText(/Match Notifications/i)).toBeTruthy()
    expect(screen.getByText(/Alexandra Chen/i)).toBeTruthy()
    expect(screen.getByText(/Marcus Johnson/i)).toBeTruthy()
    const boardElements = screen.getAllByText(/Board:/i)
    expect(boardElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<PlayersAreNotified />)
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="playersarenotified"]')
    expect(mainWrapper).toBeTruthy()
    
    const list = document.querySelector('[data-testid="playersarenotified-list"]')
    expect(list).toBeTruthy()
    
    const items = document.querySelectorAll('[data-testid="playersarenotified-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    const markAllReadBtn = document.querySelector('[data-testid="playersarenotified-mark-all-read"]')
    expect(markAllReadBtn).toBeTruthy()
    
    const clearAllBtn = document.querySelector('[data-testid="playersarenotified-clear-all"]')
    expect(clearAllBtn).toBeTruthy()
    
    const dismissBtn = document.querySelector('[data-testid="playersarenotified-dismiss"]')
    expect(dismissBtn).toBeTruthy()
  })

  it('displays multiple notifications', () => {
    render(<PlayersAreNotified />)
    const items = document.querySelectorAll('[data-testid="playersarenotified-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('marks notification as read when mark read button is clicked', () => {
    render(<PlayersAreNotified />)
    const markReadButtons = document.querySelectorAll('[data-testid="playersarenotified-mark-read"]')
    const initialCount = markReadButtons.length
    
    if (markReadButtons.length > 0) {
      fireEvent.click(markReadButtons[0])
      const updatedButtons = document.querySelectorAll('[data-testid="playersarenotified-mark-read"]')
      expect(updatedButtons.length).toBeLessThan(initialCount)
    }
  })

  it('dismisses notification when dismiss button is clicked', () => {
    render(<PlayersAreNotified />)
    const initialItems = document.querySelectorAll('[data-testid="playersarenotified-item"]')
    const initialCount = initialItems.length
    
    const dismissButtons = document.querySelectorAll('[data-testid="playersarenotified-dismiss"]')
    if (dismissButtons.length > 0) {
      fireEvent.click(dismissButtons[0])
      const updatedItems = document.querySelectorAll('[data-testid="playersarenotified-item"]')
      expect(updatedItems.length).toBe(initialCount - 1)
    }
  })

  it('marks all notifications as read when mark all read button is clicked', () => {
    render(<PlayersAreNotified />)
    const markAllReadBtn = screen.getByTestId('playersarenotified-mark-all-read')
    
    fireEvent.click(markAllReadBtn)
    
    const markReadButtons = document.querySelectorAll('[data-testid="playersarenotified-mark-read"]')
    expect(markReadButtons.length).toBe(0)
  })

  it('displays unread count', () => {
    render(<PlayersAreNotified />)
    expect(screen.getByText(/unread notification/i)).toBeTruthy()
  })
})
