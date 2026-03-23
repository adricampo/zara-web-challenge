import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';
import { CartProvider } from '@/context/CartContext';

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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('Header', () => {
  it('renders logo with link to home', () => {
    render(<Header />, { wrapper });
    const logo = screen.getByRole('link', { name: /mbst/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders cart link', () => {
    render(<Header />, { wrapper });
    const cartLink = screen.getByRole('link', { name: /shopping cart/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('does not show badge when cart is empty', () => {
    render(<Header />, { wrapper });
    const badge = screen.queryByText(/^\d+$/);
    expect(badge).not.toBeInTheDocument();
  });

  it('has proper header landmark', () => {
    render(<Header />, { wrapper });
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has navigation landmark', () => {
    render(<Header />, { wrapper });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
