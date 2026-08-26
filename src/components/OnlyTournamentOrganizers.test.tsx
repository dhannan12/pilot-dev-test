import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyTournamentOrganizers from './OnlyTournamentOrganizers'

describe('OnlyTournamentOrganizers', () => {
  it('renders without crashing', () => {
    render(<OnlyTournamentOrganizers />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<OnlyTournamentOrganizers />)
    expect(screen.getByText('Magnus Carlsen vs Hikaru Nakamura')).toBeTruthy()
    expect(screen.getByText('Fabiano Caruana vs Ding Liren')).toBeTruthy()
    expect(screen.getByText('Ian Nepomniachtchi vs Alireza Firouzja')).toBeTruthy()
    expect(screen.getByText('Wesley So vs Levon Aronian')).toBeTruthy()
    expect(screen.getByText('Maxime Vachier-Lagrave vs Anish Giri')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<OnlyTournamentOrganizers />)
    
    // Main wrapper
    expect(screen.getByTestId('onlytournamentorganizers')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('onlytournamentorganizers-list')).toBeTruthy()
    
    // List items (should have 6 matches)
    const items = screen.getAllByTestId('onlytournamentorganizers-item')
    expect(items.length).toBe(6)
    
    // Toggle role button
    expect(screen.getByTestId('onlytournamentorganizers-toggle-role')).toBeTruthy()
  })

  it('starts with participant role and shows access restriction', () => {
    render(<OnlyTournamentOrganizers />)
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText(/You do not have permission to modify match schedules/)).toBeTruthy()
  })

  it('allows switching to organizer role', () => {
    render(<OnlyTournamentOrganizers />)
    
    const toggleButton = screen.getByTestId('onlytournamentorganizers-toggle-role')
    fireEvent.click(toggleButton)
    
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.queryByText(/You do not have permission/)).toBeFalsy()
  })

  it('shows edit buttons only for organizers', () => {
    render(<OnlyTournamentOrganizers />)
    
    // As participant - no edit buttons
    expect(screen.queryByTestId('onlytournamentorganizers-edit')).toBeFalsy()
    
    // Switch to organizer
    const toggleButton = screen.getByTestId('onlytournamentorganizers-toggle-role')
    fireEvent.click(toggleButton)
    
    // Now edit buttons should appear
    const editButtons = screen.getAllByTestId('onlytournamentorganizers-edit')
    expect(editButtons.length).toBeGreaterThan(0)
  })

  it('allows organizers to edit match schedules', () => {
    render(<OnlyTournamentOrganizers />)
    
    // Switch to organizer
    const toggleButton = screen.getByTestId('onlytournamentorganizers-toggle-role')
    fireEvent.click(toggleButton)
    
    // Click first edit button
    const editButtons = screen.getAllByTestId('onlytournamentorganizers-edit')
    fireEvent.click(editButtons[0])
    
    // Check that edit form appears
    expect(screen.getByTestId('onlytournamentorganizers-date')).toBeTruthy()
    expect(screen.getByTestId('onlytournamentorganizers-time')).toBeTruthy()
    expect(screen.getByTestId('onlytournamentorganizers-venue')).toBeTruthy()
    expect(screen.getByTestId('onlytournamentorganizers-save')).toBeTruthy()
    expect(screen.getByTestId('onlytournamentorganizers-cancel')).toBeTruthy()
  })

  it('can save changes to match schedule', () => {
    render(<OnlyTournamentOrganizers />)
    
    // Switch to organizer
    const toggleButton = screen.getByTestId('onlytournamentorganizers-toggle-role')
    fireEvent.click(toggleButton)
    
    // Edit first match
    const editButtons = screen.getAllByTestId('onlytournamentorganizers-edit')
    fireEvent.click(editButtons[0])
    
    // Change venue
    const venueInput = screen.getByTestId('onlytournamentorganizers-venue') as HTMLInputElement
    fireEvent.change(venueInput, { target: { value: 'Hall D' } })
    
    // Save
    const saveButton = screen.getByTestId('onlytournamentorganizers-save')
    fireEvent.click(saveButton)
    
    // Check that change persists
    expect(screen.getByText('Hall D')).toBeTruthy()
  })

  it('can cancel editing', () => {
    render(<OnlyTournamentOrganizers />)
    
    // Switch to organizer
    const toggleButton = screen.getByTestId('onlytournamentorganizers-toggle-role')
    fireEvent.click(toggleButton)
    
    // Edit first match
    const editButtons = screen.getAllByTestId('onlytournamentorganizers-edit')
    fireEvent.click(editButtons[0])
    
    // Verify edit form is visible
    expect(screen.getByTestId('onlytournamentorganizers-cancel')).toBeTruthy()
    
    // Cancel
    const cancelButton = screen.getByTestId('onlytournamentorganizers-cancel')
    fireEvent.click(cancelButton)
    
    // Edit form should be gone
    expect(screen.queryByTestId('onlytournamentorganizers-save')).toBeFalsy()
  })
})
