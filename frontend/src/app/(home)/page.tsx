'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('fromHome', 'true');
    router.push('/moon');
  }, [router]);

  return <><LoadingScreen isLoading={true}/></>;
}
