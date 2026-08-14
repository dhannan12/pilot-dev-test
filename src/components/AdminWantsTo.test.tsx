import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminWantsTo from './AdminWantsTo'

describe('AdminWantsTo', () => {
  it('renders without crashing', () => {
    render(<AdminWantsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the admin inbox title', () => {
    render(<AdminWantsTo />)
    expect(screen.getByText('Admin Inbox')).toBeInTheDocument()
    expect(screen.getByText('Manage and organize incoming messages')).toBeInTheDocument()
  })

  it('displays mock messages', () => {
    render(<AdminWantsTo />)
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Davis')).toBeInTheDocument()
    expect(screen.getByText('Robert Wilson')).toBeInTheDocument()
  })

  it('displays filter options', () => {
    render(<AdminWantsTo />)
    expect(screen.getByText('Filters')).toBeInTheDocument()
    
    // Use getAllByText for items that appear multiple times (in filters and badges)
    expect(screen.getByRole('button', { name: /^all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^unread/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^read/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^flagged/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^archived/i })).toBeInTheDocument()
  })

  it('filters messages by status', () => {
    render(<AdminWantsTo />)
    
    // Click on unread filter
    const unreadButton = screen.getByRole('button', { name: /unread/i })
    fireEvent.click(unreadButton)
    
    // Should show unread messages
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Lisa Anderson')).toBeInTheDocument()
  })

  it('allows searching messages', () => {
    render(<AdminWantsTo />)
    
    const searchInput = screen.getByPlaceholderText('Search messages...')
    fireEvent.change(searchInput, { target: { value: 'pricing' } })
    
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Question about pricing')).toBeInTheDocument()
  })

  it('allows selecting messages with checkboxes', () => {
    render(<AdminWantsTo />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    // Click on a message checkbox (skip the select all checkbox)
    fireEvent.click(checkboxes[1])
    
    // Should show bulk action buttons
    expect(screen.getByText(/selected/i)).toBeInTheDocument()
    expect(screen.getByText('Mark Read')).toBeInTheDocument()
    expect(screen.getByText('Archive')).toBeInTheDocument()
  })

  it('displays message details when clicked', () => {
    render(<AdminWantsTo />)
    
    // Click on a message
    const message = screen.getByText('Question about pricing')
    fireEvent.click(message)
    
    // Should show message details sidebar
    expect(screen.getByText('Message Details')).toBeInTheDocument()
  })

  it('shows message counts for each filter', () => {
    render(<AdminWantsTo />)
    
    // Should display counts next to filters
    const filters = screen.getByText('Filters').parentElement
    expect(filters).toBeInTheDocument()
    // Counts should be visible as numbers in badges
    const badges = screen.getAllByText(/\d+/)
    expect(badges.length).toBeGreaterThan(0)
  })

  it('allows select all functionality', () => {
    render(<AdminWantsTo />)
    
    // Find and click the select all checkbox
    const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i })
    fireEvent.click(selectAllCheckbox)
    
    // Should show bulk actions with selected count
    expect(screen.getByText(/selected/i)).toBeInTheDocument()
  })
})
