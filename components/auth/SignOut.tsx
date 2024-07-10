import { signOut } from '@/auth';
import { Button } from '../ui/Button';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/',
        });
      }}
    >
      <Button type="submit" size="sm">
        로그아웃
      </Button>
    </form>
  );
}

export default SignOut;
