import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Setup from './Setup'

describe('Setup', () => {
  it('renders without crashing', () => {
    render(<Setup />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<Setup />)
    expect(screen.getByText('CI/CD Setup & Deployment')).toBeTruthy()
  })

  it('displays summary cards', () => {
    render(<Setup />)
    expect(screen.getByText('Active Pipelines')).toBeTruthy()
    expect(screen.getByText('Deployments Today')).toBeTruthy()
    expect(screen.getByText('Test Coverage')).toBeTruthy()
    expect(screen.getByText('Failed Builds')).toBeTruthy()
  })

  it('displays mock pipelines data', () => {
    render(<Setup />)
    expect(screen.getByText('Main CI Pipeline')).toBeTruthy()
    expect(screen.getByText('Development Pipeline')).toBeTruthy()
    expect(screen.getByText('Staging Pipeline')).toBeTruthy()
  })

  it('switches to deployments tab', () => {
    render(<Setup />)
    const deploymentsTab = screen.getByRole('button', { name: /Deployments/i })
    fireEvent.click(deploymentsTab)
    expect(screen.getAllByText('Production').length).toBeGreaterThan(0)
    expect(screen.getAllByText('v2.5.3').length).toBeGreaterThan(0)
  })

  it('switches to build history tab', () => {
    render(<Setup />)
    const buildsTab = screen.getByRole('button', { name: /Build History/i })
    fireEvent.click(buildsTab)
    expect(screen.getByText('#1245')).toBeTruthy()
    expect(screen.getByText('a3f5c21')).toBeTruthy()
  })

  it('displays pipeline configuration section', () => {
    render(<Setup />)
    expect(screen.getByText('Pipeline Configuration')).toBeTruthy()
    expect(screen.getByText('Automated Tests')).toBeTruthy()
    expect(screen.getByText('Deployment Options')).toBeTruthy()
  })

  it('shows status badges for pipelines', () => {
    render(<Setup />)
    expect(screen.getAllByText('success').length).toBeGreaterThan(0)
    expect(screen.getByText('running')).toBeTruthy()
    expect(screen.getByText('failed')).toBeTruthy()
  })
})
