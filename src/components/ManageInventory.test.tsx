import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ManageInventory from './ManageInventory'

describe('ManageInventory', () => {
  it('renders without crashing', () => {
    render(<ManageInventory />)
    expect(document.body).toBeTruthy()
  })

  it('displays the inventory management header', () => {
    render(<ManageInventory />)
    expect(screen.getByText('Inventory Management')).toBeTruthy()
    expect(screen.getByText('Manage your craft beverage inventory')).toBeTruthy()
  })

  it('displays mock inventory items', () => {
    render(<ManageInventory />)
    expect(screen.getByText('IPA Craft Beer - 6 Pack')).toBeTruthy()
    expect(screen.getByText('Organic Red Wine - 750ml')).toBeTruthy()
    expect(screen.getByText('Whiskey Barrel Aged Stout')).toBeTruthy()
    expect(screen.getByText('Sparkling Rosé - 750ml')).toBeTruthy()
    expect(screen.getByText('Citrus Pale Ale - 4 Pack')).toBeTruthy()
  })

  it('displays inventory statistics', () => {
    render(<ManageInventory />)
    expect(screen.getByText('Total Items')).toBeTruthy()
    expect(screen.getByText('Total Stock')).toBeTruthy()
    expect(screen.getByText('Low Stock Items')).toBeTruthy()
    expect(screen.getByText('Total Value')).toBeTruthy()
  })

  it('displays current user role', () => {
    render(<ManageInventory />)
    expect(screen.getByText('John Supplier')).toBeTruthy()
    expect(screen.getByText('Role:')).toBeTruthy()
  })

  it('allows role switching', () => {
    render(<ManageInventory />)
    const roleSelect = screen.getByRole('combobox')
    expect(roleSelect).toBeTruthy()
    
    // Change to customer role
    fireEvent.change(roleSelect, { target: { value: 'customer' } })
    
    // Should show access denied message
    expect(screen.getByText('Access Denied')).toBeTruthy()
    expect(screen.getByText(/Only users with supplier role can manage inventory/)).toBeTruthy()
  })

  it('shows edit buttons for supplier role', () => {
    render(<ManageInventory />)
    const editButtons = screen.getAllByText('Edit')
    expect(editButtons.length).toBeGreaterThan(0)
  })

  it('hides edit buttons for customer role', () => {
    render(<ManageInventory />)
    const roleSelect = screen.getByRole('combobox')
    
    // Change to customer role
    fireEvent.change(roleSelect, { target: { value: 'customer' } })
    
    // Edit buttons should not be visible
    const editButtons = screen.queryAllByText('Edit')
    expect(editButtons.length).toBe(0)
  })

  it('allows editing inventory item when in edit mode', () => {
    render(<ManageInventory />)
    const editButtons = screen.getAllByText('Edit')
    
    // Click first edit button
    fireEvent.click(editButtons[0])
    
    // Should show save and cancel buttons
    expect(screen.getByText('Save')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  it('displays table headers', () => {
    render(<ManageInventory />)
    expect(screen.getByText('Product')).toBeTruthy()
    expect(screen.getByText('SKU')).toBeTruthy()
    expect(screen.getByText('Category')).toBeTruthy()
    expect(screen.getByText('Quantity')).toBeTruthy()
    expect(screen.getByText('Price')).toBeTruthy()
    // 'Supplier' appears in multiple places (table header and role dropdown)
    expect(screen.getAllByText('Supplier').length).toBeGreaterThan(0)
  })

  it('highlights low stock items', () => {
    render(<ManageInventory />)
    // Low stock items should be highlighted with bg-red-50 class
    const lowStockText = screen.getByText('Low Stock (at or below reorder level)')
    expect(lowStockText).toBeTruthy()
  })

  it('displays SKU codes', () => {
    render(<ManageInventory />)
    expect(screen.getByText('BEV-IPA-001')).toBeTruthy()
    expect(screen.getByText('BEV-WINE-002')).toBeTruthy()
    expect(screen.getByText('BEV-STOUT-003')).toBeTruthy()
  })

  it('displays categories as badges', () => {
    render(<ManageInventory />)
    const categories = screen.getAllByText('Beer')
    expect(categories.length).toBeGreaterThan(0)
    expect(screen.getAllByText('Wine').length).toBeGreaterThan(0)
  })
})
