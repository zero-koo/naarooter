'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ToastState = {
  message: string;
  theme: 'info' | 'success' | 'error' | 'warning';
};

let setToastMessage: ((state: ToastState) => void) | null = null;
let setToastVisible: ((visible: boolean) => void) | null = null;
let toastTimeoutId: ReturnType<typeof setTimeout> | null = null;

const TOAST_TIME = 5000;
const FLICKERING_TIME = 150;
export function ToastContainer() {
  const [visible, setVisible] = useState(false);
  const [currentToast, setCurrentToast] = useState<ToastState>({
    message: 'string',
    theme: 'info',
  });
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setToastMessage = (state: ToastState) => {
      setVisible(true);
      setCurrentToast(state);

      toastTimeoutId && clearTimeout(toastTimeoutId);
      toastTimeoutId = setTimeout(() => {
        setVisible(false);
      }, TOAST_TIME);

      setUpdated(true);
      setTimeout(() => setUpdated(false), FLICKERING_TIME);
    };
    setToastVisible = (visible: boolean) => setVisible(visible);
  }, []);

  return (
    <div
      className={twMerge(
        'fixed -bottom-10 left-0 right-0 flex scale-75 justify-center transition-all duration-150',
        visible && 'bottom-10 scale-100',
        updated && 'scale-95'
      )}
    >
      <div
        className={twMerge(
          'rounded-lg bg-neutral-content px-3 py-1.5 text-sm text-neutral opacity-0 transition-opacity duration-300',
          visible && 'opacity-80',
          currentToast.theme === 'success' && `bg-success/80`,
          currentToast.theme === 'warning' && `bg-warning/80`,
          currentToast.theme === 'error' && `bg-error/80`
        )}
      >
        <div>{currentToast.message}</div>
      </div>
    </div>
  );
}

const toast = {
  update: (toast: ToastState | string) => {
    setToastMessage?.(
      typeof toast === 'string'
        ? {
            message: toast,
            theme: 'info',
          }
        : toast
    );
  },
  dismiss: () => setToastVisible?.(false),
};

export function useToast() {
  return {
    toast,
  };
}
