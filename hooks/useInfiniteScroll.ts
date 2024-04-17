import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { IAppState } from '@/lib/store'; // Путь к вашему AppState

interface IUseInfiniteScroll<T> {
  data: T[];
  isLoading: boolean;
  handleScroll: () => void;
}

export function useInfiniteScroll<T>(
  searchParam: string,
  getDataQuery: (params: string) => { data: T[]; isLoading: boolean },
  initialData: T[]
): IUseInfiniteScroll<T> {
  const searchParams = useSearchParams();
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const search = searchParams.get(searchParam);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>(initialData);

  const { data: newData, isLoading } = getDataQuery(search as string);

  useEffect(() => {
    if (newData) {
      setData((prevData) => [...prevData, ...newData]);
    }
  }, [newData]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { data: accessToken ? data : initialData, isLoading, handleScroll };
}
