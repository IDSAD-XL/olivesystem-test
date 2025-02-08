'use client';

import { useState } from 'react';
import useSWR from 'swr';
import DomainCard from '@/components/DomainCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Определяем типы данных
export interface Credential {
  username: string;
  password?: string;
  credential_category?: string;
}

export interface DomainData {
  url: string;
  creds: Credential[];
  root_domain: string;
  email_domains: string[];
}

// Функция для получения данных через fetch
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [domain, setDomain] = useState('');
  const [query, setQuery] = useState('');

  // SWR выполняет запрос к внутреннему API‑маршруту
  const { data, error, isLoading } = useSWR<DomainData>(
    query ? `/api/domain?domain=${query}` : null,
    fetcher,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim()) {
      alert('Введите домен для поиска.');
      return;
    }
    setQuery(domain.trim());
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Search domain information
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-8 flex flex-col gap-4"
          >
            <Input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain"
              className="w-full"
            />
            <Button loading={isLoading} disabled={isLoading}>
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      {error && (
        <p className="text-center text-red-500 mb-4">
          {error.error || 'An error occurred.'}
        </p>
      )}
      {data && !error && <DomainCard data={data} />}
    </div>
  );
}
