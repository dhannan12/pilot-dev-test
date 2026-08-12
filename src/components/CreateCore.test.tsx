import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateCore from './CreateCore'

describe('CreateCore', () => {
  it('renders without crashing', () => {
    render(<CreateCore />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<CreateCore />)
    expect(screen.getByText('Core Document & Version Tables')).toBeTruthy()
    expect(screen.getByText(/Database schema management for the LegalReview Document Management System/i)).toBeTruthy()
  })

  it('displays both database tables', () => {
    render(<CreateCore />)
    const documentsElements = screen.getAllByText('documents')
    expect(documentsElements.length).toBeGreaterThan(0)
    expect(screen.getByText('document_versions')).toBeTruthy()
  })

  it('displays column information for the selected table', () => {
    render(<CreateCore />)
    // Documents table should be selected by default
    expect(screen.getByText('id')).toBeTruthy()
    expect(screen.getByText('title')).toBeTruthy()
    expect(screen.getByText('document_type')).toBeTruthy()
  })

  it('switches between tables when clicked', () => {
    render(<CreateCore />)
    
    // Click on document_versions table
    const versionTableButton = screen.getByText('document_versions')
    fireEvent.click(versionTableButton)
    
    // Should display version-specific columns
    expect(screen.getByText('version_number')).toBeTruthy()
  })

  it('displays version statistics', () => {
    render(<CreateCore />)
    expect(screen.getByText('Version Stats')).toBeTruthy()
    expect(screen.getByText('Total Versions')).toBeTruthy()
    expect(screen.getByText('Published')).toBeTruthy()
    expect(screen.getByText('Draft')).toBeTruthy()
  })

  it('toggles SQL preview when button is clicked', () => {
    render(<CreateCore />)
    
    const sqlButton = screen.getByText('Show SQL')
    fireEvent.click(sqlButton)
    
    expect(screen.getByText('Hide SQL')).toBeTruthy()
    expect(screen.getByText(/CREATE TABLE documents/)).toBeTruthy()
  })

  it('displays sample version records for document_versions table', () => {
    render(<CreateCore />)
    
    // Click on document_versions table
    const versionTableButton = screen.getByText('document_versions')
    fireEvent.click(versionTableButton)
    
    // Should show sample version records section
    expect(screen.getByText('Sample Version Records')).toBeTruthy()
    // Multiple versions should be displayed
    const versionElements = screen.getAllByText(/Version \d+/)
    expect(versionElements.length).toBeGreaterThan(0)
    // Check for status badges which indicate version records are rendered
    const statusElements = screen.getAllByText(/PUBLISHED|DRAFT/)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('displays constraint badges for columns', () => {
    render(<CreateCore />)
    
    // Should show PRIMARY KEY and NOT NULL badges
    expect(screen.getByText('PRIMARY KEY')).toBeTruthy()
    expect(screen.getAllByText('NOT NULL').length).toBeGreaterThan(0)
  })

  it('displays foreign key relationships', () => {
    render(<CreateCore />)
    
    // Should show foreign key references
    expect(screen.getByText('users.id')).toBeTruthy()
  })
})
