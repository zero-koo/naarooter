import type { NextAuthConfig } from 'next-auth';
import google from 'next-auth/providers/google';
import kakao from 'next-auth/providers/kakao';
import naver from 'next-auth/providers/naver';

export default {
  providers: [google, kakao, naver],
} satisfies NextAuthConfig;
