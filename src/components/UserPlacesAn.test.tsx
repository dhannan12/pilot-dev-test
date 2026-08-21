import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserPlacesAn from './UserPlacesAn'

describe('UserPlacesAn', () => {
  it('renders without crashing', () => {
    render(<UserPlacesAn />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock order data', () => {
    render(<UserPlacesAn />)
    
    // Check for order summary title
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument()
    
    // Check for customer information
    expect(screen.getByText(/Customer Information/i)).toBeInTheDocument()
    
    // Check for payment method section
    expect(screen.getByText(/Payment Method/i)).toBeInTheDocument()
    
    // Check for estimated time
    expect(screen.getByText(/Estimated Time/i)).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<UserPlacesAn />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="userplacesan"]')
    expect(mainWrapper).toBeTruthy()
    
    // Submit button
    const submitButton = document.querySelector('[data-testid="userplacesan-submit"]')
    expect(submitButton).toBeTruthy()
    
    // Terms checkbox
    const termsCheckbox = document.querySelector('[data-testid="userplacesan-terms-checkbox"]')
    expect(termsCheckbox).toBeTruthy()
    
    // Items list
    const itemsList = document.querySelector('[data-testid="userplacesan-items-list"]')
    expect(itemsList).toBeTruthy()
    
    // Individual items
    const items = document.querySelectorAll('[data-testid="userplacesan-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays order items with quantities and prices', () => {
    render(<UserPlacesAn />)
    
    const itemsList = screen.getByTestId('userplacesan-items-list')
    expect(itemsList).toBeInTheDocument()
    
    const items = screen.getAllByTestId('userplacesan-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays customer information correctly', () => {
    render(<UserPlacesAn />)
    
    const customerName = screen.getByTestId('userplacesan-customer-name')
    expect(customerName).toBeInTheDocument()
    
    const customerPhone = screen.getByTestId('userplacesan-customer-phone')
    expect(customerPhone).toBeInTheDocument()
    
    const customerEmail = screen.getByTestId('userplacesan-customer-email')
    expect(customerEmail).toBeInTheDocument()
    
    const customerAddress = screen.getByTestId('userplacesan-customer-address')
    expect(customerAddress).toBeInTheDocument()
  })

  it('displays payment method', () => {
    render(<UserPlacesAn />)
    
    const paymentMethod = screen.getByTestId('userplacesan-payment-method')
    expect(paymentMethod).toBeInTheDocument()
  })

  it('displays estimated time', () => {
    render(<UserPlacesAn />)
    
    const estimatedTime = screen.getByTestId('userplacesan-estimated-time')
    expect(estimatedTime).toBeInTheDocument()
    expect(estimatedTime.textContent).toMatch(/\d+-\d+ minutes/)
  })

  it('requires terms acceptance before placing order', () => {
    render(<UserPlacesAn />)
    
    const submitButton = screen.getByTestId('userplacesan-submit') as HTMLButtonElement
    expect(submitButton).toBeDisabled()
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox') as HTMLInputElement
    fireEvent.click(termsCheckbox)
    
    expect(submitButton).not.toBeDisabled()
  })

  it('shows processing state when order is being placed', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    // Check for processing indicator
    await waitFor(() => {
      const processingElement = screen.getByTestId('userplacesan-processing')
      expect(processingElement).toBeInTheDocument()
    })
  })

  it('shows confirmation screen after successful order placement', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    // Wait for confirmation to appear
    await waitFor(() => {
      expect(screen.getByTestId('userplacesan-confirmation')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByText(/Order Confirmed/i)).toBeInTheDocument()
  })

  it('displays order ID on confirmation screen', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('userplacesan-order-id')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const orderId = screen.getByTestId('userplacesan-order-id')
    expect(orderId.textContent).toMatch(/ORD-/)
  })

  it('allows selecting different sample orders', () => {
    render(<UserPlacesAn />)
    
    const orderButtons = screen.getAllByTestId('userplacesan-select-order')
    expect(orderButtons.length).toBeGreaterThanOrEqual(5)
    
    // Click on a different order
    fireEvent.click(orderButtons[1])
    
    // The component should update to show the new order
    expect(screen.getByTestId('userplacesan-items-list')).toBeInTheDocument()
  })

  it('has track order button on confirmation screen', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('userplacesan-track-order')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('has view receipt button on confirmation screen', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('userplacesan-view-receipt')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('can place another order from confirmation screen', async () => {
    render(<UserPlacesAn />)
    
    const termsCheckbox = screen.getByTestId('userplacesan-terms-checkbox')
    fireEvent.click(termsCheckbox)
    
    const submitButton = screen.getByTestId('userplacesan-submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('userplacesan-new-order')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const newOrderButton = screen.getByTestId('userplacesan-new-order')
    fireEvent.click(newOrderButton)
    
    // Should return to order review
    expect(screen.getByTestId('userplacesan-submit')).toBeInTheDocument()
  })

  it('displays terms and conditions link', () => {
    render(<UserPlacesAn />)
    
    const termsLink = screen.getByTestId('userplacesan-terms-link')
    expect(termsLink).toBeInTheDocument()
  })
})
