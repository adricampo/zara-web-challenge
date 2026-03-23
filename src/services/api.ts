import { ProductEntity, ProductListEntity } from '@/types';

const BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_KEY = process.env.API_KEY || '';

const DEFAULT_HEADERS: HeadersInit = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      ...DEFAULT_HEADERS,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Invalid API key');
    }
    if (response.status === 404) {
      throw new Error('Not found');
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export interface FetchProductsParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductListEntity[]> {
  const { search, limit = 20, offset } = params;
  const query = new URLSearchParams();

  if (search) query.set('search', search);
  query.set('limit', String(limit));
  if (offset !== undefined) query.set('offset', String(offset));

  const queryString = query.toString();
  const path = `/products${queryString ? `?${queryString}` : ''}`;

  return apiFetch<ProductListEntity[]>(path);
}

export async function fetchProductById(id: string): Promise<ProductEntity> {
  return apiFetch<ProductEntity>(`/products/${id}`);
}
