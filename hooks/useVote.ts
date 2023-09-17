import { useState } from 'react';

type VoteItem = {
  count: number;
  voted: boolean;
};

export const useVote = <Item extends VoteItem>(initialStates: Item[]) => {
  const [voteItems, setVoteItems] = useState(initialStates);

  const totalVoteCount = voteItems.reduce(
    (count, item) => count + item.count,
    0
  );
  const isVoted = voteItems.some((item) => item.voted);

  const handleVote = (selectedIndex: number) => {
    setVoteItems((items) =>
      items.map((item, index) => {
        if (selectedIndex === index) {
          return {
            ...item,
            count: item.voted ? item.count - 1 : item.count + 1,
            voted: !item.voted,
          };
        }
        return {
          ...item,
          count: item.voted ? item.count - 1 : item.count,
          voted: false,
        };
      })
    );
  };

  return {
    voteItems,
    setVoteItems,
    totalVoteCount,
    isVoted,
    handleVote,
  };
};
