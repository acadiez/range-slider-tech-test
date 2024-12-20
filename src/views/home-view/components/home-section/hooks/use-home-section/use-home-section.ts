import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface UseHomeSectionProps {
  redirect: string;
}

export const useHomeSection = ({ redirect }: UseHomeSectionProps) => {
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    router.push(redirect);
  }, [redirect, router]);

  return {
    methods: { handleRedirect },
  };
};
