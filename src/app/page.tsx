'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import DomainTable from '@/components/DomainTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DomainDataResponse } from '@/types/domain-data.dto';
import { toast } from '@/hooks/use-toast';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';

export default function Home() {
  const [domain, setDomain] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('search');

  const [tableData, setTableData] = useState<DomainDataResponse | null>(null);

  const { data, error, isLoading } = useSWR<DomainDataResponse>(
    query ? `/api/domain?domain=${query}&page=${page}` : null,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!domain.trim()) {
        toast({
          title: 'Warning',
          description: 'Please enter a domain',
          variant: 'warning',
        });
        return;
      }
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('search', domain);
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [domain, searchParams],
  );

  return (
    <div className="min-h-screen bg-gray-950 p-3 md:p-8 text-white">
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
      {tableData?.entries?.length && !error && (
        <Card className="mt-4 p-4 flex flex-col gap-4">
          <PaginationWithLinks
            page={page}
            pageSize={100}
            totalCount={tableData.total}
          />
          <DomainTable data={tableData} isLoading={isLoading} />
          <PaginationWithLinks
            page={page}
            pageSize={100}
            totalCount={tableData.total}
          />
        </Card>
      )}
    </div>
  );
}
