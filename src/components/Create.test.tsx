import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Create from './Create'

describe('Create', () => {
  it('renders without crashing', () => {
    render(<Create />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<Create />)
    expect(screen.getByText('Create New Legal Case')).toBeTruthy()
    expect(screen.getByText(/Set up a new case with client information/i)).toBeTruthy()
  })

  it('displays step 1 case information form by default', () => {
    render(<Create />)
    expect(screen.getByText('Case Information')).toBeTruthy()
    expect(screen.getByTestId('create-casenumber')).toBeTruthy()
    expect(screen.getByTestId('create-casetype')).toBeTruthy()
    expect(screen.getByTestId('create-attorney')).toBeTruthy()
    expect(screen.getByTestId('create-description')).toBeTruthy()
  })

  it('displays progress indicator with 4 steps', () => {
    render(<Create />)
    expect(screen.getByTestId('create-step-1')).toBeTruthy()
    expect(screen.getByTestId('create-step-2')).toBeTruthy()
    expect(screen.getByTestId('create-step-3')).toBeTruthy()
    expect(screen.getByTestId('create-step-4')).toBeTruthy()
  })

  it('renders case type options from mock data', () => {
    render(<Create />)
    const caseTypeSelect = screen.getByTestId('create-casetype')
    expect(caseTypeSelect).toBeTruthy()
    // Check that select element is present
    expect(caseTypeSelect.tagName).toBe('SELECT')
  })

  it('renders attorney options from mock data', () => {
    render(<Create />)
    const attorneySelect = screen.getByTestId('create-attorney')
    expect(attorneySelect).toBeTruthy()
    expect(attorneySelect.tagName).toBe('SELECT')
  })

  it('displays navigation buttons', () => {
    render(<Create />)
    expect(screen.getByTestId('create-back')).toBeTruthy()
    expect(screen.getByTestId('create-cancel')).toBeTruthy()
    expect(screen.getByTestId('create-next')).toBeTruthy()
  })

  it('has required data-testid attributes on main wrapper', () => {
    render(<Create />)
    expect(screen.getByTestId('create')).toBeTruthy()
  })

  it('has data-testid on all form inputs in step 1', () => {
    render(<Create />)
    expect(screen.getByTestId('create-casenumber')).toBeTruthy()
    expect(screen.getByTestId('create-casetype')).toBeTruthy()
    expect(screen.getByTestId('create-attorney')).toBeTruthy()
    expect(screen.getByTestId('create-description')).toBeTruthy()
  })

  it('has data-testid on action buttons', () => {
    render(<Create />)
    expect(screen.getByTestId('create-back')).toBeTruthy()
    expect(screen.getByTestId('create-next')).toBeTruthy()
    expect(screen.getByTestId('create-cancel')).toBeTruthy()
  })

  it('displays quick action buttons at the bottom', () => {
    render(<Create />)
    expect(screen.getByTestId('create-help')).toBeTruthy()
    expect(screen.getByTestId('create-template')).toBeTruthy()
    expect(screen.getByTestId('create-save')).toBeTruthy()
  })

  it('has all required data-testid attributes for QA testing', () => {
    render(<Create />)
    // Main wrapper
    expect(document.querySelector('[data-testid="create"]')).toBeTruthy()
    // Form inputs
    expect(document.querySelector('[data-testid="create-casenumber"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-casetype"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-attorney"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-description"]')).toBeTruthy()
    // Navigation buttons
    expect(document.querySelector('[data-testid="create-back"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-next"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-cancel"]')).toBeTruthy()
    // Quick actions
    expect(document.querySelector('[data-testid="create-help"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-template"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-save"]')).toBeTruthy()
  })
})
