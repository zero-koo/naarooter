'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const socialLogin = (
  site: Parameters<typeof signIn>[0],
  {
    redirect = true,
    redirectTo,
  }: {
    redirect?: boolean;
    redirectTo?: string;
  }
) => {
  return signIn(site, {
    redirect,
    redirectTo: redirectTo ?? DEFAULT_LOGIN_REDIRECT,
  });
};
