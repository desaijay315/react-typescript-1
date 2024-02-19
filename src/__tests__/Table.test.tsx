import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table/Table';
import * as hooks from '../components/Table/hooks';
import { mockData } from './testData/mockData';

// Mock the hooks
jest.mock('../components/Table/hooks', () => ({
    useTableData: jest.fn(),
    useSort: jest.fn()
  }));


describe('Financial Instruments test cases', () => {
    
beforeEach(() => {
  
    (hooks.useTableData as jest.Mock).mockReturnValue({
      data: mockData,
      fetchData: jest.fn(() => Promise.resolve(mockData)),
    });
  
    (hooks.useSort as jest.Mock).mockImplementation(data => ({
      sortedData: data,
      toggleSort: jest.fn(),
      sortConfig: { assetClass: 'none', price: 'none', ticker: 'none' },
    }));
  });

test('table loads and displays data correctly', async () => {
  render(<Table />);

  expect(screen.getByText('ALPHA')).toBeInTheDocument();
  expect(screen.getByText('BETA')).toBeInTheDocument();
  expect(screen.getByText('GAMMA')).toBeInTheDocument();
  expect(screen.getByText('Equities')).toBeInTheDocument();
  expect(screen.getByText('Credit')).toBeInTheDocument();
  expect(screen.getByText('Macro')).toBeInTheDocument();
  expect(screen.getByText('3150.67')).toBeInTheDocument();
  expect(screen.getByText('3791.37')).toBeInTheDocument();
  expect(screen.getByText('2299.1')).toBeInTheDocument();

});

test('sorts by asset class on column header click', async () => {
    // Define toggleSort mock function
    const toggleSort = jest.fn();

    // Mock useTableData to return predefined data
    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        fetchData: jest.fn(() => Promise.resolve(mockData)),
    });

    // Important: Use the same toggleSort mock function in useSort mock
    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort, // Use the mock function defined above
        sortConfig: { assetClass: 'asc', price: 'none', ticker: 'none' },
    }));

    render(<Table />);

    // Simulate user clicking on the "Asset Class" column header
    const assetClassHeader = screen.getByText(/Asset Class/); // Adjusted for better targeting
    fireEvent.click(assetClassHeader);

    // Verify toggleSort was called with the correct argument
    expect(toggleSort).toHaveBeenCalledWith('assetClass');
});

test('sorts by price on column header click', async () => {
    // Define toggleSort mock function
    const toggleSort = jest.fn();

    // Mock useTableData to return predefined data
    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        fetchData: jest.fn(() => Promise.resolve(mockData)),
    });

    // Important: Use the same toggleSort mock function in useSort mock
    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort, // Use the mock function defined above
        sortConfig: { assetClass: 'none', price: 'asc', ticker: 'none' },
    }));

    render(<Table />);

    // Simulate user clicking on the "Asset Class" column header
    const assetClassHeader = screen.getByText(/Price/); // Adjusted for better targeting
    fireEvent.click(assetClassHeader);

    // Verify toggleSort was called with the correct argument
    expect(toggleSort).toHaveBeenCalledWith('price');
});


test('sorts by ticker on column header click', async () => {
    // Define toggleSort mock function
    const toggleSort = jest.fn();

    // Mock useTableData to return predefined data
    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        fetchData: jest.fn(() => Promise.resolve(mockData)),
    });

    // Important: Use the same toggleSort mock function in useSort mock
    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort, // Use the mock function defined above
        sortConfig: { assetClass: 'none', price: 'desc', ticker: 'asc' },
    }));

    render(<Table />);

    const assetClassHeader = screen.getByText(/Ticker/); // Adjusted for better targeting
    fireEvent.click(assetClassHeader);
    expect(toggleSort).toHaveBeenCalledWith('ticker');
});


test('renders negative price values with negativePrice class', async () => {
    const mockData = [
        { assetClass: 'Equities', price: 120, ticker: 'AAPL' },
        { assetClass: 'Credits', price: -100, ticker: 'GOOGL' } // Negative price
    ];

    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        fetchData: jest.fn(() => Promise.resolve(mockData)),
    });
    
    (hooks.useSort as jest.Mock).mockReturnValue({
        sortedData: mockData,
        toggleSort: jest.fn(),
        sortConfig: { assetClass: 'none', price: 'none', ticker: 'none' },
    });

    render(<Table />);

    const negativePriceCell = await screen.findByText('-100');
    expect(negativePriceCell).toHaveClass('negativePrice');
});



})