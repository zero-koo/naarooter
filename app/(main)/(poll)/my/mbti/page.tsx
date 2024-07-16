'use client';

import { trpc } from '@/client/trpcClient';

import {
  useMbtiQuery,
  useUpdateMbtiQueryData,
} from '@/hooks/queries/useMbtiQuery';
import { useToast } from '@/hooks/useToast';
import MBTISettingForm from '@/components/mbti/MbtiSettingForm';

const MBTISettingPage = () => {
  const { toast } = useToast();
  const { data: mbti, isFetched } = useMbtiQuery();

  const updateMbtiQuery = useUpdateMbtiQueryData();

  const { mutate: savePoll, isLoading } = trpc.user.updateMbti.useMutation({
    onSuccess(data) {
      updateMbtiQuery(data);
      toast.update({
        message: '저장되었습니다.',
        theme: 'success',
      });
    },
    onError() {
      toast.update({
        message: '저장에 실패하였습니다. 잠시후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <>
      {isFetched ? (
        <MBTISettingForm
          initialData={
            mbti?.mbti
              ? {
                  ei: mbti.mbti[0] as 'E' | 'I',
                  sn: mbti.mbti[1] as 'S' | 'N',
                  ft: mbti.mbti[2] as 'F' | 'T',
                  jp: mbti.mbti[3] as 'J' | 'P',
                }
              : undefined
          }
          onSave={savePoll}
          isSaving={isLoading}
        />
      ) : null}
    </>
  );
};

export default MBTISettingPage;
