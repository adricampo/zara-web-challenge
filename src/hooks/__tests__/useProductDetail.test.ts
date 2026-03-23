import { renderHook, waitFor } from '@testing-library/react';
import { useProductDetail } from '../useProductDetail';
import * as api from '@/services/api';

jest.mock('@/services/api');

const mockProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'The latest iPhone',
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
  colorOptions: [{ name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.jpg' }],
  storageOptions: [{ capacity: '128 GB', price: 999 }],
  similarProducts: [],
};

describe('useProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchProductById as jest.Mock).mockResolvedValue(mockProduct);
  });

  it('starts with loading state', () => {
    const { result } = renderHook(() => useProductDetail('1'));
    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeNull();
  });

  it('loads product by id', async () => {
    const { result } = renderHook(() => useProductDetail('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
  });

  it('calls API with correct id', async () => {
    const { result } = renderHook(() => useProductDetail('abc123'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(api.fetchProductById).toHaveBeenCalledWith('abc123');
  });

  it('handles API error', async () => {
    (api.fetchProductById as jest.Mock).mockRejectedValueOnce(new Error('Not found'));
    const { result } = renderHook(() => useProductDetail('bad-id'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Not found');
    expect(result.current.product).toBeNull();
  });

  it('does not fetch when id is empty', () => {
    renderHook(() => useProductDetail(''));
    expect(api.fetchProductById).not.toHaveBeenCalled();
  });
});
