import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupCourt from './SetupCourt'

describe('SetupCourt', () => {
  it('renders without crashing', () => {
    render(<SetupCourt />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<SetupCourt />)
    expect(screen.getByText('Court Date Notification Setup')).toBeTruthy()
    expect(screen.getByText(/Configure notification channels, schedules, and recipient groups/i)).toBeTruthy()
  })

  it('displays statistics dashboard', () => {
    render(<SetupCourt />)
    expect(screen.getByText('Active Channels')).toBeTruthy()
    expect(screen.getByText('Active Schedules')).toBeTruthy()
    expect(screen.getByText('Active Recipient Groups')).toBeTruthy()
  })

  it('displays notification channels by default', () => {
    render(<SetupCourt />)
    expect(screen.getByText('Primary Email Service')).toBeTruthy()
    expect(screen.getByText('SMS Gateway')).toBeTruthy()
    expect(screen.getByText('Push Notification Service')).toBeTruthy()
  })

  it('displays mock data in channels tab', () => {
    render(<SetupCourt />)
    // Check for at least 5 mock channels
    expect(screen.getByText('Primary Email Service')).toBeTruthy()
    expect(screen.getByText('SMS Gateway')).toBeTruthy()
    expect(screen.getByText('Push Notification Service')).toBeTruthy()
    expect(screen.getByText('Webhook Integration')).toBeTruthy()
    expect(screen.getByText('Backup Email Service')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupCourt />)
    // Verify key testids exist — Playwright QA depends on these
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupcourt"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupcourt-tab-channels"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-tab-schedules"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-tab-recipients"]')).toBeTruthy()
    
    // List containers
    expect(document.querySelector('[data-testid="setupcourt-channels-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelector('[data-testid="setupcourt-channel-item"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="setupcourt-add-channel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-test-channel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-toggle-channel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-save"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupcourt-reset"]')).toBeTruthy()
  })

  it('switches to schedules tab when clicked', async () => {
    render(<SetupCourt />)
    const schedulesTab = screen.getByTestId('setupcourt-tab-schedules')
    fireEvent.click(schedulesTab)
    await waitFor(() => {
      expect(screen.getByText('7-Day Advance Notice')).toBeTruthy()
    })
    expect(screen.getByText('3-Day Reminder')).toBeTruthy()
  })

  it('switches to recipients tab when clicked', async () => {
    render(<SetupCourt />)
    const recipientsTab = screen.getByTestId('setupcourt-tab-recipients')
    fireEvent.click(recipientsTab)
    await waitFor(() => {
      expect(screen.getByText('Primary Solicitors')).toBeTruthy()
    })
    expect(screen.getByText('Clients')).toBeTruthy()
  })

  it('displays all schedule items when on schedules tab', async () => {
    render(<SetupCourt />)
    const schedulesTab = screen.getByTestId('setupcourt-tab-schedules')
    fireEvent.click(schedulesTab)
    
    await waitFor(() => {
      expect(screen.getByText('7-Day Advance Notice')).toBeTruthy()
    })
    expect(screen.getByText('3-Day Reminder')).toBeTruthy()
    expect(screen.getByText('1-Day Final Notice')).toBeTruthy()
    expect(screen.getByText('Same Day Alert')).toBeTruthy()
    expect(screen.getByText('14-Day Early Warning')).toBeTruthy()
  })

  it('displays all recipient groups when on recipients tab', async () => {
    render(<SetupCourt />)
    const recipientsTab = screen.getByTestId('setupcourt-tab-recipients')
    fireEvent.click(recipientsTab)
    
    await waitFor(() => {
      expect(screen.getByText('Primary Solicitors')).toBeTruthy()
    })
    expect(screen.getByText('Clients')).toBeTruthy()
    expect(screen.getByText('Admin Staff')).toBeTruthy()
    expect(screen.getByText('External Counsel')).toBeTruthy()
    expect(screen.getByText('Court Liaisons')).toBeTruthy()
  })
})
