import { ComponentProps } from 'react';
import Image from 'next/image';
import CommunityIconImage from '@/public/planet_image_1.png';

import { cn } from '@/lib/utils';

type CommunityIconProps = {
  iconUrl?: ComponentProps<typeof Image>['src'] | null;
  size?: keyof typeof sizeMap;
};

const sizeMap = {
  xs: 40,
  sm: 60,
  md: 80,
  lg: 100,
};

const CommunityIcon = ({ iconUrl, size }: CommunityIconProps) => {
  return (
    <Image
      src={iconUrl || CommunityIconImage}
      alt="community-icon"
      width={sizeMap[size || 'md']}
      height={sizeMap[size || 'md']}
      className={cn('rounded-full', {
        'size-6': size === 'xs',
        'size-7': size === 'sm',
        'size-8': size === 'md',
        'size-9': size === 'lg',
      })}
    />
  );
};

export default CommunityIcon;
