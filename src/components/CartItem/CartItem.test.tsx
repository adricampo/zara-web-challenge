import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CartItem } from './CartItem';

jest.mock('next/image', () => {
  return function Image({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  };
});

const mockItem = {
  id: 'cart-1',
  productId: '1',
  name: 'iPhone 15',
  brand: 'Apple',
  imageUrl: 'https://example.com/black.jpg',
  selectedColor: { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.jpg' },
  selectedStorage: { capacity: '256 GB', price: 1099 },
  price: 1099,
};

describe('CartItem', () => {
  it('renders product name and brand', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText(/Apple iPhone 15/i)).toBeInTheDocument();
  });

  it('renders selected specs', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText(/256 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/Black/i)).toBeInTheDocument();
  });

  it('renders price with EUR', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText('1099 EUR')).toBeInTheDocument();
  });

  it('renders remove button', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', () => {
    const onRemove = jest.fn();
    render(<CartItem item={mockItem} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledWith('cart-1');
  });

  it('renders product image with alt text', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByAltText('Apple iPhone 15')).toBeInTheDocument();
  });
});
