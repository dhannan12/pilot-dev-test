import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LegalAdd from './LegalAdd'

describe('LegalAdd', () => {
  it('renders without crashing', () => {
    render(<LegalAdd />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<LegalAdd />)
    expect(screen.getByText('Legal Document Review')).toBeTruthy()
    expect(screen.getByText(/Add comments and annotations without modifying/i)).toBeTruthy()
  })

  it('displays document sections', () => {
    render(<LegalAdd />)
    expect(screen.getByText('Executive Summary')).toBeTruthy()
    expect(screen.getByText('Scope of Services')).toBeTruthy()
    expect(screen.getByText('Payment Terms')).toBeTruthy()
    expect(screen.getByText('Intellectual Property Rights')).toBeTruthy()
    expect(screen.getByText('Confidentiality')).toBeTruthy()
  })

  it('displays annotation counts on sections with annotations', () => {
    render(<LegalAdd />)
    const sections = screen.getAllByRole('button')
    const sectionsWithCounts = sections.filter(button => {
      const text = button.textContent || ''
      return /\d+/.test(text) && button.querySelector('.bg-blue-500')
    })
    expect(sectionsWithCounts.length).toBeGreaterThan(0)
  })

  it('shows section content when a section is clicked', () => {
    render(<LegalAdd />)
    const paymentTermsButton = screen.getByText('Payment Terms').closest('button')
    
    if (paymentTermsButton) {
      fireEvent.click(paymentTermsButton)
      expect(screen.getByText(/Client agrees to pay service provider/i)).toBeTruthy()
    }
  })

  it('displays add annotation form when section is selected', () => {
    render(<LegalAdd />)
    const firstSection = screen.getByText('Executive Summary').closest('button')
    
    if (firstSection) {
      fireEvent.click(firstSection)
      expect(screen.getByPlaceholderText(/Add your legal review comment/i)).toBeTruthy()
      expect(screen.getByPlaceholderText(/Select specific text to reference/i)).toBeTruthy()
      const addButton = screen.getByRole('button', { name: /Add Annotation/i })
      expect(addButton).toBeTruthy()
    }
  })

  it('displays existing annotations for selected section', () => {
    render(<LegalAdd />)
    const paymentTermsButton = screen.getByText('Payment Terms').closest('button')
    
    if (paymentTermsButton) {
      fireEvent.click(paymentTermsButton)
      expect(screen.getByText('Sarah Johnson')).toBeTruthy()
      expect(screen.getByText(/30-day payment term may be too long/i)).toBeTruthy()
    }
  })

  it('allows adding a new annotation', () => {
    render(<LegalAdd />)
    const firstSection = screen.getByText('Executive Summary').closest('button')
    
    if (firstSection) {
      fireEvent.click(firstSection)
      
      const commentTextarea = screen.getByPlaceholderText(/Add your legal review comment/i)
      fireEvent.change(commentTextarea, { target: { value: 'This is a test comment' } })
      
      const addButton = screen.getByRole('button', { name: /Add Annotation/i })
      fireEvent.click(addButton)
      
      expect(screen.getByText('This is a test comment')).toBeTruthy()
    }
  })

  it('displays annotation status badges', () => {
    render(<LegalAdd />)
    const paymentTermsButton = screen.getByText('Payment Terms').closest('button')
    
    if (paymentTermsButton) {
      fireEvent.click(paymentTermsButton)
      const statusBadges = screen.getAllByText(/pending|resolved|in-review/i)
      expect(statusBadges.length).toBeGreaterThan(0)
    }
  })

  it('shows reply form when reply button is clicked', () => {
    render(<LegalAdd />)
    const paymentTermsButton = screen.getByText('Payment Terms').closest('button')
    
    if (paymentTermsButton) {
      fireEvent.click(paymentTermsButton)
      const replyButtons = screen.getAllByRole('button', { name: /Reply/i })
      
      if (replyButtons.length > 0) {
        fireEvent.click(replyButtons[0])
        expect(screen.getByPlaceholderText(/Write a reply/i)).toBeTruthy()
      }
    }
  })

  it('displays highlighted text in annotations', () => {
    render(<LegalAdd />)
    const paymentTermsButton = screen.getByText('Payment Terms').closest('button')
    
    if (paymentTermsButton) {
      fireEvent.click(paymentTermsButton)
      expect(screen.getByText(/"within thirty \(30\) days"/i)).toBeTruthy()
    }
  })

  it('shows empty state when no section is selected', () => {
    render(<LegalAdd />)
    expect(screen.getByText('No Section Selected')).toBeTruthy()
    expect(screen.getByText(/Select a document section to view and add annotations/i)).toBeTruthy()
  })

  it('displays author information for annotations', () => {
    render(<LegalAdd />)
    const liabilitySection = screen.getByText('Limitation of Liability').closest('button')
    
    if (liabilitySection) {
      fireEvent.click(liabilitySection)
      expect(screen.getByText(/sarah.johnson@legalfirm.com/i)).toBeTruthy()
    }
  })
})
