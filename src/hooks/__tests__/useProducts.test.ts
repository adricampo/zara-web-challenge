import { act, renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';
import * as api from '@/services/api';

jest.mock('@/services/api');
jest.useFakeTimers();

const mockProducts = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: 'https://example.com/1.jpg' },
  { id: '2', brand: 'Samsung', name: 'Galaxy S24', basePrice: 899, imageUrl: 'https://example.com/2.jpg' },
];

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('starts with loading state', () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);
  });

  it('loads products on mount', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.total).toBe(2);
    expect(result.current.error).toBeNull();
  });

  it('calls API with limit=20 by default', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.fetchProducts).toHaveBeenCalledWith({ limit: 20, search: undefined });
  });

  it('debounces search and calls API', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSearch('iPhone');
    });

    act(() => jest.advanceTimersByTime(100));
    expect(api.fetchProducts).toHaveBeenCalledTimes(1);

    act(() => jest.advanceTimersByTime(300));

    await waitFor(() => {
      expect(api.fetchProducts).toHaveBeenCalledWith({ limit: 20, search: 'iPhone' });
    });
  });

  it('handles API error gracefully', async () => {
    (api.fetchProducts as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.products).toEqual([]);
  });
});
