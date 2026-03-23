import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/services/api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get('search') ?? undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 20;

  try {
    const products = await fetchProducts({ search, limit });
    return NextResponse.json(products);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load products';
    const status = message.includes('Unauthorized') ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
