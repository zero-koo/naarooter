import clsx from 'clsx';

import style from './Loading.module.css';

const Loading = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  return (
    <div
      className={clsx({
        'scale-[65%]': size === 'sm',
        'scale-150': size === 'lg',
      })}
    >
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loading;
