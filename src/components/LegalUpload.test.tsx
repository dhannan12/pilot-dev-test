import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LegalUpload from './LegalUpload'

describe('LegalUpload', () => {
  it('renders without crashing', () => {
    render(<LegalUpload />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<LegalUpload />)
    const title = screen.getByText('Legal Document Management')
    expect(title).toBeTruthy()
  })

  it('displays mock documents', () => {
    render(<LegalUpload />)
    expect(screen.getByText('Non-Disclosure Agreement.pdf')).toBeTruthy()
    expect(screen.getByText('Employment Contract Template.pdf')).toBeTruthy()
    expect(screen.getByText('Privacy Policy 2026.pdf')).toBeTruthy()
  })

  it('shows upload section', () => {
    render(<LegalUpload />)
    expect(screen.getByText('Upload New Document')).toBeTruthy()
    expect(screen.getByText('Upload')).toBeTruthy()
  })

  it('filters documents by search term', () => {
    render(<LegalUpload />)
    const searchInput = screen.getByPlaceholderText('Search by name or uploader...')
    
    fireEvent.change(searchInput, { target: { value: 'Privacy' } })
    
    expect(screen.getByText('Privacy Policy 2026.pdf')).toBeTruthy()
    expect(screen.queryByText('Non-Disclosure Agreement.pdf')).toBeNull()
  })

  it('filters documents by category', () => {
    render(<LegalUpload />)
    const categorySelect = screen.getByLabelText('Filter by Category')
    
    fireEvent.change(categorySelect, { target: { value: 'Compliance' } })
    
    expect(screen.getByText('Privacy Policy 2026.pdf')).toBeTruthy()
    expect(screen.getByText('Data Processing Agreement.pdf')).toBeTruthy()
  })

  it('displays document metadata correctly', () => {
    render(<LegalUpload />)
    const sarahJohnson = screen.getAllByText('Sarah Johnson')
    expect(sarahJohnson.length).toBeGreaterThan(0)
    expect(screen.getByText('v2.1')).toBeTruthy()
    expect(screen.getByText('245 KB')).toBeTruthy()
  })

  it('shows document count', () => {
    render(<LegalUpload />)
    expect(screen.getByText(/Documents \(7\)/)).toBeTruthy()
  })

  it('displays status badges', () => {
    render(<LegalUpload />)
    const activeStatuses = screen.getAllByText('active')
    expect(activeStatuses.length).toBeGreaterThan(0)
  })
})
