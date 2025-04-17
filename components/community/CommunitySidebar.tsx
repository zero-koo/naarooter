'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import { PencilIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { IconButton } from '../ui/IconButton';
import CommunityDescriptionView from './CommunityDescriptionView';
import CommunityEditForm from './CommunityForm/CommunityEditForm';

const CommnunitySidebar = ({ communityId }: { communityId: string }) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });

  const [isDescriptionEditDialogOpen, setDescriptionEditDialogOpen] =
    useState(false);
  return (
    <CommunityDescriptionView
      {...community}
      topics={community.topics.map((topic) => topic.name)}
    >
      {community.isOwner && (
        <Dialog
          open={isDescriptionEditDialogOpen}
          onOpenChange={setDescriptionEditDialogOpen}
        >
          <DialogTrigger asChild>
            <IconButton
              className={cn(
                'bg-base-300/80 absolute bottom-1 right-1 rounded-full opacity-90'
              )}
              size="xs"
            >
              <PencilIcon size={14} />
            </IconButton>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="hidden">커뮤니티 편집</DialogTitle>
            <CommunityEditForm
              community={community}
              onSubmit={() => setDescriptionEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </CommunityDescriptionView>
  );
};

export default CommnunitySidebar;
