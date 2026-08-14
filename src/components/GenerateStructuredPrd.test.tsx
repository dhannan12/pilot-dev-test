import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GenerateStructuredPrd from './GenerateStructuredPrd'

describe('GenerateStructuredPrd', () => {
  it('renders without crashing', () => {
    render(<GenerateStructuredPrd />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<GenerateStructuredPrd />)
    expect(screen.getByText('Generate Structured PRD')).toBeInTheDocument()
    expect(screen.getByText(/Transform validated product briefs/i)).toBeInTheDocument()
  })

  it('displays list of validated product briefs', () => {
    render(<GenerateStructuredPrd />)
    expect(screen.getByText('Mobile Banking App Redesign')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Customer Support Chatbot')).toBeInTheDocument()
    expect(screen.getByText('E-commerce Checkout Optimization')).toBeInTheDocument()
    expect(screen.getByText('Real-time Inventory Management System')).toBeInTheDocument()
    expect(screen.getByText('Social Media Analytics Dashboard')).toBeInTheDocument()
  })

  it('shows validated badges for all briefs', () => {
    render(<GenerateStructuredPrd />)
    const validatedBadges = screen.getAllByText('Validated')
    expect(validatedBadges).toHaveLength(5)
  })

  it('generates PRD when Generate PRD button is clicked', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    // Check for generating state
    await waitFor(() => {
      expect(screen.getByText('Generating...')).toBeInTheDocument()
    })

    // Wait for PRD to be generated
    await waitFor(() => {
      expect(screen.getByText('Mobile Banking App Redesign')).toBeInTheDocument()
      expect(screen.getByText('PRD Sections')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays PRD sections after generation', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[1])

    await waitFor(() => {
      expect(screen.getByText('Executive Summary')).toBeInTheDocument()
      expect(screen.getByText('Functional Requirements')).toBeInTheDocument()
      expect(screen.getByText('Acceptance Criteria')).toBeInTheDocument()
      expect(screen.getByText('Success Metrics')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('shows version and generated date in PRD header', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    await waitFor(() => {
      expect(screen.getByText(/Version: 1.0/i)).toBeInTheDocument()
      expect(screen.getByText(/Generated:/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('allows resetting to select another brief', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    await waitFor(() => {
      expect(screen.getByText('Generate Another')).toBeInTheDocument()
    }, { timeout: 3000 })

    const generateAnotherButton = screen.getByText('Generate Another')
    fireEvent.click(generateAnotherButton)

    // Should return to brief selection
    await waitFor(() => {
      expect(screen.getByText('Select a Validated Product Brief')).toBeInTheDocument()
    })
  })

  it('displays action buttons after PRD generation', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    await waitFor(() => {
      expect(screen.getByText('Export PDF')).toBeInTheDocument()
      expect(screen.getByText('Submit for Review')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('shows section count in PRD header', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    await waitFor(() => {
      expect(screen.getByText(/Sections: 10/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays section numbers for each PRD section', async () => {
    render(<GenerateStructuredPrd />)
    
    const generateButtons = screen.getAllByText('Generate PRD')
    fireEvent.click(generateButtons[0])

    await waitFor(() => {
      const sectionNumbers = screen.getAllByText(/^[1-9]$|^10$/)
      expect(sectionNumbers.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})
