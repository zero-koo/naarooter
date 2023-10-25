import { ComponentProps } from 'react';
import { SignUp as ClerkSignUp } from '@clerk/nextjs';

const SignUp = (props: ComponentProps<typeof ClerkSignUp>) => {
  return (
    <ClerkSignUp afterSignInUrl="/" afterSignUpUrl="/my/mbti" {...props} />
  );
};

export default SignUp;
