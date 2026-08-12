import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Pipeline from './Pipeline'

describe('Pipeline', () => {
  it('renders without crashing', () => {
    render(<Pipeline />)
    expect(document.body).toBeTruthy()
  })

  it('displays the header', () => {
    render(<Pipeline />)
    expect(screen.getByText('CI/CD Pipeline')).toBeTruthy()
    expect(screen.getByText('Monitor and manage your deployment pipeline')).toBeTruthy()
  })

  it('displays stats cards', () => {
    render(<Pipeline />)
    expect(screen.getByText('Total Runs')).toBeTruthy()
    expect(screen.getByText('Success Rate')).toBeTruthy()
    expect(screen.getByText('Avg Duration')).toBeTruthy()
    expect(screen.getByText('Active Runs')).toBeTruthy()
  })

  it('displays pipeline runs', () => {
    render(<Pipeline />)
    expect(screen.getByText('#245')).toBeTruthy()
    expect(screen.getByText('#244')).toBeTruthy()
    expect(screen.getByText('#243')).toBeTruthy()
  })

  it('displays pipeline stages', () => {
    render(<Pipeline />)
    expect(screen.getAllByText('Build').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Test').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Security Scan').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Deploy Staging').length).toBeGreaterThan(0)
  })

  it('displays author names', () => {
    render(<Pipeline />)
    expect(screen.getByText(/Sarah Chen/)).toBeTruthy()
    expect(screen.getByText(/Mike Johnson/)).toBeTruthy()
    expect(screen.getByText(/Emily Rodriguez/)).toBeTruthy()
  })
})
