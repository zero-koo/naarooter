'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/auth';
import { trpc } from '@/client/trpcClient';
import { MBTI } from '@/types/shared';
import { useForm } from 'react-hook-form';

import { useUserQuery } from '@/hooks/queries/useUserQuery';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import MbtiSettingForm, {
  MbtiFormInput,
} from '@/components/mbti/MbtiSettingForm';
import TextInput from '@/components/TextInput';

function AccountInfo() {
  const { data } = useUserQuery();

  if (!data) return null;

  return (
    <div className={'flex flex-col gap-10 px-3 py-5'}>
      <Row title={'계정'} content={data.email ?? ''}></Row>
      <NameRow name={data.name ?? ''} />
      <MBTIRow mbti={data.mbti} />
      <WithDrawalRow />
    </div>
  );
}

function Row({
  title,
  content,
  onClickEdit,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
  onClickEdit?: () => void;
}) {
  return (
    <div className="">
      <div className="mb-2 flex items-center text-xl font-bold">
        <div>{title}</div>
        {onClickEdit && (
          <Button variant={'link'} className="ml-2" onClick={onClickEdit}>
            수정
          </Button>
        )}
      </div>
      <div className={'text-base-content/80'}>{content}</div>
    </div>
  );
}

function NameRow(props: { name: string }) {
  const [username, setUsername] = useState(props.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Row
        title={'닉네임'}
        content={username}
        onClickEdit={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <UsernameEditModal
          username={username}
          onChange={(name) => {
            setUsername(name);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function UsernameEditModal({
  username,
  onChange,
  onClose,
}: {
  username: string;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  const { register, setFocus, handleSubmit } = useForm({
    defaultValues: {
      name: username,
    },
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const { mutateAsync: updateUser, isLoading } = trpc.user.update.useMutation();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        !open && onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>변경할 닉네임을 입력하세요.</DialogTitle>
        </DialogHeader>
        <div>
          <TextInput
            {...register('name')}
            className="w-full flex-1 border-b border-base-content/30"
          />
        </div>
        <DialogFooter>
          <Button
            variant={'primary'}
            size={'sm'}
            disabled={isLoading}
            onClick={handleSubmit(async ({ name }) => {
              if (name !== username) {
                await updateUser({ name });
              }
              onChange(name);
            })}
          >
            확인
          </Button>
          <Button size={'sm'} onClick={onClose}>
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MBTIRow(props: { mbti: MBTI | null }) {
  const [mbti, setMbti] = useState(props.mbti);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Row
        title={'MBTI'}
        content={mbti}
        onClickEdit={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <MBTIEditModal
          mbti={mbti}
          onChange={(mbti) => {
            setMbti(mbti);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function MBTIEditModal({
  mbti,
  onChange,
  onClose,
}: {
  mbti: MBTI | null;
  onChange: (mbti: MBTI) => void;
  onClose: () => void;
}) {
  const { mutateAsync: updateUser, isLoading } = trpc.user.update.useMutation();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        !open && onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>MBTI 수정</DialogTitle>
        </DialogHeader>
        <div className="-mx-3">
          <MbtiSettingForm
            initialData={
              mbti
                ? ({
                    ei: mbti[0],
                    sn: mbti[1],
                    ft: mbti[2],
                    jp: mbti[3],
                  } as MbtiFormInput)
                : undefined
            }
            isSaving={isLoading}
            onSave={async (mbti) => {
              await updateUser({
                mbti: `${mbti.ei}${mbti.sn}${mbti.ft}${mbti.jp}`,
              });
              onChange(`${mbti.ei}${mbti.sn}${mbti.ft}${mbti.jp}`);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WithDrawalRow() {
  const { toast } = useToast();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: withdraw } = trpc.user.withdraw.useMutation({
    onSuccess() {
      toast.update({
        message: '회원탈퇴되었습니다.',
        theme: 'info',
      });
      signOut();
      router.replace('/');
    },
    onError() {
      toast.update({
        message: '요청에 실패하였습니다. 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <>
      <Row
        title={'회원 탈퇴'}
        content={
          <Button
            size="sm"
            variant={'text'}
            onClick={() => setIsModalOpen(true)}
          >
            탈퇴하기
          </Button>
        }
      />
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          !open && setIsModalOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원 탈퇴</DialogTitle>
          </DialogHeader>
          <div></div>
          <DialogFooter>
            <Button
              size="sm"
              variant={'destructive'}
              onClick={async () => {
                await withdraw();
                setIsModalOpen(false);
              }}
            >
              탈퇴하기
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default AccountInfo;
