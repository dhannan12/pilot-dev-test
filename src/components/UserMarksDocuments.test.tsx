import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserMarksDocuments from './UserMarksDocuments'

describe('UserMarksDocuments', () => {
  it('renders without crashing', () => {
    render(<UserMarksDocuments />)
    expect(document.body).toBeTruthy()
  })

  it('displays the document checklist header', () => {
    render(<UserMarksDocuments />)
    expect(screen.getByText('Document Checklist')).toBeTruthy()
    expect(screen.getByText('Track and manage required case documents')).toBeTruthy()
  })

  it('displays mock documents', () => {
    render(<UserMarksDocuments />)
    expect(screen.getByText('Client Intake Form')).toBeTruthy()
    expect(screen.getByText('Retainer Agreement')).toBeTruthy()
    expect(screen.getByText('Police Report')).toBeTruthy()
    expect(screen.getByText('Medical Records')).toBeTruthy()
    expect(screen.getByText('Witness Statements')).toBeTruthy()
  })

  it('shows progress indicator with correct stats', () => {
    render(<UserMarksDocuments />)
    expect(screen.getByText(/Overall Progress:/)).toBeTruthy()
    expect(screen.getByText(/Required:/)).toBeTruthy()
  })

  it('has filter buttons for all, marked, and unmarked', () => {
    render(<UserMarksDocuments />)
    expect(screen.getByTestId('usermarksdocuments-filter-all')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-filter-marked')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-filter-unmarked')).toBeTruthy()
  })

  it('can toggle document marked status', () => {
    render(<UserMarksDocuments />)
    const checkbox = screen.getByTestId('usermarksdocuments-checkbox-doc-3') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
    
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
    
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it('filters documents by marked status', () => {
    render(<UserMarksDocuments />)
    
    // Click marked filter
    const markedButton = screen.getByTestId('usermarksdocuments-filter-marked')
    fireEvent.click(markedButton)
    
    // Should show only marked documents
    expect(screen.getByText('Client Intake Form')).toBeTruthy()
    expect(screen.getByText('Retainer Agreement')).toBeTruthy()
  })

  it('filters documents by unmarked status', () => {
    render(<UserMarksDocuments />)
    
    // Click unmarked filter
    const unmarkedButton = screen.getByTestId('usermarksdocuments-filter-unmarked')
    fireEvent.click(unmarkedButton)
    
    // Should show unmarked documents
    expect(screen.getByText('Police Report')).toBeTruthy()
    expect(screen.getByText('Medical Records')).toBeTruthy()
  })

  it('shows add note button for marked documents', () => {
    render(<UserMarksDocuments />)
    // doc-1 is marked in mock data
    expect(screen.getByTestId('usermarksdocuments-add-note-doc-1')).toBeTruthy()
  })

  it('opens note dialog when add note is clicked', () => {
    render(<UserMarksDocuments />)
    const addNoteButton = screen.getByTestId('usermarksdocuments-add-note-doc-1')
    fireEvent.click(addNoteButton)
    
    expect(screen.getByTestId('usermarksdocuments-modal')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-note')).toBeTruthy()
    expect(screen.getByText('Add Document Note')).toBeTruthy()
  })

  it('can add and save notes to documents', () => {
    render(<UserMarksDocuments />)
    const addNoteButton = screen.getByTestId('usermarksdocuments-add-note-doc-2')
    fireEvent.click(addNoteButton)
    
    const noteTextarea = screen.getByTestId('usermarksdocuments-note') as HTMLTextAreaElement
    fireEvent.change(noteTextarea, { target: { value: 'Test note content' } })
    expect(noteTextarea.value).toBe('Test note content')
    
    const saveButton = screen.getByTestId('usermarksdocuments-save-note')
    fireEvent.click(saveButton)
    
    // Modal should close
    expect(screen.queryByTestId('usermarksdocuments-modal')).toBeFalsy()
  })

  it('can cancel note dialog', () => {
    render(<UserMarksDocuments />)
    const addNoteButton = screen.getByTestId('usermarksdocuments-add-note-doc-1')
    fireEvent.click(addNoteButton)
    
    expect(screen.getByTestId('usermarksdocuments-modal')).toBeTruthy()
    
    const cancelButton = screen.getByTestId('usermarksdocuments-cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByTestId('usermarksdocuments-modal')).toBeFalsy()
  })

  it('displays required badges for required documents', () => {
    render(<UserMarksDocuments />)
    const requiredBadges = screen.getAllByText('Required')
    expect(requiredBadges.length).toBeGreaterThan(0)
  })

  it('displays category badges', () => {
    render(<UserMarksDocuments />)
    expect(screen.getByText('Intake')).toBeTruthy()
    expect(screen.getByText('Contracts')).toBeTruthy()
    expect(screen.getAllByText('Evidence').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserMarksDocuments />)
    // Main wrapper
    expect(screen.getByTestId('usermarksdocuments')).toBeTruthy()
    
    // Filter buttons
    expect(screen.getByTestId('usermarksdocuments-filter-all')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-filter-marked')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-filter-unmarked')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('usermarksdocuments-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('usermarksdocuments-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Checkboxes
    expect(screen.getByTestId('usermarksdocuments-checkbox-doc-1')).toBeTruthy()
    expect(screen.getByTestId('usermarksdocuments-checkbox-doc-2')).toBeTruthy()
  })
})
