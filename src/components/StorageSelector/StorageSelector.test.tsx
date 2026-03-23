import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { StorageSelector } from './StorageSelector';

const options = [
  { capacity: '128 GB', price: 999 },
  { capacity: '256 GB', price: 1099 },
  { capacity: '512 GB', price: 1299 },
];

describe('StorageSelector', () => {
  it('renders all storage options', () => {
    render(<StorageSelector options={options} selected={null} onChange={jest.fn()} />);
    expect(screen.getByText('128 GB')).toBeInTheDocument();
    expect(screen.getByText('256 GB')).toBeInTheDocument();
    expect(screen.getByText('512 GB')).toBeInTheDocument();
  });

  it('calls onChange when option is clicked', () => {
    const onChange = jest.fn();
    render(<StorageSelector options={options} selected={null} onChange={onChange} />);

    fireEvent.click(screen.getByText('256 GB'));
    expect(onChange).toHaveBeenCalledWith({ capacity: '256 GB', price: 1099 });
  });

  it('marks selected option with aria-pressed', () => {
    render(<StorageSelector options={options} selected={options[1]} onChange={jest.fn()} />);
    const selectedBtn = screen.getByRole('button', { name: /256 GB/i });
    expect(selectedBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('other options have aria-pressed false', () => {
    render(<StorageSelector options={options} selected={options[1]} onChange={jest.fn()} />);
    const notSelectedBtn = screen.getByRole('button', { name: /128 GB/i });
    expect(notSelectedBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders section label', () => {
    render(<StorageSelector options={options} selected={null} onChange={jest.fn()} />);
    expect(screen.getByText(/STORAGE/i)).toBeInTheDocument();
  });
});
