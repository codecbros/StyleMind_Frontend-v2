import { toast } from 'sonner';

type ToastOptions = {
  title?: string;
  description?: string;
  className?: string;
};

export const SuccessToast = ({
  description,
  title = '¡Éxito!',
  className,
}: ToastOptions) => {
  toast.success(title, {
    description,
    className,
  });
};

export const ErrorToast = ({
  description,
  title = 'Error',
  className,
}: ToastOptions) => {
  toast.error(title, {
    description,
    className,
  });
};

export const WarningToast = ({
  description,
  title = 'Precaución',
  className,
}: ToastOptions) => {
  toast.warning(title, {
    description,
    className,
  });
};

export const InfoToast = ({
  description,
  title = 'Información',
  className,
}: ToastOptions) => {
  toast.info(title, {
    description,
    className,
  });
};

export const CustomToast = ({
  title,
  options,
}: {
  title: string;
  options?: {
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    duration?: number;
    className?: string;
  };
}) => {
  toast(title, {
    description: options?.description,
    action: options?.action,
    duration: options?.duration,
    className: options?.className,
  });
};
