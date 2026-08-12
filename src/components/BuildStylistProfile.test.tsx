import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BuildStylistProfile from './BuildStylistProfile';

describe('BuildStylistProfile', () => {
  it('renders without crashing', () => {
    render(<BuildStylistProfile />);
    expect(document.body).toBeTruthy();
  });

  it('displays stylist name and title', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('Sarah Johnson')).toBeTruthy();
    expect(screen.getByText('Master Hair Stylist')).toBeTruthy();
  });

  it('displays rating and review count', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('4.9')).toBeTruthy();
    expect(screen.getByText('(127 reviews)')).toBeTruthy();
  });

  it('displays all specialties', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('Specialties')).toBeTruthy();
    expect(screen.getByText('Hair Coloring')).toBeTruthy();
    expect(screen.getAllByText('Balayage').length).toBeGreaterThan(0);
    expect(screen.getByText('Haircuts')).toBeTruthy();
    expect(screen.getByText('Styling')).toBeTruthy();
    expect(screen.getAllByText('Hair Extensions').length).toBeGreaterThan(0);
  });

  it('displays all services with prices', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('Services')).toBeTruthy();
    expect(screen.getByText('Haircut & Style')).toBeTruthy();
    expect(screen.getByText('$65')).toBeTruthy();
    expect(screen.getByText('Full Color')).toBeTruthy();
    expect(screen.getByText('$150')).toBeTruthy();
    expect(screen.getAllByText('Balayage').length).toBeGreaterThan(0);
    expect(screen.getByText('$220')).toBeTruthy();
    expect(screen.getByText('Blowout')).toBeTruthy();
    expect(screen.getByText('$45')).toBeTruthy();
    expect(screen.getAllByText('Hair Extensions').length).toBeGreaterThan(0);
    expect(screen.getByText('$350')).toBeTruthy();
  });

  it('displays working hours', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('Working Hours')).toBeTruthy();
    expect(screen.getByText('Monday')).toBeTruthy();
    expect(screen.getAllByText('9:00 AM - 6:00 PM').length).toBeGreaterThan(0);
    expect(screen.getByText('Sunday')).toBeTruthy();
    expect(screen.getByText('Closed')).toBeTruthy();
  });

  it('displays client reviews', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText('Client Reviews')).toBeTruthy();
    expect(screen.getByText('Emily Chen')).toBeTruthy();
    expect(screen.getByText('Michelle Rodriguez')).toBeTruthy();
    expect(screen.getByText('Jessica Williams')).toBeTruthy();
    expect(screen.getByText('Amanda Thompson')).toBeTruthy();
    expect(screen.getByText('Lauren Davis')).toBeTruthy();
  });

  it('displays book appointment button', () => {
    render(<BuildStylistProfile />);
    expect(screen.getByText(/Book Appointment with Sarah Johnson/)).toBeTruthy();
  });
});
