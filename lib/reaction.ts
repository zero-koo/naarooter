import { Reaction } from '@/types/shared';

export const updateReaction = (
  prevState: Reaction,
  newReaction: 'like' | 'dislike'
): Reaction => {
  switch (newReaction) {
    case 'like': {
      if (prevState.userReaction === 'like') {
        return {
          ...prevState,
          userReaction: null,
          likeCount: prevState.likeCount - 1,
        };
      }
      if (prevState.userReaction === 'dislike') {
        return {
          userReaction: 'like',
          likeCount: prevState.likeCount + 1,
          dislikeCount: prevState.dislikeCount - 1,
        };
      }
      return {
        ...prevState,
        userReaction: 'like',
        likeCount: prevState.likeCount + 1,
      };
    }
    case 'dislike': {
      if (prevState.userReaction === 'like') {
        return {
          userReaction: 'dislike',
          likeCount: prevState.likeCount - 1,
          dislikeCount: prevState.dislikeCount + 1,
        };
      }
      if (prevState.userReaction === 'dislike') {
        return {
          ...prevState,
          userReaction: null,
          dislikeCount: prevState.dislikeCount - 1,
        };
      }
      return {
        ...prevState,
        userReaction: 'dislike',
        dislikeCount: prevState.likeCount + 1,
      };
    }
  }
};
