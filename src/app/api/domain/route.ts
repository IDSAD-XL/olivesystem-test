import { NextResponse } from 'next/server';
import { DomainDataResponse } from '@/types/domain-data.dto';

async function searchDomainServer(
  domain: string,
  size: number = 100,
  page: number = 1,
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const url = `${API_URL}/leaked_creds/_search?domain=${encodeURIComponent(domain)}&size=${size}&page=${page}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error during request');
  }

  const data: DomainDataResponse = await response.json();

  if (!Array.isArray(data?.entries)) {
    throw new Error('No data found');
  }

  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const size = Number(searchParams.get('size')) || 100;
  const page = Number(searchParams.get('page')) || 1;

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain not specified' },
      { status: 400 },
    );
  }

  try {
    const result = await searchDomainServer(domain, size, page);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
