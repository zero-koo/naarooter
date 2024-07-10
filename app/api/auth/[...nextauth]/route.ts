import { NextRequest } from 'next/server';
import { handlers } from '@/auth';

import { naverFetchInterceptor } from './interceptor';

const { GET: AuthGET, POST: AuthPOST } = handlers;

export async function POST(req: NextRequest) {
  return await AuthPOST(req);
}

const originalFetch = fetch;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  if (url.pathname !== '/api/auth/callback/naver') {
    return await AuthGET(req);
  }

  /* Intercept the fetch request to patch access_token request to be oauth compliant */
  global.fetch = naverFetchInterceptor(originalFetch);
  const response = await AuthGET(req);
  global.fetch = originalFetch;
  return response;
}
