'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';

import CommunityCreateForm from '../community/CommunityForm/CommunityCreateForm';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import CommunityList from './CommunityList';

const CommunityNavigation = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-2">
        <CommunityCreateButton />
      </div>
      <CommunityList />
    </div>
  );
};

export default CommunityNavigation;

const CommunityCreateButton = () => {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={(open) => {
        !open && setCreateDialogOpen(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="mb-1"
          onClick={() => setCreateDialogOpen(true)}
        >
          커뮤니티 만들기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden">커뮤니티 만들기</DialogTitle>
        <CommunityCreateForm onSubmit={() => setCreateDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
