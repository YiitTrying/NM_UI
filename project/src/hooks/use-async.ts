import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  errorMessage?: string;
}

export function useAsync<T>(
  asyncFn: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        const data = await asyncFn(...args);
        options.onSuccess?.(data);
        return data;
      } catch (error) {
        const errorMessage = options.errorMessage || 'An error occurred';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        options.onError?.(error as Error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn, options, toast]
  );

  return { execute, isLoading };
}