import { cn } from '@/lib/utils';

import Loading from './Loading';

const LoadingBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex-center w-full py-20', className)} {...props}>
      <Loading />
    </div>
  );
};

export default LoadingBox;
