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
    expect(screen.getByText('CI/CD Pipeline & Deployment')).toBeInTheDocument()
  })

  it('displays all tab buttons', () => {
    render(<Setup />)
    expect(screen.getByText('Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Environments')).toBeInTheDocument()
    expect(screen.getByText('Build Logs')).toBeInTheDocument()
    expect(screen.getByText('Webhooks')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('displays pipelines by default', () => {
    render(<Setup />)
    expect(screen.getByText('Active Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Build & Test')).toBeInTheDocument()
    expect(screen.getByText('Deploy Staging')).toBeInTheDocument()
  })

  it('switches to environments tab when clicked', () => {
    render(<Setup />)
    const environmentsTab = screen.getByText('Environments')
    fireEvent.click(environmentsTab)
    expect(screen.getByText('Deployment Environments')).toBeInTheDocument()
    expect(screen.getByText('Production')).toBeInTheDocument()
    expect(screen.getByText('Staging')).toBeInTheDocument()
  })

  it('switches to build logs tab when clicked', () => {
    render(<Setup />)
    const logsTab = screen.getByRole('button', { name: 'Build Logs' })
    fireEvent.click(logsTab)
    expect(screen.getByText('Starting deployment to staging environment')).toBeInTheDocument()
  })

  it('switches to webhooks tab when clicked', () => {
    render(<Setup />)
    const webhooksTab = screen.getByText('Webhooks')
    fireEvent.click(webhooksTab)
    expect(screen.getByText('Webhook Configuration')).toBeInTheDocument()
    expect(screen.getByText('Slack Notifications')).toBeInTheDocument()
  })

  it('switches to history tab when clicked', () => {
    render(<Setup />)
    const historyTab = screen.getByRole('button', { name: 'History' })
    fireEvent.click(historyTab)
    expect(screen.getByText('Deployment History')).toBeInTheDocument()
    expect(screen.getAllByText('Sarah Chen').length).toBeGreaterThan(0)
  })

  it('displays mock pipeline data with statuses', () => {
    render(<Setup />)
    expect(screen.getByText('Build & Test')).toBeInTheDocument()
    expect(screen.getByText('Deploy Staging')).toBeInTheDocument()
    expect(screen.getByText('Deploy Production')).toBeInTheDocument()
    expect(screen.getByText('Security Scan')).toBeInTheDocument()
    expect(screen.getByText('Code Quality Check')).toBeInTheDocument()
  })

  it('displays mock environment data', () => {
    render(<Setup />)
    const environmentsTab = screen.getByText('Environments')
    fireEvent.click(environmentsTab)
    expect(screen.getByText('Production')).toBeInTheDocument()
    expect(screen.getByText('Staging')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('QA')).toBeInTheDocument()
    expect(screen.getByText('Demo')).toBeInTheDocument()
  })

  it('displays mock webhook data', () => {
    render(<Setup />)
    const webhooksTab = screen.getByText('Webhooks')
    fireEvent.click(webhooksTab)
    expect(screen.getByText('Slack Notifications')).toBeInTheDocument()
    expect(screen.getByText('GitHub Integration')).toBeInTheDocument()
    expect(screen.getByText('Monitoring Service')).toBeInTheDocument()
    expect(screen.getByText('Email Alerts')).toBeInTheDocument()
    expect(screen.getByText('PagerDuty')).toBeInTheDocument()
  })

  it('displays mock deployment history', () => {
    render(<Setup />)
    const historyTab = screen.getByRole('button', { name: 'History' })
    fireEvent.click(historyTab)
    expect(screen.getAllByText('Sarah Chen').length).toBeGreaterThan(0)
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument()
    expect(screen.getByText('Alex Kumar')).toBeInTheDocument()
    expect(screen.getByText('Emma Davis')).toBeInTheDocument()
  })
})
