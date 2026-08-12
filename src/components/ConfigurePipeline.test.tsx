import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConfigurePipeline from './ConfigurePipeline'

describe('ConfigurePipeline', () => {
  it('renders without crashing', () => {
    render(<ConfigurePipeline />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<ConfigurePipeline />)
    expect(screen.getByText('CI/CD Pipeline Configuration')).toBeTruthy()
  })

  it('displays all pipeline stages', () => {
    render(<ConfigurePipeline />)
    expect(screen.getByText('Build')).toBeTruthy()
    expect(screen.getByText('Test')).toBeTruthy()
    expect(screen.getByText('Security Scan')).toBeTruthy()
    expect(screen.getByText('Deploy to Staging')).toBeTruthy()
    expect(screen.getByText('Deploy to Production')).toBeTruthy()
  })

  it('displays all environments', () => {
    render(<ConfigurePipeline />)
    expect(screen.getByText('Development')).toBeTruthy()
    expect(screen.getByText('Staging')).toBeTruthy()
    expect(screen.getByText('Production')).toBeTruthy()
    expect(screen.getByText('QA')).toBeTruthy()
    expect(screen.getByText('Demo')).toBeTruthy()
  })

  it('displays pipeline settings section', () => {
    render(<ConfigurePipeline />)
    expect(screen.getByText('Pipeline Settings')).toBeTruthy()
    expect(screen.getByText('Auto-Deploy to Staging')).toBeTruthy()
    expect(screen.getByText('Run Tests in Parallel')).toBeTruthy()
    expect(screen.getByText('Notify on Failure')).toBeTruthy()
  })

  it('displays action buttons', () => {
    render(<ConfigurePipeline />)
    expect(screen.getByText('Save Configuration')).toBeTruthy()
    expect(screen.getByText('Reset to Defaults')).toBeTruthy()
  })
})
