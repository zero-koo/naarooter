'use client';

import React from 'react';
import { ImagePlusIcon } from 'lucide-react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

import ImageUploadPreview from './ImageUploadPreview';

const variants = {
  base: 'shadow-md relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[30px] min-w-[30px] transition-colors duration-200 ease-in-out',
  image:
    'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md',
  active: 'border-2',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
  accept: 'border border-success bg-success bg-opacity-10',
  reject: 'border border-error bg-error bg-opacity-10',
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  values?: Array<File | string>;
  onAdd?: (file: File[]) => void | Promise<void>;
  onRemove?: (index: number) => void;
  maxFiles?: number;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const MultipleImageUploader = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width,
      height,
      values,
      className,
      maxFiles = 5,
      disabled,
      onAdd,
      onRemove,
    },
    ref
  ) => {
    const imageUrls = React.useMemo(() => {
      return (
        values?.map((value) => {
          if (typeof value === 'string') {
            // in case a url is passed in, use it to display the image
            return value;
          } else {
            // in case a file is passed in, create a base64 url to display the image
            return URL.createObjectURL(value);
          }
        }) ?? []
      );
    }, [values]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: true,
      maxFiles: maxFiles,
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles.slice(0, maxFiles - imageUrls.length);
        if (files.length) {
          void onAdd?.(files);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    return (
      <div className="flex gap-1">
        {imageUrls.length
          ? imageUrls.map((imageUrl, index) => (
              <ImageUploadPreview
                key={index}
                src={imageUrl}
                size={'sm'}
                alt={acceptedFiles[0]?.name ?? 'poll-image'}
                removable={!disabled}
                onRemove={() => {
                  void onRemove?.(index);
                }}
              />
            ))
          : null}
        {imageUrls.length < maxFiles && (
          <div
            {...getRootProps({
              className: cn(dropZoneClassName, 'h-32 w-32 outline-none'),
              style: {
                width,
                height,
              },
            })}
          >
            {/* Main File Input */}
            <div className="flex flex-col items-center justify-center text-sm text-foreground">
              <input ref={ref} {...getInputProps()} />
              <ImagePlusIcon className="size-6" strokeWidth={2} />
            </div>
            {/* Remove Image Icon */}
          </div>
        )}
      </div>
    );
  }
);
MultipleImageUploader.displayName = 'MultipleImageUploader';

export { MultipleImageUploader };
