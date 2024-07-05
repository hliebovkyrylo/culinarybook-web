import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useInfiniteScroll = (newItems: any, setItems: any, numberOfItems: number, setPage: any, setIsLoading: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (newItems) {
      setItems((prevItems: any) => {
        const uniqueNewItems = newItems.filter(
          (newItem: any) => !prevItems.some((prevItem: any) => prevItem.id === newItem.id)
        );

        return [...prevItems, ...uniqueNewItems];
      });
    }
  }, [newItems])

  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 150) {
      if (newItems && newItems.length === numberOfItems) {
        setIsLoading(true);
        setPage((prevPage: number) => prevPage + 1);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      if (scrollTop < lastScrollTop) {
        dispatch({ type: 'recipes/cancel' });
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [newItems]);
}
