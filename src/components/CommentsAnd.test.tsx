import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CommentsAnd from './CommentsAnd'

describe('CommentsAnd', () => {
  it('renders without crashing', () => {
    render(<CommentsAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CommentsAnd />)
    expect(screen.getByText('Comments & Annotations API')).toBeTruthy()
  })

  it('shows API endpoints by default', () => {
    render(<CommentsAnd />)
    // Some paths appear multiple times (different HTTP methods), so use getAllByText
    expect(screen.getAllByText('/api/v1/documents/:docId/comments').length).toBeGreaterThan(0)
    expect(screen.getAllByText('/api/v1/documents/:docId/annotations').length).toBeGreaterThan(0)
  })

  it('switches to comments tab', () => {
    render(<CommentsAnd />)
    const commentsTab = screen.getByText('Sample Comments')
    fireEvent.click(commentsTab)
    expect(screen.getAllByText('Sarah Chen').length).toBeGreaterThan(0)
    expect(screen.getByText('This clause needs clarification regarding liability limits.')).toBeTruthy()
  })

  it('switches to annotations tab', () => {
    render(<CommentsAnd />)
    const annotationsTab = screen.getByText('Sample Annotations')
    fireEvent.click(annotationsTab)
    expect(screen.getByText('Important: Review with financial team')).toBeTruthy()
  })

  it('filters endpoints by HTTP method', () => {
    render(<CommentsAnd />)
    const getButton = screen.getByRole('button', { name: 'GET' })
    fireEvent.click(getButton)
    // Should show GET endpoints
    expect(screen.getByText('/api/v1/documents/:docId/comments')).toBeTruthy()
  })

  it('displays endpoint status badges', () => {
    render(<CommentsAnd />)
    const activeStatuses = screen.getAllByText('active')
    expect(activeStatuses.length).toBeGreaterThan(0)
  })

  it('displays comment metadata', () => {
    render(<CommentsAnd />)
    fireEvent.click(screen.getByText('Sample Comments'))
    expect(screen.getByText(/Total Comments:/)).toBeTruthy()
    expect(screen.getByText(/Resolved:/)).toBeTruthy()
    expect(screen.getByText(/Pending:/)).toBeTruthy()
  })

  it('displays annotation types and coordinates', () => {
    render(<CommentsAnd />)
    fireEvent.click(screen.getByText('Sample Annotations'))
    expect(screen.getByText(/Total Annotations:/)).toBeTruthy()
    // Check for coordinate displays - there are multiple, so use getAllBy
    expect(screen.getAllByText(/X:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Y:/).length).toBeGreaterThan(0)
  })

  it('shows resolved and pending status on comments', () => {
    render(<CommentsAnd />)
    fireEvent.click(screen.getByText('Sample Comments'))
    // Multiple resolved and pending items exist
    expect(screen.getAllByText('Resolved').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
  })
})
