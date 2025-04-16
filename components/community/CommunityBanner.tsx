import { ComponentProps } from 'react';
import Image from 'next/image';

const CommunityBanner = ({
  bannerSrc,
}: {
  bannerSrc: ComponentProps<typeof Image>['src'];
}) => {
  return (
    <Image
      src={bannerSrc}
      alt="banner"
      width={1400}
      height={200}
      className="mb-1 aspect-[7/1] object-cover md:rounded-lg"
    />
  );
};

export default CommunityBanner;
