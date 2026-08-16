import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StudentInformsParent from './StudentInformsParent'

describe('StudentInformsParent', () => {
  it('renders without crashing', () => {
    render(<StudentInformsParent />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<StudentInformsParent />)
    expect(screen.getByText(/Notify Parent About Absence/i)).toBeTruthy()
    expect(screen.getByText(/Select an absence and choose which parent/i)).toBeTruthy()
  })

  it('displays mock absences in the select dropdown', () => {
    render(<StudentInformsParent />)
    const absenceSelect = screen.getByTestId('studentinformsparent-absence') as HTMLSelectElement
    expect(absenceSelect).toBeTruthy()
    // Check for at least one mock absence option (beyond the default option)
    expect(absenceSelect.options.length).toBeGreaterThan(1)
  })

  it('displays mock parents in the select dropdown', () => {
    render(<StudentInformsParent />)
    const parentSelect = screen.getByTestId('studentinformsparent-parent') as HTMLSelectElement
    expect(parentSelect).toBeTruthy()
    // Check for at least one mock parent option (beyond the default option)
    expect(parentSelect.options.length).toBeGreaterThan(1)
  })

  it('displays preview when both absence and parent are selected', () => {
    render(<StudentInformsParent />)
    
    const absenceSelect = screen.getByTestId('studentinformsparent-absence') as HTMLSelectElement
    const parentSelect = screen.getByTestId('studentinformsparent-parent') as HTMLSelectElement

    // Select first absence
    fireEvent.change(absenceSelect, { target: { value: 'abs-1' } })
    // Select first parent
    fireEvent.change(parentSelect, { target: { value: 'p-1' } })

    // Check for preview section
    expect(screen.getByText(/Notification Preview/i)).toBeTruthy()
  })

  it('allows user to type in message textarea', () => {
    render(<StudentInformsParent />)
    const messageTextarea = screen.getByTestId('studentinformsparent-message') as HTMLTextAreaElement
    
    fireEvent.change(messageTextarea, { target: { value: 'This is a test message' } })
    expect(messageTextarea.value).toBe('This is a test message')
  })

  it('enables send button when both selections are made', () => {
    render(<StudentInformsParent />)
    
    const sendButton = screen.getByTestId('studentinformsparent-send') as HTMLButtonElement
    
    // Initially disabled
    expect(sendButton.disabled).toBe(true)
    
    const absenceSelect = screen.getByTestId('studentinformsparent-absence') as HTMLSelectElement
    const parentSelect = screen.getByTestId('studentinformsparent-parent') as HTMLSelectElement

    // Make selections
    fireEvent.change(absenceSelect, { target: { value: 'abs-1' } })
    fireEvent.change(parentSelect, { target: { value: 'p-1' } })

    // Should now be enabled
    expect(sendButton.disabled).toBe(false)
  })

  it('clears form when clear button is clicked', () => {
    render(<StudentInformsParent />)
    
    const absenceSelect = screen.getByTestId('studentinformsparent-absence') as HTMLSelectElement
    const parentSelect = screen.getByTestId('studentinformsparent-parent') as HTMLSelectElement
    const messageTextarea = screen.getByTestId('studentinformsparent-message') as HTMLTextAreaElement
    const clearButton = screen.getByTestId('studentinformsparent-clear')

    // Fill form
    fireEvent.change(absenceSelect, { target: { value: 'abs-1' } })
    fireEvent.change(parentSelect, { target: { value: 'p-1' } })
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } })

    // Clear form
    fireEvent.click(clearButton)

    // Check all fields are cleared
    expect(absenceSelect.value).toBe('')
    expect(parentSelect.value).toBe('')
    expect(messageTextarea.value).toBe('')
  })

  it('has required data-testid attributes', () => {
    render(<StudentInformsParent />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('studentinformsparent')).toBeTruthy()
    expect(screen.getByTestId('studentinformsparent-absence')).toBeTruthy()
    expect(screen.getByTestId('studentinformsparent-parent')).toBeTruthy()
    expect(screen.getByTestId('studentinformsparent-message')).toBeTruthy()
    expect(screen.getByTestId('studentinformsparent-send')).toBeTruthy()
    expect(screen.getByTestId('studentinformsparent-clear')).toBeTruthy()
  })
})
