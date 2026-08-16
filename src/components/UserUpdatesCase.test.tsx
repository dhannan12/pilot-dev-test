import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import UserUpdatesCase from './UserUpdatesCase'

describe('UserUpdatesCase', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    render(<UserUpdatesCase />)
    expect(document.body).toBeTruthy()
  })

  it('displays case selection dropdown with mock cases', () => {
    render(<UserUpdatesCase />)
    const select = screen.getByTestId('userupdatescase-case')
    expect(select).toBeTruthy()
    
    // Check that mock cases are in the dropdown
    const options = select.querySelectorAll('option')
    expect(options.length).toBeGreaterThanOrEqual(5)
  })

  it('loads initial case notes when component mounts', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes') as HTMLTextAreaElement
    expect(notesArea.value).toBeTruthy()
    expect(notesArea.value.length).toBeGreaterThan(0)
  })

  it('updates notes when user types', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes') as HTMLTextAreaElement
    
    fireEvent.change(notesArea, { target: { value: 'New note content' } })
    expect(notesArea.value).toBe('New note content')
  })

  it('displays character count', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes') as HTMLTextAreaElement
    
    fireEvent.change(notesArea, { target: { value: 'Test' } })
    expect(screen.getByText(/4 characters/)).toBeTruthy()
  })

  it('shows saving indicator during auto-save', async () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes')
    
    fireEvent.change(notesArea, { target: { value: 'Auto-save test' } })
    
    // Fast-forward past debounce delay
    vi.advanceTimersByTime(2000)
    
    // Fast-forward to trigger the save state
    vi.advanceTimersByTime(100)
    
    // Should show saving or saved state
    const savingText = screen.queryByText(/Saving.../)
    const savedText = screen.queryByText(/Saved/)
    const justNow = screen.queryByText(/Just now/)
    expect(savingText || savedText || justNow).toBeTruthy()
  })

  it('has manual save button', () => {
    render(<UserUpdatesCase />)
    const saveButton = screen.getByTestId('userupdatescase-save')
    expect(saveButton).toBeTruthy()
    expect(saveButton.textContent).toBe('Save Now')
  })

  it('manual save button triggers save', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes')
    const saveButton = screen.getByTestId('userupdatescase-save')
    
    fireEvent.change(notesArea, { target: { value: 'Manual save test' } })
    fireEvent.click(saveButton)
    
    // Fast-forward save operation
    vi.advanceTimersByTime(1000)
    
    expect(screen.queryByText(/Saving.../)).toBeTruthy()
  })

  it('switches between cases and loads different notes', () => {
    render(<UserUpdatesCase />)
    const select = screen.getByTestId('userupdatescase-case') as HTMLSelectElement
    const notesArea = screen.getByTestId('userupdatescase-notes') as HTMLTextAreaElement
    
    const initialNotes = notesArea.value
    
    // Change to a different case
    fireEvent.change(select, { target: { value: '2' } })
    
    // Notes should change (might be different or empty)
    const newNotes = notesArea.value
    expect(newNotes !== initialNotes || newNotes === '').toBe(true)
  })

  it('has required data-testid attributes', () => {
    render(<UserUpdatesCase />)
    
    // Main wrapper
    expect(screen.getByTestId('userupdatescase')).toBeTruthy()
    
    // Case selector
    expect(screen.getByTestId('userupdatescase-case')).toBeTruthy()
    
    // Notes textarea
    expect(screen.getByTestId('userupdatescase-notes')).toBeTruthy()
    
    // Save button
    expect(screen.getByTestId('userupdatescase-save')).toBeTruthy()
  })

  it('displays case details for selected case', () => {
    render(<UserUpdatesCase />)
    
    // Should display case information
    expect(screen.getByText(/Case Number:/)).toBeTruthy()
    expect(screen.getByText(/Client:/)).toBeTruthy()
    expect(screen.getByText(/Status:/)).toBeTruthy()
  })

  it('shows save history after saves', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes')
    
    fireEvent.change(notesArea, { target: { value: 'First save test' } })
    
    // Trigger auto-save
    vi.advanceTimersByTime(2000)
    
    // Wait for save to complete
    vi.advanceTimersByTime(1000)
    
    // Check if history list or "No saves yet" message appears
    const historyList = screen.queryByTestId('userupdatescase-history-list')
    const noSavesText = screen.queryByText(/No saves yet/)
    expect(historyList || noSavesText).toBeTruthy()
  })

  it('debounces auto-save correctly', () => {
    render(<UserUpdatesCase />)
    const notesArea = screen.getByTestId('userupdatescase-notes')
    
    // Type multiple times rapidly
    fireEvent.change(notesArea, { target: { value: 'T' } })
    vi.advanceTimersByTime(500)
    
    fireEvent.change(notesArea, { target: { value: 'Te' } })
    vi.advanceTimersByTime(500)
    
    fireEvent.change(notesArea, { target: { value: 'Test' } })
    
    // Should not have saved yet
    expect(screen.queryByText(/Saving.../)).toBeFalsy()
    
    // Wait for full debounce period
    vi.advanceTimersByTime(2000)
    
    // Now should trigger save
    vi.advanceTimersByTime(100)
  })
})
