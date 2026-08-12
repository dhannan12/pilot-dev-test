import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DocumentViewer from './DocumentViewer'

describe('DocumentViewer', () => {
  it('renders without crashing', () => {
    render(<DocumentViewer />)
    expect(document.body).toBeTruthy()
  })

  it('displays the document viewer title', () => {
    render(<DocumentViewer />)
    expect(screen.getByText('Document Viewer')).toBeTruthy()
    expect(screen.getByText('View and manage your PDF and Word documents')).toBeTruthy()
  })

  it('displays mock documents in the sidebar', () => {
    render(<DocumentViewer />)
    // Check for document names - some may appear multiple times
    const employmentDocs = screen.getAllByText('Employment_Contract_2024.pdf')
    expect(employmentDocs.length).toBeGreaterThan(0)
    expect(screen.getByText('Lease_Agreement_MainStreet.docx')).toBeTruthy()
    expect(screen.getByText('Merger_Agreement_Final.pdf')).toBeTruthy()
    expect(screen.getByText('NDA_Template.doc')).toBeTruthy()
    expect(screen.getByText('Software_License_Agreement.pdf')).toBeTruthy()
  })

  it('displays zoom controls with current zoom level', () => {
    render(<DocumentViewer />)
    expect(screen.getByText('100%')).toBeTruthy()
  })

  it('increments zoom level when zoom in is clicked', () => {
    render(<DocumentViewer />)
    const zoomInButton = screen.getByText('+')
    fireEvent.click(zoomInButton)
    expect(screen.getByText('125%')).toBeTruthy()
  })

  it('decrements zoom level when zoom out is clicked', () => {
    render(<DocumentViewer />)
    const zoomInButton = screen.getByText('+')
    const zoomOutButton = screen.getByText('−')
    
    // Zoom in first, then zoom out
    fireEvent.click(zoomInButton)
    expect(screen.getByText('125%')).toBeTruthy()
    fireEvent.click(zoomOutButton)
    expect(screen.getByText('100%')).toBeTruthy()
  })

  it('displays page navigation controls', () => {
    render(<DocumentViewer />)
    expect(screen.getByText('Previous')).toBeTruthy()
    expect(screen.getByText('Next')).toBeTruthy()
    const pageIndicators = screen.getAllByText(/Page 1 of/)
    expect(pageIndicators.length).toBeGreaterThan(0)
  })

  it('navigates to next page when next button is clicked', () => {
    render(<DocumentViewer />)
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    const page2Indicators = screen.getAllByText(/Page 2 of/)
    expect(page2Indicators.length).toBeGreaterThan(0)
  })

  it('navigates to previous page when previous button is clicked', () => {
    render(<DocumentViewer />)
    const nextButton = screen.getByText('Next')
    const prevButton = screen.getByText('Previous')
    
    // Go to page 2 first
    fireEvent.click(nextButton)
    const page2Indicators = screen.getAllByText(/Page 2 of/)
    expect(page2Indicators.length).toBeGreaterThan(0)
    
    // Then go back to page 1
    fireEvent.click(prevButton)
    const page1Indicators = screen.getAllByText(/Page 1 of/)
    expect(page1Indicators.length).toBeGreaterThan(0)
  })

  it('displays download button', () => {
    render(<DocumentViewer />)
    expect(screen.getByText('Download')).toBeTruthy()
  })

  it('switches documents when a different document is clicked', () => {
    render(<DocumentViewer />)
    
    // Initially shows first document
    expect(screen.getByText(/EMPLOYMENT AGREEMENT/)).toBeTruthy()
    
    // Click on second document
    const leaseDoc = screen.getByText('Lease_Agreement_MainStreet.docx')
    fireEvent.click(leaseDoc)
    
    // Should now show second document content
    expect(screen.getByText(/COMMERCIAL LEASE AGREEMENT/)).toBeTruthy()
  })

  it('resets to page 1 when switching documents', () => {
    render(<DocumentViewer />)
    
    // Navigate to page 2 of first document
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    const page2Indicators = screen.getAllByText(/Page 2 of/)
    expect(page2Indicators.length).toBeGreaterThan(0)
    
    // Switch to another document
    const leaseDoc = screen.getByText('Lease_Agreement_MainStreet.docx')
    fireEvent.click(leaseDoc)
    
    // Should be on page 1
    const page1Indicators = screen.getAllByText(/Page 1 of/)
    expect(page1Indicators.length).toBeGreaterThan(0)
  })

  it('displays file type badges for documents', () => {
    render(<DocumentViewer />)
    const pdfBadges = screen.getAllByText('PDF')
    const docxBadges = screen.getAllByText('DOCX')
    const docBadges = screen.getAllByText('DOC')
    
    expect(pdfBadges.length).toBeGreaterThan(0)
    expect(docxBadges.length).toBeGreaterThan(0)
    expect(docBadges.length).toBeGreaterThan(0)
  })

  it('displays document metadata', () => {
    render(<DocumentViewer />)
    // Check for size and date information
    expect(screen.getByText('2.4 MB')).toBeTruthy()
    const dateElements = screen.getAllByText(/2024-01-15/)
    expect(dateElements.length).toBeGreaterThan(0)
  })
})
