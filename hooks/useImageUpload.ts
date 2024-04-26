import { useEdgeStore } from '@/lib/edgestore';

export const useImageUpload = () => {
  const { edgestore } = useEdgeStore();
  const uploadImage = (params: {
    file: File;
    onProgressChange?: (progress: number) => void;
    options?: {
      manualFileName?: string;
      replaceTargetUrl?: string;
      temporary?: boolean;
    };
  }) => edgestore.publicFiles.upload(params);

  return {
    uploadImage,
  };
};
