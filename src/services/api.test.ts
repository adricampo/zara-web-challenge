import { fetchProducts, fetchProductById } from './api';

const mockProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone.jpg',
};

const mockProductDetail = {
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

global.fetch = jest.fn();

describe('fetchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products with default limit of 20', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockProduct],
    });

    const result = await fetchProducts();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products?limit=20'),
      expect.objectContaining({
        headers: expect.objectContaining({ 'x-api-key': expect.any(String) }),
      })
    );
    expect(result).toEqual([mockProduct]);
  });

  it('fetches products with search param', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockProduct],
    });

    await fetchProducts({ search: 'iPhone' });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('search=iPhone'),
      expect.any(Object)
    );
  });

  it('fetches products with custom limit and offset', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await fetchProducts({ limit: 10, offset: 20 });

    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain('limit=10');
    expect(url).toContain('offset=20');
  });

  it('throws on 401 error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(fetchProducts()).rejects.toThrow('Unauthorized: Invalid API key');
  });

  it('throws on 404 error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchProducts()).rejects.toThrow('Not found');
  });

  it('throws on generic API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchProducts()).rejects.toThrow('API error: 500');
  });
});

describe('fetchProductById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches product by id', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProductDetail,
    });

    const result = await fetchProductById('1');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/1'),
      expect.objectContaining({
        headers: expect.objectContaining({ 'x-api-key': expect.any(String) }),
      })
    );
    expect(result).toEqual(mockProductDetail);
  });

  it('throws on 404 when product not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchProductById('nonexistent')).rejects.toThrow('Not found');
  });

  it('throws on 401 error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(fetchProductById('1')).rejects.toThrow('Unauthorized: Invalid API key');
  });
});
