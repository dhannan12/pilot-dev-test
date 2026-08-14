import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateContact from './CreateContact'

describe('CreateContact', () => {
  it('renders without crashing', () => {
    render(<CreateContact />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<CreateContact />)
    expect(screen.getByText('Contact Form Database Schema')).toBeInTheDocument()
  })

  it('displays all database tables', () => {
    render(<CreateContact />)
    // Check for multiple instances of table names (in sidebar and header)
    expect(screen.getAllByText('contacts').length).toBeGreaterThan(0)
    expect(screen.getByText('messages')).toBeInTheDocument()
    expect(screen.getByText('message_attachments')).toBeInTheDocument()
    expect(screen.getByText('contact_preferences')).toBeInTheDocument()
    expect(screen.getByText('message_replies')).toBeInTheDocument()
  })

  it('displays field information for the default table', () => {
    render(<CreateContact />)
    // Check for contacts table fields
    expect(screen.getByText('id')).toBeInTheDocument()
    expect(screen.getByText('full_name')).toBeInTheDocument()
    expect(screen.getByText('email')).toBeInTheDocument()
  })

  it('displays statistics about the schema', () => {
    render(<CreateContact />)
    expect(screen.getByText('Tables')).toBeInTheDocument()
    expect(screen.getByText('Total Fields')).toBeInTheDocument()
    // Multiple instances of 'Indexes' (in stats and table details)
    expect(screen.getAllByText('Indexes').length).toBeGreaterThan(0)
    expect(screen.getByText('Foreign Keys')).toBeInTheDocument()
  })

  it('shows SQL create statement', () => {
    render(<CreateContact />)
    expect(screen.getByText('SQL Create Statement')).toBeInTheDocument()
  })

  it('displays table description', () => {
    render(<CreateContact />)
    expect(screen.getByText('Stores contact form submissions from users')).toBeInTheDocument()
  })
})
