import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BuildOrderStatus from './BuildOrderStatus';

describe('BuildOrderStatus', () => {
  it('renders without crashing', () => {
    render(<BuildOrderStatus />);
    expect(document.body).toBeTruthy();
  });

  it('displays the page title', () => {
    render(<BuildOrderStatus />);
    expect(screen.getByText('Order Status')).toBeTruthy();
    expect(screen.getByText('Track your craft beverage orders')).toBeTruthy();
  });

  it('displays mock orders list', () => {
    render(<BuildOrderStatus />);
    expect(screen.getAllByText('ORD-2026-001').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ORD-2026-002').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ORD-2026-003').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ORD-2026-004').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ORD-2026-005').length).toBeGreaterThan(0);
  });

  it('displays order status badges', () => {
    render(<BuildOrderStatus />);
    expect(screen.getAllByText('Preparing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Ready for Pickup').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cancelled').length).toBeGreaterThan(0);
  });

  it('displays order items for the first order by default', () => {
    render(<BuildOrderStatus />);
    expect(screen.getByText('Craft IPA - Hazy Dreams')).toBeTruthy();
    expect(screen.getByText('Dark Stout - Midnight Brew')).toBeTruthy();
  });

  it('displays order total', () => {
    render(<BuildOrderStatus />);
    const totalElements = screen.getAllByText('$27.97');
    expect(totalElements.length).toBeGreaterThan(0);
  });

  it('switches order details when clicking different order', () => {
    render(<BuildOrderStatus />);
    
    // Click on the second order
    const orderCards = screen.getAllByText(/ORD-2026-/);
    fireEvent.click(orderCards[1]);
    
    // Check if the details updated
    expect(screen.getByText('Lager - Golden Sunset')).toBeTruthy();
    expect(screen.getByText('Wheat Ale - Summer Breeze')).toBeTruthy();
  });

  it('displays progress bar for active orders', () => {
    render(<BuildOrderStatus />);
    expect(screen.getByText('Order Progress')).toBeTruthy();
  });

  it('displays estimated time for preparing orders', () => {
    render(<BuildOrderStatus />);
    expect(screen.getByText(/Estimated time: 15 minutes/)).toBeTruthy();
  });

  it('displays action buttons', () => {
    render(<BuildOrderStatus />);
    expect(screen.getByText('Contact Support')).toBeTruthy();
  });

  it('shows ready for pickup button for ready orders', () => {
    render(<BuildOrderStatus />);
    
    // Click on an order with "ready" status
    const orderTwo = screen.getByText('ORD-2026-002');
    fireEvent.click(orderTwo);
    
    expect(screen.getByText('Confirm Pickup')).toBeTruthy();
  });
});
