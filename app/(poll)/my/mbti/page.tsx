'use client';

import { trpc } from '@/client/trpcClient';
import MBTISettingForm from '@/components/mbti/MbtiSettingForm';
import {
  useMbtiQuery,
  useUpdateMbtiQueryData,
} from '@/hooks/queries/useMbtiQuery';
import { useToast } from '@/hooks/useToast';

const MBTISettingPage = () => {
  const { toast } = useToast();
  const { data: mbti, isFetched } = useMbtiQuery();

  const updateMbtiQuery = useUpdateMbtiQueryData();

  const saveMbti = !mbti ? trpc.user.createMbti : trpc.user.updateMbti;
  const { mutate: savePoll, isLoading } = saveMbti.useMutation({
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
          initialData={mbti ?? undefined}
          onSave={savePoll}
          isSaving={isLoading}
        />
      ) : null}
    </>
  );
};

export default MBTISettingPage;
