'use client';

import React from 'react';
import { ImagePlusIcon } from 'lucide-react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

import ImageUploadPreview from './ImageUploadPreview';

const variants = {
  base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[30px] min-w-[30px] transition-colors duration-200 ease-in-out',
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
  value?: File | string | null;
  onChange?: (file?: File) => void | Promise<void>;
  uploading?: boolean;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const SingleImageUploader = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width,
      height,
      value,
      className,
      uploading,
      disabled,
      onChange,
    },
    ref
  ) => {
    const imageUrl = React.useMemo(() => {
      if (typeof value === 'string') {
        // in case a url is passed in, use it to display the image
        return value;
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

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
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          void onChange?.(file);
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
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className="relative size-full rounded-lg bg-base-200">
        {imageUrl ? (
          <ImageUploadPreview
            src={imageUrl}
            alt={acceptedFiles[0]?.name ?? 'poll-image'}
            removable={!disabled}
            uploading={uploading}
            onRemove={() => {
              void onChange?.(undefined);
            }}
          />
        ) : (
          <div
            {...getRootProps({
              className: cn(dropZoneClassName, 'h-full w-full outline-none'),
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
SingleImageUploader.displayName = 'SingleImageUploader';

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes';
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { SingleImageUploader };
