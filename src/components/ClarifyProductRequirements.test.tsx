import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClarifyProductRequirements from './ClarifyProductRequirements'

describe('ClarifyProductRequirements', () => {
  it('renders without crashing', () => {
    render(<ClarifyProductRequirements />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getByText('Product Requirements Clarification')).toBeTruthy()
  })

  it('displays mock requirement data', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getByText('User authentication flow')).toBeTruthy()
    expect(screen.getByText('Data retention policy')).toBeTruthy()
    expect(screen.getByText('Mobile responsiveness scope')).toBeTruthy()
  })

  it('shows status filter buttons', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getAllByText(/All Requirements/)[0]).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('In Review')).toBeTruthy()
    expect(screen.getByText('Clarified')).toBeTruthy()
    expect(screen.getByText('Blocked')).toBeTruthy()
  })

  it('displays stakeholder information', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getByText(/Sarah Chen/)).toBeTruthy()
    expect(screen.getByText(/Michael Torres/)).toBeTruthy()
  })

  it('shows progress bar', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getByText('Overall Progress')).toBeTruthy()
    expect(screen.getByText(/of.*clarified/)).toBeTruthy()
  })

  it('displays requirement IDs', () => {
    render(<ClarifyProductRequirements />)
    expect(screen.getByText('REQ-001')).toBeTruthy()
    expect(screen.getByText('REQ-002')).toBeTruthy()
  })
})
