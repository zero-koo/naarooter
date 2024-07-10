'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { usePathname } from 'next/navigation';

const SignIn = () => {
  const pathname = usePathname();

  return (
    <Link href={`/signin?redirect=${pathname}`}>
      <Button size="sm">로그인</Button>
    </Link>
  );
};

export default SignIn;
