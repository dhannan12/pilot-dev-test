import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsA from './UserSubmitsA'

describe('UserSubmitsA', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the form with all required fields', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Submit Absence Report')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-student')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-date')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-starttime')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-endtime')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-reason')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-notes')).toBeTruthy()
  })

  it('displays mock submission history', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText('Submission History')).toBeTruthy()
    // Students appear both in dropdown and in history, so we check for multiple occurrences
    expect(screen.getAllByText('Emma Johnson').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Liam Smith').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Olivia Williams').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Noah Brown').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Ava Davis').length).toBeGreaterThanOrEqual(1)
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsA />)
    
    // Main wrapper
    expect(screen.getByTestId('usersubmitsa')).toBeTruthy()
    
    // Form fields
    expect(screen.getByTestId('usersubmitsa-student')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-date')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-starttime')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-endtime')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-reason')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-notes')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('usersubmitsa-submit')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-reset')).toBeTruthy()
    
    // List
    expect(screen.getByTestId('usersubmitsa-list')).toBeTruthy()
    const items = screen.getAllByTestId('usersubmitsa-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('can fill out and submit the form', () => {
    render(<UserSubmitsA />)
    
    const studentSelect = screen.getByTestId('usersubmitsa-student') as HTMLSelectElement
    const dateInput = screen.getByTestId('usersubmitsa-date') as HTMLInputElement
    const startTimeInput = screen.getByTestId('usersubmitsa-starttime') as HTMLInputElement
    const endTimeInput = screen.getByTestId('usersubmitsa-endtime') as HTMLInputElement
    const reasonSelect = screen.getByTestId('usersubmitsa-reason') as HTMLSelectElement
    const notesTextarea = screen.getByTestId('usersubmitsa-notes') as HTMLTextAreaElement
    const submitButton = screen.getByTestId('usersubmitsa-submit')
    
    // Fill out form
    fireEvent.change(studentSelect, { target: { value: 's1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    fireEvent.change(startTimeInput, { target: { value: '09:00' } })
    fireEvent.change(endTimeInput, { target: { value: '15:00' } })
    fireEvent.change(reasonSelect, { target: { value: 'Illness' } })
    fireEvent.change(notesTextarea, { target: { value: 'Test absence notes' } })
    
    // Submit form
    fireEvent.click(submitButton)
    
    // Verify success message appears
    expect(screen.getByTestId('usersubmitsa-success')).toBeTruthy()
  })

  it('can reset the form', () => {
    render(<UserSubmitsA />)
    
    const studentSelect = screen.getByTestId('usersubmitsa-student') as HTMLSelectElement
    const notesTextarea = screen.getByTestId('usersubmitsa-notes') as HTMLTextAreaElement
    const resetButton = screen.getByTestId('usersubmitsa-reset')
    
    // Fill out form
    fireEvent.change(studentSelect, { target: { value: 's1' } })
    fireEvent.change(notesTextarea, { target: { value: 'Test notes' } })
    
    // Reset form
    fireEvent.click(resetButton)
    
    // Verify form is cleared
    expect(studentSelect.value).toBe('')
    expect(notesTextarea.value).toBe('')
  })
})
