import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<SearchBar value="" onChange={jest.fn()} total={20} />);
    expect(screen.getByPlaceholderText('Search for a smartphone...')).toBeInTheDocument();
  });

  it('shows results count', () => {
    render(<SearchBar value="" onChange={jest.fn()} total={15} />);
    expect(screen.getByText('15 RESULTS')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} total={20} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'iPhone' } });

    expect(onChange).toHaveBeenCalledWith('iPhone');
  });

  it('displays current value', () => {
    render(<SearchBar value="Samsung" onChange={jest.fn()} total={5} />);
    expect(screen.getByRole('searchbox')).toHaveValue('Samsung');
  });

  it('shows loading state', () => {
    render(<SearchBar value="" onChange={jest.fn()} total={0} loading />);
    expect(screen.getByText('LOADING...')).toBeInTheDocument();
  });

  it('has role search for accessibility', () => {
    render(<SearchBar value="" onChange={jest.fn()} total={20} />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('has aria-live region for results', () => {
    render(<SearchBar value="" onChange={jest.fn()} total={20} />);
    const results = screen.getByText('20 RESULTS');
    expect(results).toHaveAttribute('aria-live', 'polite');
  });
});
