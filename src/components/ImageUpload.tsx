import { UploadCloud, X } from 'lucide-react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import {
  MAX_FILE_SIZE,
  MAX_FILES,
  type ImageFile,
} from '../hooks/useImageUpload';
import { cn } from '../lib/utils';
import { ImageUploadSkeleton } from './skeletons/ImageUploadSkeleton';

type ImageUploaderProps = {
  images: ImageFile[];
  onAddImages: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  onRemoveImage: (id: string) => void;
  isUploading?: boolean;
  maxFiles?: number;
  maxSize?: number;
};

export default function ImageUploader({
  images,
  onAddImages,
  onRemoveImage,
  isUploading = false,
  maxFiles = MAX_FILES,
  maxSize = MAX_FILE_SIZE, // 5MB
}: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: onAddImages,
    maxSize,
    disabled: images.length >= maxFiles,
  });

  const hasMaxFiles = images.length >= maxFiles;

  return (
    <section>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 transition-colors duration-200',
          'hover:border-primary/50 hover:bg-primary/5',
          isDragActive && 'border-primary bg-primary/10',
          !isDragActive && !hasMaxFiles && 'border-muted-foreground/25',
          hasMaxFiles && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-foreground/80 text-center">
            {isDragActive
              ? 'Suelta las imágenes aquí'
              : hasMaxFiles
              ? `Límite de ${maxFiles} imágenes alcanzado`
              : `Arrastra imágenes o haz clic para seleccionar (máx. ${maxFiles})`}
          </p>
          <p className="text-xs text-muted-foreground text-center">
            PNG, JPG, WEBP - Máx {maxSize / 1048576}MB por imagen
          </p>
        </div>
      </div>

      {isUploading && <ImageUploadSkeleton count={images.length} />}

      {!isUploading && images.length > 0 && (
        <ul className="my-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <li
              key={image.id}
              className="relative aspect-square rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <img
                src={image.preview}
                alt={image.file.name}
                className="h-full w-full object-cover"
                onLoad={() => URL.revokeObjectURL(image.preview)}
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 w-7 h-7 bg-destructive rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-md"
                onClick={() => onRemoveImage(image.id)}
                aria-label={`Eliminar ${image.file.name}`}
              >
                <X className="w-4 h-4 text-destructive-foreground" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                <p
                  className="text-xs text-white truncate"
                  title={image.file.name}
                >
                  {image.file.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
