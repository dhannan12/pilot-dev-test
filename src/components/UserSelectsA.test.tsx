import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserSelectsA from './UserSelectsA'

describe('UserSelectsA', () => {
  it('renders without crashing', () => {
    render(<UserSelectsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<UserSelectsA />)
    expect(screen.getByText('Choose Your Membership')).toBeTruthy()
    expect(screen.getByText(/Select the membership plan that best fits/i)).toBeTruthy()
  })

  it('displays all 5 membership types', () => {
    render(<UserSelectsA />)
    expect(screen.getByText('Basic Membership')).toBeTruthy()
    expect(screen.getByText('Premium Membership')).toBeTruthy()
    expect(screen.getByText('Elite Membership')).toBeTruthy()
    expect(screen.getByText('Student Membership')).toBeTruthy()
    expect(screen.getByText('Annual Premium')).toBeTruthy()
  })

  it('displays pricing information for each plan', () => {
    render(<UserSelectsA />)
    expect(screen.getByText('$29.99')).toBeTruthy()
    expect(screen.getByText('$49.99')).toBeTruthy()
    expect(screen.getByText('$79.99')).toBeTruthy()
    expect(screen.getByText('$19.99')).toBeTruthy()
    expect(screen.getByText('$499.99')).toBeTruthy()
  })

  it('allows user to select a membership type', () => {
    render(<UserSelectsA />)
    const radioButton = screen.getByTestId('userselectsa-radio-premium')
    fireEvent.click(radioButton)
    expect(radioButton).toHaveProperty('checked', true)
  })

  it('enables continue button when a membership is selected', () => {
    render(<UserSelectsA />)
    const continueButton = screen.getByTestId('userselectsa-continue')
    expect(continueButton).toHaveProperty('disabled', true)
    
    const selectButton = screen.getByTestId('userselectsa-select-basic')
    fireEvent.click(selectButton)
    
    expect(continueButton).toHaveProperty('disabled', false)
  })

  it('shows confirmation screen after clicking continue', () => {
    render(<UserSelectsA />)
    const selectButton = screen.getByTestId('userselectsa-select-elite')
    fireEvent.click(selectButton)
    
    const continueButton = screen.getByTestId('userselectsa-continue')
    fireEvent.click(continueButton)
    
    expect(screen.getByText('Confirm Your Selection')).toBeTruthy()
    expect(screen.getByText('Elite Membership')).toBeTruthy()
  })

  it('allows user to go back from confirmation screen', () => {
    render(<UserSelectsA />)
    const selectButton = screen.getByTestId('userselectsa-select-premium')
    fireEvent.click(selectButton)
    
    const continueButton = screen.getByTestId('userselectsa-continue')
    fireEvent.click(continueButton)
    
    const backButton = screen.getByTestId('userselectsa-back')
    fireEvent.click(backButton)
    
    expect(screen.getByText('Choose Your Membership')).toBeTruthy()
  })

  it('shows alert when confirming membership selection', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UserSelectsA />)
    const selectButton = screen.getByTestId('userselectsa-select-student')
    fireEvent.click(selectButton)
    
    const continueButton = screen.getByTestId('userselectsa-continue')
    fireEvent.click(continueButton)
    
    const confirmButton = screen.getByTestId('userselectsa-confirm')
    fireEvent.click(confirmButton)
    
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Membership student confirmed'))
    alertMock.mockRestore()
  })

  it('has required data-testid attributes', () => {
    render(<UserSelectsA />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userselectsa"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userselectsa-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="userselectsa-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
    // Continue button
    expect(document.querySelector('[data-testid="userselectsa-continue"]')).toBeTruthy()
    // Radio buttons for each membership
    expect(document.querySelector('[data-testid="userselectsa-radio-basic"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userselectsa-radio-premium"]')).toBeTruthy()
    // Select buttons for each membership
    expect(document.querySelector('[data-testid="userselectsa-select-basic"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userselectsa-select-premium"]')).toBeTruthy()
  })

  it('displays badges for popular and recommended plans', () => {
    render(<UserSelectsA />)
    expect(screen.getByText('Most Popular')).toBeTruthy()
    expect(screen.getByText('Recommended')).toBeTruthy()
  })

  it('highlights selected membership card', () => {
    render(<UserSelectsA />)
    const selectButton = screen.getByTestId('userselectsa-select-basic')
    fireEvent.click(selectButton)
    
    expect(screen.getByText('Selected')).toBeTruthy()
  })
})
