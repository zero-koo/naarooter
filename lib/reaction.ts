import { Reaction } from '@/types/shared';

export const updateReaction = (
  prevState: Reaction,
  newReaction: 'like' | 'dislike'
): Reaction => {
  switch (newReaction) {
    case 'like': {
      if (prevState.selectedReaction === 'like') {
        return {
          ...prevState,
          selectedReaction: null,
          likeCount: prevState.likeCount - 1,
        };
      }
      if (prevState.selectedReaction === 'dislike') {
        return {
          selectedReaction: 'like',
          likeCount: prevState.likeCount + 1,
          dislikeCount: prevState.dislikeCount - 1,
        };
      }
      return {
        ...prevState,
        selectedReaction: 'like',
        likeCount: prevState.likeCount + 1,
      };
    }
    case 'dislike': {
      if (prevState.selectedReaction === 'like') {
        return {
          selectedReaction: 'dislike',
          likeCount: prevState.likeCount - 1,
          dislikeCount: prevState.dislikeCount + 1,
        };
      }
      if (prevState.selectedReaction === 'dislike') {
        return {
          ...prevState,
          selectedReaction: null,
          dislikeCount: prevState.dislikeCount - 1,
        };
      }
      return {
        ...prevState,
        selectedReaction: 'dislike',
        dislikeCount: prevState.likeCount + 1,
      };
    }
  }
};
