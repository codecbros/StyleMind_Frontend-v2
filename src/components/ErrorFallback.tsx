import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import CenteredContainer from './CenteredContainer';

interface ErrorFallbackProps {
  title?: string;
  description: string;
}

export const ErrorFallback = ({
  title = 'Ocurrió un error',
  description,
}: ErrorFallbackProps) => {
  return (
    <>
      <CenteredContainer>
        <Card className="w-full p-6 sm:px-6 md:px-8 lg:px-10 md:py-8">
          <Alert variant="destructive" className="border-2">
            <AlertCircle className="size-5 mt-1" />
            <AlertTitle className="text-lg font-semibold uppercase tracking-wide">
              {title}
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p className="text-sm leading-relaxed">{description}</p>
            </AlertDescription>
          </Alert>
        </Card>
      </CenteredContainer>
    </>
  );
};
