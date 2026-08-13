import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CreateDatabaseSchema from './CreateDatabaseSchema';

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />);
    expect(document.body).toBeTruthy();
  });

  it('displays the main title and description', () => {
    render(<CreateDatabaseSchema />);
    expect(screen.getByText('Dental Clinic Database Schema')).toBeInTheDocument();
    expect(
      screen.getByText('Comprehensive database design for patient management and appointments')
    ).toBeInTheDocument();
  });

  it('displays schema statistics', () => {
    render(<CreateDatabaseSchema />);
    expect(screen.getByText('Total Tables')).toBeInTheDocument();
    expect(screen.getByText('Total Columns')).toBeInTheDocument();
    expect(screen.getByText('Foreign Keys')).toBeInTheDocument();
    expect(screen.getByText('Total Indexes')).toBeInTheDocument();
  });

  it('displays all tables in grid view', () => {
    render(<CreateDatabaseSchema />);
    expect(screen.getByText('patients')).toBeInTheDocument();
    expect(screen.getByText('dentists')).toBeInTheDocument();
    expect(screen.getByText('appointments')).toBeInTheDocument();
    expect(screen.getByText('treatments')).toBeInTheDocument();
    expect(screen.getByText('patient_treatments')).toBeInTheDocument();
    expect(screen.getByText('medical_history')).toBeInTheDocument();
    expect(screen.getByText('billing')).toBeInTheDocument();
  });

  it('switches between grid and detail view', () => {
    render(<CreateDatabaseSchema />);
    
    const detailViewButton = screen.getByText('Detail View');
    fireEvent.click(detailViewButton);
    
    expect(screen.getByText('Select Table')).toBeInTheDocument();
    
    const gridViewButton = screen.getByText('Grid View');
    fireEvent.click(gridViewButton);
    
    // Grid view should show table cards
    expect(screen.getByText('Patient records and contact information')).toBeInTheDocument();
  });

  it('shows table details when selected in detail view', () => {
    render(<CreateDatabaseSchema />);
    
    // Switch to detail view
    const detailViewButton = screen.getByText('Detail View');
    fireEvent.click(detailViewButton);
    
    // Select a table
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'patients' } });
    
    // Check for column details
    expect(screen.getByText('Columns')).toBeInTheDocument();
    expect(screen.getByText('Indexes')).toBeInTheDocument();
  });

  it('displays correct number of tables in statistics', () => {
    render(<CreateDatabaseSchema />);
    // Should show 7 tables
    const tableCount = screen.getByText('7');
    expect(tableCount).toBeInTheDocument();
  });

  it('shows table descriptions in grid view', () => {
    render(<CreateDatabaseSchema />);
    expect(screen.getByText('Patient records and contact information')).toBeInTheDocument();
    expect(screen.getByText('Dental practitioners and their specializations')).toBeInTheDocument();
    expect(screen.getByText('Scheduled appointments between patients and dentists')).toBeInTheDocument();
  });
});
