import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ColorSelector } from './ColorSelector';

const options = [
  { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.jpg' },
  { name: 'White', hexCode: '#ffffff', imageUrl: 'https://example.com/white.jpg' },
  { name: 'Blue', hexCode: '#0000ff', imageUrl: 'https://example.com/blue.jpg' },
];

describe('ColorSelector', () => {
  it('renders all color options', () => {
    render(<ColorSelector options={options} selected={null} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: /black/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /white/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /blue/i })).toBeInTheDocument();
  });

  it('calls onChange when color is clicked', () => {
    const onChange = jest.fn();
    render(<ColorSelector options={options} selected={null} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /blue/i }));
    expect(onChange).toHaveBeenCalledWith(options[2]);
  });

  it('marks selected color with aria-pressed true', () => {
    render(<ColorSelector options={options} selected={options[0]} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: /black/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('non-selected colors have aria-pressed false', () => {
    render(<ColorSelector options={options} selected={options[0]} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: /white/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders section label', () => {
    render(<ColorSelector options={options} selected={null} onChange={jest.fn()} />);
    expect(screen.getByText(/COLOR/i)).toBeInTheDocument();
  });
});
