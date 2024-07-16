'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../ui/Button';

const SignIn = () => {
  const pathname = usePathname();

  return (
    <Link href={`/signin?redirect=${pathname}`}>
      <Button size="sm">로그인</Button>
    </Link>
  );
};

export default SignIn;
