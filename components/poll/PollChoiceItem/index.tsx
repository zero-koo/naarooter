import PollChoiceItemComponent, {
  PollChoiceItemComponentProps,
} from './PollChoiceItem.component';

interface PollChoiceItemProps extends PollChoiceItemComponentProps {
  id: number;
}

export default function PollChoiceItem({
  id,
  ...restProps
}: PollChoiceItemProps) {
  return <PollChoiceItemComponent {...restProps} />;
}
