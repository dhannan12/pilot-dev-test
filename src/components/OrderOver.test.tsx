import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OrderOver from './OrderOver'

describe('OrderOver', () => {
  it('renders without crashing', () => {
    render(<OrderOver />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard title', () => {
    render(<OrderOver />)
    expect(screen.getByText('Order Review Dashboard')).toBeTruthy()
    expect(screen.getByText(/Orders over \$100 require logistics coordinator review/i)).toBeTruthy()
  })

  it('displays mock orders data', () => {
    render(<OrderOver />)
    expect(screen.getByText('ORD-1001')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emma Wilson')).toBeTruthy()
  })

  it('displays order amounts over $100', () => {
    render(<OrderOver />)
    expect(screen.getByText('$145.99')).toBeTruthy()
    expect(screen.getByText('$289.50')).toBeTruthy()
    expect(screen.getByText('$178.75')).toBeTruthy()
  })

  it('filters orders by status', () => {
    render(<OrderOver />)
    const filterSelect = screen.getByLabelText(/Filter by status/i)
    
    fireEvent.change(filterSelect, { target: { value: 'pending_review' } })
    expect(screen.getByText('ORD-1001')).toBeTruthy()
    expect(screen.getByText('ORD-1003')).toBeTruthy()
  })

  it('shows order details when an order is selected', () => {
    render(<OrderOver />)
    const order = screen.getByText('ORD-1001')
    fireEvent.click(order)
    
    expect(screen.getByText(/Premium IPA Case/i)).toBeTruthy()
    expect(screen.getByText(/Craft Lager Case/i)).toBeTruthy()
  })

  it('displays approve and reject buttons for pending orders', () => {
    render(<OrderOver />)
    const pendingOrder = screen.getByText('ORD-1001')
    fireEvent.click(pendingOrder)
    
    expect(screen.getByText('Approve Order')).toBeTruthy()
    expect(screen.getByText('Reject Order')).toBeTruthy()
  })

  it('approves an order when approve button is clicked', () => {
    render(<OrderOver />)
    const pendingOrder = screen.getByText('ORD-1001')
    fireEvent.click(pendingOrder)
    
    const approveButton = screen.getByText('Approve Order')
    fireEvent.click(approveButton)
    
    // After approval, the approve button should not be visible
    expect(screen.queryByText('Approve Order')).toBeFalsy()
  })

  it('displays status counts', () => {
    render(<OrderOver />)
    expect(screen.getByText(/\d+ Pending/)).toBeTruthy()
    expect(screen.getByText(/\d+ Approved/)).toBeTruthy()
    expect(screen.getByText(/\d+ Rejected/)).toBeTruthy()
  })

  it('shows placeholder when no order is selected', () => {
    render(<OrderOver />)
    expect(screen.getByText(/Select an order to view details/i)).toBeTruthy()
  })
})
