import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProductGrid } from './ProductGrid';

jest.mock('next/link', () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return function Image({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  };
});

const mockProducts = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 999,
    imageUrl: 'https://example.com/1.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 899,
    imageUrl: 'https://example.com/2.jpg',
  },
];

describe('ProductGrid', () => {
  it('renders list of products', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('IPHONE 15')).toBeInTheDocument();
    expect(screen.getByText('GALAXY S24')).toBeInTheDocument();
  });

  it('renders correct number of product cards', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('returns null when products array is empty', () => {
    const { container } = render(<ProductGrid products={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders as list element', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
