import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DocumentUpload from './DocumentUpload'

describe('DocumentUpload', () => {
  it('renders without crashing', () => {
    render(<DocumentUpload />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<DocumentUpload />)
    expect(screen.getByText('Document Management')).toBeTruthy()
  })

  it('displays mock documents', () => {
    render(<DocumentUpload />)
    expect(screen.getByText('contract_agreement_2024.pdf')).toBeTruthy()
    expect(screen.getByText('compliance_report_q2.docx')).toBeTruthy()
    expect(screen.getByText('legal_memo_draft.pdf')).toBeTruthy()
    expect(screen.getByText('nda_template_v3.pdf')).toBeTruthy()
    expect(screen.getByText('financial_statement.xlsx')).toBeTruthy()
  })

  it('displays upload area with instructions', () => {
    render(<DocumentUpload />)
    expect(screen.getByText('Upload Documents')).toBeTruthy()
    expect(screen.getByText('Drag and drop files here, or click to browse')).toBeTruthy()
    expect(screen.getByText('Choose Files')).toBeTruthy()
  })

  it('shows document count statistics', () => {
    render(<DocumentUpload />)
    expect(screen.getByText('Total Documents')).toBeTruthy()
    expect(screen.getByText('Ready')).toBeTruthy()
    expect(screen.getByText('Processing')).toBeTruthy()
    expect(screen.getByText('Errors')).toBeTruthy()
  })

  it('filters documents by search term', () => {
    render(<DocumentUpload />)
    const searchInput = screen.getByPlaceholderText(/Search documents by name or uploader/i)
    
    fireEvent.change(searchInput, { target: { value: 'contract' } })
    
    expect(screen.getByText('contract_agreement_2024.pdf')).toBeTruthy()
    expect(screen.queryByText('compliance_report_q2.docx')).toBeNull()
  })

  it('filters documents by category', () => {
    render(<DocumentUpload />)
    const categorySelect = screen.getByRole('combobox')
    
    fireEvent.change(categorySelect, { target: { value: 'Contracts' } })
    
    expect(screen.getByText('contract_agreement_2024.pdf')).toBeTruthy()
    expect(screen.queryByText('compliance_report_q2.docx')).toBeNull()
  })

  it('displays document status badges', () => {
    render(<DocumentUpload />)
    const statusBadges = screen.getAllByText(/ready|processing|error/i)
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it('shows download and delete buttons for each document', () => {
    render(<DocumentUpload />)
    const downloadButtons = screen.getAllByText('Download')
    const deleteButtons = screen.getAllByText('Delete')
    
    expect(downloadButtons.length).toBeGreaterThan(0)
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('handles download button click', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<DocumentUpload />)
    
    const downloadButtons = screen.getAllByText('Download')
    fireEvent.click(downloadButtons[0])
    
    expect(alertSpy).toHaveBeenCalled()
    alertSpy.mockRestore()
  })

  it('handles delete button click', () => {
    render(<DocumentUpload />)
    
    const initialDocuments = screen.getAllByRole('button', { name: 'Delete' })
    const initialCount = initialDocuments.length
    
    fireEvent.click(initialDocuments[0])
    
    const remainingDocuments = screen.getAllByRole('button', { name: 'Delete' })
    expect(remainingDocuments.length).toBe(initialCount - 1)
  })

  it('displays document metadata', () => {
    render(<DocumentUpload />)
    const sarahElements = screen.getAllByText(/Sarah Johnson/i)
    expect(sarahElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/2\.4 MB/)).toBeTruthy()
  })

  it('shows API endpoint information', () => {
    render(<DocumentUpload />)
    expect(screen.getByText(/API Endpoints Simulated/i)).toBeTruthy()
    expect(screen.getByText(/POST \/api\/documents\/upload/i)).toBeTruthy()
    const getAllEndpoints = screen.getAllByText(/GET \/api\/documents/i)
    expect(getAllEndpoints.length).toBeGreaterThan(0)
  })

  it('displays all category options', () => {
    render(<DocumentUpload />)
    const categorySelect = screen.getByRole('combobox')
    
    expect(categorySelect).toBeTruthy()
    fireEvent.click(categorySelect)
    
    expect(screen.getByText('All Categories')).toBeTruthy()
  })

  it('shows empty state when no documents match filter', () => {
    render(<DocumentUpload />)
    const searchInput = screen.getByPlaceholderText(/Search documents by name or uploader/i)
    
    fireEvent.change(searchInput, { target: { value: 'nonexistent_document_xyz' } })
    
    expect(screen.getByText('No documents found')).toBeTruthy()
  })
})
