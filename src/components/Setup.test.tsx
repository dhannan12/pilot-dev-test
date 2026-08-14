import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Setup from './Setup'

describe('Setup', () => {
  it('renders without crashing', () => {
    render(<Setup />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<Setup />)
    expect(screen.getByText('CI/CD Pipeline Setup')).toBeInTheDocument()
  })

  it('displays stats cards', () => {
    render(<Setup />)
    expect(screen.getByText('Total Builds')).toBeInTheDocument()
    expect(screen.getByText('Success Rate')).toBeInTheDocument()
    expect(screen.getByText('Avg Build Time')).toBeInTheDocument()
    expect(screen.getByText('Active Environments')).toBeInTheDocument()
  })

  it('displays pipeline stages by default', () => {
    render(<Setup />)
    expect(screen.getByText('Build')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Security Scan')).toBeInTheDocument()
  })

  it('switches to environments tab', () => {
    render(<Setup />)
    const environmentsTab = screen.getByText('Environments')
    fireEvent.click(environmentsTab)
    expect(screen.getByText('https://dev.example.com')).toBeInTheDocument()
    expect(screen.getByText('https://staging.example.com')).toBeInTheDocument()
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
  })

  it('switches to logs tab', () => {
    render(<Setup />)
    const logsTab = screen.getByText('Build Logs')
    fireEvent.click(logsTab)
    expect(screen.getByText(/Pipeline started for branch/i)).toBeInTheDocument()
    expect(screen.getByText(/Building Docker image/i)).toBeInTheDocument()
  })

  it('displays pipeline configuration section', () => {
    render(<Setup />)
    expect(screen.getByText('Pipeline Configuration')).toBeInTheDocument()
    expect(screen.getByText('Trigger Branch')).toBeInTheDocument()
    expect(screen.getByText('Build Timeout')).toBeInTheDocument()
  })

  it('shows mock environment URLs', () => {
    render(<Setup />)
    const environmentsTab = screen.getByText('Environments')
    fireEvent.click(environmentsTab)
    expect(screen.getByText('https://dev.example.com')).toBeInTheDocument()
    expect(screen.getByText('https://staging.example.com')).toBeInTheDocument()
  })
})
