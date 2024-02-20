import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table/Table';
import * as hooks from '../hooks';
import { mockData } from './testData/mockData';

// Mock the hooks
jest.mock('../hooks', () => ({
    useTableData: jest.fn(),
    useSort: jest.fn()
  }));


describe('Financial Instruments test cases', () => {
    
beforeEach(() => {
  
    (hooks.useTableData as jest.Mock).mockReturnValue({
      data: mockData,
      InstrumentsData: jest.fn(() => Promise.resolve(mockData)),
    });
  
    (hooks.useSort as jest.Mock).mockImplementation(data => ({
      sortedData: data,
      toggleSort: jest.fn(),
      sortConfig: { assetClass: 'none', price: 'none', ticker: 'none' },
    }));
  });

afterEach(() => {
    jest.clearAllMocks();
})

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
    
    const toggleSort = jest.fn();

    // Mock useTableData to return predefined data
    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        InstrumentsData: jest.fn(() => Promise.resolve(mockData)),
    });


    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort, 
        sortConfig: { assetClass: 'asc', price: 'none', ticker: 'none' },
    }));

    render(<Table />);


    const assetClassHeader = screen.getByText(/Asset Class/); 
    fireEvent.click(assetClassHeader);

    expect(toggleSort).toHaveBeenCalledWith('assetClass');
});

test('sorts by price on column header click', async () => {
    const toggleSort = jest.fn();

    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        InstrumentsData: jest.fn(() => Promise.resolve(mockData)),
    });

    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort,
        sortConfig: { assetClass: 'none', price: 'asc', ticker: 'none' },
    }));

    render(<Table />);

    const assetClassHeader = screen.getByText(/Price/); 
    fireEvent.click(assetClassHeader);

    expect(toggleSort).toHaveBeenCalledWith('price');
});


test('sorts by ticker on column header click', async () => {
    
    const toggleSort = jest.fn();

    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        InstrumentsData: jest.fn(() => Promise.resolve(mockData)),
    });


    (hooks.useSort as jest.Mock).mockImplementation(() => ({
        sortedData: mockData,
        toggleSort, 
        sortConfig: { assetClass: 'none', price: 'desc', ticker: 'asc' },
    }));

    render(<Table />);

    const assetClassHeader = screen.getByText(/Ticker/); 
    fireEvent.click(assetClassHeader);
    expect(toggleSort).toHaveBeenCalledWith('ticker');
});


test('renders negative price values with negativePrice class', async () => {
    const mockData = [
        { assetClass: 'Equities', price: 120, ticker: 'ALPHA' },
        { assetClass: 'Credit', price: -100, ticker: 'BETA' }
    ];

    (hooks.useTableData as jest.Mock).mockReturnValue({
        data: mockData,
        InstrumentsData: jest.fn(() => Promise.resolve(mockData)),
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