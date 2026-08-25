import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ARefereeCommunicates from './ARefereeCommunicates'

describe('ARefereeCommunicates', () => {
  it('renders without crashing', () => {
    render(<ARefereeCommunicates />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title and description', () => {
    render(<ARefereeCommunicates />)
    expect(screen.getByText('Referee Communication')).toBeTruthy()
    expect(screen.getByText(/Send messages and instructions to players/i)).toBeTruthy()
  })

  it('displays mock communication data', () => {
    render(<ARefereeCommunicates />)
    expect(screen.getByText('Zhang Wei')).toBeTruthy()
    expect(screen.getByText('Li Ming')).toBeTruthy()
    expect(screen.getByText(/Service toss height violation/i)).toBeTruthy()
  })

  it('renders the communication form with all fields', () => {
    render(<ARefereeCommunicates />)
    expect(screen.getAllByText('Send Message').length).toBeGreaterThan(0)
    expect(screen.getByLabelText(/Select Player/i)).toBeTruthy()
    expect(screen.getByLabelText(/Priority Level/i)).toBeTruthy()
    expect(screen.getByLabelText('Message')).toBeTruthy()
  })

  it('displays communication history', () => {
    render(<ARefereeCommunicates />)
    expect(screen.getByText('Communication History')).toBeTruthy()
  })

  it('displays communication statistics', () => {
    render(<ARefereeCommunicates />)
    expect(screen.getByText('Communication Stats')).toBeTruthy()
    expect(screen.getByText('Total Messages')).toBeTruthy()
    expect(screen.getAllByText('Urgent').length).toBeGreaterThan(0)
    expect(screen.getByText('Warnings')).toBeTruthy()
    expect(screen.getByText('Acknowledged')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ARefereeCommunicates />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="arefereecommunicates"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="arefereecommunicates-player"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="arefereecommunicates-priority"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="arefereecommunicates-message"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="arefereecommunicates-submit"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="arefereecommunicates-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelectorAll('[data-testid="arefereecommunicates-item"]').length).toBeGreaterThan(0)
  })
})
