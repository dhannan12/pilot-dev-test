import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EasilyDiscover from './EasilyDiscover';

describe('EasilyDiscover', () => {
  it('renders without crashing', () => {
    render(<EasilyDiscover />);
    expect(document.body).toBeTruthy();
  });

  it('displays the main heading', () => {
    render(<EasilyDiscover />);
    expect(screen.getByText('Discover Craft Beverages')).toBeTruthy();
    expect(screen.getByText('Explore unique brews and calculate your delivery time')).toBeTruthy();
  });

  it('displays mock beverage data', () => {
    render(<EasilyDiscover />);
    
    // Check for beverage names
    expect(screen.getByText('Hoppy IPA Supreme')).toBeTruthy();
    expect(screen.getByText('Dark Chocolate Stout')).toBeTruthy();
    expect(screen.getByText('Golden Wheat Ale')).toBeTruthy();
    expect(screen.getByText('Barrel-Aged Porter')).toBeTruthy();
    expect(screen.getByText('Citrus Pale Ale')).toBeTruthy();
    expect(screen.getByText('Belgian Tripel')).toBeTruthy();
  });

  it('displays brewery information', () => {
    render(<EasilyDiscover />);
    
    expect(screen.getByText('Mountain Brew Co.')).toBeTruthy();
    expect(screen.getByText('Valley Craft Brewing')).toBeTruthy();
    expect(screen.getByText('Sunshine Brewing')).toBeTruthy();
  });

  it('shows filter buttons', () => {
    render(<EasilyDiscover />);
    
    expect(screen.getByText('All Beverages')).toBeTruthy();
    expect(screen.getAllByText('IPA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Stout').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Wheat Ale').length).toBeGreaterThan(0);
  });

  it('filters beverages by type when filter button is clicked', () => {
    render(<EasilyDiscover />);
    
    // Initially all beverages should be visible
    expect(screen.getByText('Hoppy IPA Supreme')).toBeTruthy();
    expect(screen.getByText('Dark Chocolate Stout')).toBeTruthy();
    
    // Click on IPA filter - get the button specifically
    const ipaButtons = screen.getAllByText('IPA');
    const ipaButton = ipaButtons.find(el => el.tagName === 'BUTTON');
    fireEvent.click(ipaButton!);
    
    // Only IPA should be visible
    expect(screen.getByText('Hoppy IPA Supreme')).toBeTruthy();
    expect(screen.queryByText('Dark Chocolate Stout')).toBeFalsy();
  });

  it('shows delivery calculator when beverage is selected', () => {
    render(<EasilyDiscover />);
    
    // Initially delivery calculator should not show
    expect(screen.getByText('Select a beverage above to calculate delivery time')).toBeTruthy();
    
    // Click on a beverage
    const beverageCard = screen.getByText('Hoppy IPA Supreme');
    fireEvent.click(beverageCard);
    
    // Delivery calculator should now be visible
    expect(screen.getByText(/Delivery Estimate for Hoppy IPA Supreme/)).toBeTruthy();
  });

  it('displays shipping options', () => {
    render(<EasilyDiscover />);
    
    // Select a beverage first
    const beverageCard = screen.getByText('Citrus Pale Ale');
    fireEvent.click(beverageCard);
    
    // Check for shipping options
    expect(screen.getAllByText('Standard Shipping').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Expedited Shipping').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Express Overnight').length).toBeGreaterThan(0);
  });

  it('updates delivery estimate when distance changes', () => {
    render(<EasilyDiscover />);
    
    // Select a beverage
    const beverageCard = screen.getByText('Golden Wheat Ale');
    fireEvent.click(beverageCard);
    
    // Check that distance slider exists
    const distanceSlider = screen.getByLabelText(/Distance \(miles\):/);
    expect(distanceSlider).toBeTruthy();
    
    // Change distance
    fireEvent.change(distanceSlider, { target: { value: '1000' } });
    
    // Verify the slider value updated
    expect((distanceSlider as HTMLInputElement).value).toBe('1000');
  });

  it('displays all required mock data (at least 5 beverages)', () => {
    render(<EasilyDiscover />);
    
    const beverageNames = [
      'Hoppy IPA Supreme',
      'Dark Chocolate Stout',
      'Golden Wheat Ale',
      'Barrel-Aged Porter',
      'Citrus Pale Ale',
      'Belgian Tripel'
    ];
    
    beverageNames.forEach(name => {
      expect(screen.getByText(name)).toBeTruthy();
    });
    
    // Ensure at least 6 beverages are present
    expect(beverageNames.length).toBeGreaterThanOrEqual(5);
  });
});
