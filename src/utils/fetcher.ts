import { toast } from '@/hooks/use-toast';

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    toast({
      title: 'Error',
      description: (errorData.error as Error)?.message || 'An error occurred',
      variant: 'destructive',
    });
    throw new Error(errorData.error || 'An error occurred');
  }
  return res.json();
};
