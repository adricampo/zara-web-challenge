import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CartPageClient } from './CartPageClient';
import { CartProvider } from '@/context/CartContext';
import { act } from '@testing-library/react';

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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartPageClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders empty cart message', () => {
    render(<CartPageClient />, { wrapper });
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('renders CONTINUE SHOPPING link when empty', () => {
    render(<CartPageClient />, { wrapper });
    const link = screen.getByRole('link', { name: /continue shopping/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows CART (0) heading when empty', () => {
    render(<CartPageClient />, { wrapper });
    expect(screen.getByText('CART (0)')).toBeInTheDocument();
  });

  it('renders cart items when cart has products', () => {
    localStorage.setItem(
      'zara_cart',
      JSON.stringify([
        {
          id: 'cart-1',
          productId: '1',
          name: 'iPhone 15',
          brand: 'Apple',
          imageUrl: 'https://example.com/img.jpg',
          selectedColor: {
            name: 'Black',
            hexCode: '#000',
            imageUrl: 'https://example.com/img.jpg',
          },
          selectedStorage: { capacity: '128 GB', price: 999 },
          price: 999,
        },
      ])
    );

    render(<CartPageClient />, { wrapper });
    expect(screen.getByText(/CART \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/APPLE IPHONE 15/i)).toBeInTheDocument();
    expect(screen.getAllByText('999 EUR').length).toBeGreaterThanOrEqual(1);
  });

  it('shows total price', () => {
    localStorage.setItem(
      'zara_cart',
      JSON.stringify([
        {
          id: 'cart-1',
          productId: '1',
          name: 'iPhone 15',
          brand: 'Apple',
          imageUrl: 'https://example.com/img.jpg',
          selectedColor: {
            name: 'Black',
            hexCode: '#000',
            imageUrl: 'https://example.com/img.jpg',
          },
          selectedStorage: { capacity: '128 GB', price: 999 },
          price: 999,
        },
      ])
    );

    render(<CartPageClient />, { wrapper });
    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();
    expect(screen.getAllByText('999 EUR').length).toBeGreaterThanOrEqual(1);
  });

  it('removes item when delete button clicked', () => {
    localStorage.setItem(
      'zara_cart',
      JSON.stringify([
        {
          id: 'cart-1',
          productId: '1',
          name: 'iPhone 15',
          brand: 'Apple',
          imageUrl: 'https://example.com/img.jpg',
          selectedColor: {
            name: 'Black',
            hexCode: '#000',
            imageUrl: 'https://example.com/img.jpg',
          },
          selectedStorage: { capacity: '128 GB', price: 999 },
          price: 999,
        },
      ])
    );

    render(<CartPageClient />, { wrapper });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
