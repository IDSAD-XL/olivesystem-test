import { NextResponse } from 'next/server';

async function searchDomainServer(domain: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const url = `${API_URL}/leaked_creds/_search?domain=${encodeURIComponent(domain)}&size=10000&page=1`;
  console.log(url);
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

  const data = await response.json();

  console.log(data);

  if (!Array.isArray(data) || data?.length === 0) {
    throw new Error('No data found');
  }

  return data[0];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain not specified' },
      { status: 400 },
    );
  }

  try {
    const result = await searchDomainServer(domain);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
