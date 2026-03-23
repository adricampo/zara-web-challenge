import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProductCard } from './ProductCard';

jest.mock('next/link', () => {
  return function Link({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function Image({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

const mockProduct = {
  id: 'iphone-15',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone.jpg',
};

describe('ProductCard', () => {
  it('renders product brand in uppercase', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('APPLE')).toBeInTheDocument();
  });

  it('renders product name in uppercase', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('IPHONE 15')).toBeInTheDocument();
  });

  it('renders price with EUR currency', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
  });

  it('renders link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/iphone-15');
  });

  it('renders product image with alt text', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Apple iPhone 15');
  });

  it('renders as article element', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });
});
