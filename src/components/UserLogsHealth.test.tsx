import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserLogsHealth from './UserLogsHealth'

describe('UserLogsHealth', () => {
  it('renders without crashing', () => {
    render(<UserLogsHealth />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock health data', () => {
    render(<UserLogsHealth />)
    expect(screen.getByText('Health Metrics Log')).toBeTruthy()
    expect(screen.getByText('Health History')).toBeTruthy()
    // Check for some mock data content
    expect(screen.getByText(/Feeling energetic after morning workout/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserLogsHealth />)
    // verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="userlogshealth"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshealth-add"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshealth-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userlogshealth-item"]')).toBeTruthy()
  })

  it('displays all required form fields when add button is clicked', () => {
    render(<UserLogsHealth />)
    const addButton = screen.getByTestId('userlogshealth-add')
    fireEvent.click(addButton)
    
    // Check that form fields appear
    expect(screen.getByTestId('userlogshealth-date')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-weight')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-systolic')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-diastolic')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-heartrate')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-mood')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-notes')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-submit')).toBeTruthy()
    expect(screen.getByTestId('userlogshealth-cancel')).toBeTruthy()
  })

  it('renders multiple health log items', () => {
    render(<UserLogsHealth />)
    const items = document.querySelectorAll('[data-testid="userlogshealth-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
