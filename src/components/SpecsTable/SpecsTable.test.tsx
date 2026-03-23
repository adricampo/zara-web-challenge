import { render, screen } from '@testing-library/react';
import React from 'react';
import { SpecsTable } from './SpecsTable';

const mockProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'The latest iPhone with A16 Bionic chip.',
  basePrice: 999,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556x1179',
    processor: 'A16 Bionic',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3279mAh',
    os: 'iOS 17',
    screenRefreshRate: '60Hz',
  },
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
};

describe('SpecsTable', () => {
  it('renders SPECIFICATIONS heading', () => {
    render(<SpecsTable product={mockProduct} />);
    expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument();
  });

  it('renders brand row', () => {
    render(<SpecsTable product={mockProduct} />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renders processor row', () => {
    render(<SpecsTable product={mockProduct} />);
    expect(screen.getByText('PROCESSOR')).toBeInTheDocument();
    expect(screen.getByText('A16 Bionic')).toBeInTheDocument();
  });

  it('renders all 11 spec rows', () => {
    render(<SpecsTable product={mockProduct} />);
    const rows = screen.getAllByRole('term');
    expect(rows).toHaveLength(11);
  });

  it('renders as a section with aria-labelledby', () => {
    const { container } = render(<SpecsTable product={mockProduct} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'specs-heading');
  });
});
