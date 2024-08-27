'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { socialLogin } from '@/actions/sign-in';
import GoogleLogoSvg from '@/public/google-logo.svg';
import KakaoLogoSvg from '@/public/kakao-square-logo.svg';
import NaverLogoSvg from '@/public/naver-logo.svg';

import OAuthButton from './OAuthButton';

type AuthFormParams = {
  title: string;
  redirect?: boolean;
};

const AuthForm = ({ title, redirect = true }: AuthFormParams) => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect');

  const login = (site: 'google' | 'naver' | 'kakao') =>
    socialLogin(site, { redirect, redirectTo: redirectTo ?? undefined });

  return (
    <div className="w-[330px]">
      <div className="mb-3 px-1 text-xl font-extrabold tracking-widest">
        {title}
      </div>
      <div className="space-y-2.5">
        <form action={() => login('google')}>
          <OAuthButton
            icon={
              <Image src={GoogleLogoSvg} alt="google" width={20} height={20} />
            }
            siteName="구글"
          />
        </form>
        <form action={() => login('naver')}>
          <OAuthButton
            icon={
              <Image
                src={NaverLogoSvg}
                alt="naver"
                width={20}
                height={20}
                className="fill-red-500"
              />
            }
            siteName="네이버"
          />
        </form>
        <form action={() => login('kakao')}>
          <OAuthButton
            icon={
              <Image src={KakaoLogoSvg} alt="kakao" width={20} height={20} />
            }
            siteName="카카오"
          />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
