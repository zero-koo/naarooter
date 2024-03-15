import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useURLSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getSearchParams = (key: string) => {
    return searchParams?.get(key);
  };

  const setSearchParams = (key: string, value: string) => {
    router.push(
      `${pathname}?${new URLSearchParams({ [key]: value }).toString()}`
    );
  };

  const deleteSearchParams = (key: string) => {
    const urLSearchParams = new URLSearchParams(searchParams?.toString());
    urLSearchParams.delete(key);
    router.push(`${pathname}?${urLSearchParams.toString()}`);
  };

  return {
    getSearchParams,
    setSearchParams,
    deleteSearchParams,
  };
};
