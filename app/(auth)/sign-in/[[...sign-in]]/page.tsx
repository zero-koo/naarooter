import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <SignIn />
    </div>
  );
}
