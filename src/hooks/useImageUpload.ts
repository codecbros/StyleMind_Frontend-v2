import { useCallback, useEffect, useState } from 'react';
import { type FileRejection } from 'react-dropzone';
import { ErrorToast, WarningToast } from '../lib/toast';

export const MAX_FILES = 4;
export const MAX_FILE_SIZE = 5242880; // 5MB

export type ImageFile = {
  file: File;
  preview: string;
  id: string;
};

export function useImageUploader(maxFiles = MAX_FILES) {
  const [images, setImages] = useState<ImageFile[]>([]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const addImages = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        const totalFiles = images.length + acceptedFiles.length;

        if (totalFiles > maxFiles) {
          WarningToast({
            description: `Solo puedes subir hasta ${maxFiles} imágenes. Se añadirán las primeras hasta completar el límite.`,
          });

          const remainingSlots = Math.max(0, maxFiles - images.length);
          acceptedFiles = acceptedFiles.slice(0, remainingSlots);
        }

        const newImages: ImageFile[] = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        }));

        setImages((prev) => [...prev, ...newImages]);
      }

      if (rejectedFiles?.length) {
        rejectedFiles.forEach((rejected) => {
          const errorMessage =
            rejected.errors?.map((e) => e.message).join(', ') ||
            'Error desconocido';
          ErrorToast({
            title: `"${rejected.file.name}" fue rechazado`,
            description: errorMessage,
          });
        });
      }
    },
    [images.length, maxFiles]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  }, [images]);

  const getFiles = useCallback(() => {
    return images.map((img) => img.file);
  }, [images]);

  return {
    images,
    addImages,
    removeImage,
    clearImages,
    getFiles,
    hasMaxFiles: images.length >= maxFiles,
  };
}
