import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header/Header';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'MBST | Smartphone Catalog',
  description: 'Browse and purchase the latest smartphones from top brands.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
