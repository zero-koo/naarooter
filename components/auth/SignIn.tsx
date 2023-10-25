import { ComponentProps } from 'react';
import { SignIn as ClerkSignIn } from '@clerk/nextjs';

const SignIn = (props: ComponentProps<typeof ClerkSignIn>) => {
  return (
    <ClerkSignIn afterSignInUrl="/" afterSignUpUrl="/my/mbti" {...props} />
  );
};

export default SignIn;
