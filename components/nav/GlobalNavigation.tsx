'use client';

import { cn } from '@/lib/utils';
import { Black_Han_Sans } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
});

const GlobalNavigation = () => {
  return (
    <nav className="flex flex-col">
      <div className={cn(['mb-4 px-2.5', blackHanSans.className])}>
        <Link
          className="font-italic font-semibold text-primary-content/90"
          href={'/'}
        >
          Coconut Space
        </Link>
      </div>
      <NavMenu link={'/polls'} groupId="q" icon={<LetterIcon alphabet="Q" />}>
        설문조사
      </NavMenu>
      <div className="mb-1 mt-4 w-full px-2.5 text-left text-xs opacity-50">
        커뮤니티
      </div>
      <NavMenu link={'/posts'} groupId="" icon={<LetterIcon alphabet="A" />}>
        전체방
      </NavMenu>
      <NavMenu
        link={'/posts/group/x'}
        groupId="x"
        icon={<LetterIcon alphabet="X" />}
      >
        자유방
      </NavMenu>
      <NavMenu
        link={'/posts/group/e'}
        groupId="e"
        icon={<LetterIcon alphabet="E" />}
      >
        외향방
      </NavMenu>
      <NavMenu
        link={'/posts/group/i'}
        groupId="i"
        icon={<LetterIcon alphabet="I" />}
      >
        내향방
      </NavMenu>
      <NavMenu
        link={'/posts/group/s'}
        groupId="s"
        icon={<LetterIcon alphabet="S" />}
      >
        현실방
      </NavMenu>
      <NavMenu
        link={'/posts/group/n'}
        groupId="n"
        icon={<LetterIcon alphabet="N" />}
      >
        이상방
      </NavMenu>
      <NavMenu
        link={'/posts/group/f'}
        groupId="f"
        icon={<LetterIcon alphabet="F" />}
      >
        감성방
      </NavMenu>
      <NavMenu
        link={'/posts/group/t'}
        groupId="t"
        icon={<LetterIcon alphabet="T" />}
      >
        이성방
      </NavMenu>
      <NavMenu
        link={'/posts/group/j'}
        groupId="j"
        icon={<LetterIcon alphabet="J" />}
      >
        계획방
      </NavMenu>
      <NavMenu
        link={'/posts/group/p'}
        groupId="p"
        icon={<LetterIcon alphabet="P" />}
      >
        즉흥방
      </NavMenu>
    </nav>
  );
};

export default GlobalNavigation;

function NavMenu({
  link,
  groupId,
  icon,
  children,
}: {
  link: string;
  groupId: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <Link href={link}>
      <button
        className={cn(
          'flex items-center rounded-lg h-10 my-0.5 px-2.5 w-full text-left font-normal text-sm hover:bg-primary/20',
          {
            'bg-primary/20 font-bold':
              pathName === link || searchParams?.get('groupId') == groupId,
          }
        )}
      >
        <div className="mr-3">{icon}</div>
        {children}
      </button>
    </Link>
  );
}

function LetterIcon({ alphabet }: { alphabet: string }) {
  return (
    <div className="text-md flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100/10 font-semibold">
      {alphabet}
    </div>
  );
}
