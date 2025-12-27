import { DialogDescription } from '@radix-ui/react-dialog';
import { Check, Sparkles, X } from 'lucide-react';
import { useSaveCombination } from '../../api/generated/combinations/combinations';
import { SaveCombinationDto } from '../../api/generated/schemas';
import { ErrorToast, SuccessToast } from '../../lib/toast';
import { GeneratedOutfitData } from '../../types/QuickOutfit';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface GeneratedOutfitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outfitData: GeneratedOutfitData | null;
  onGenerateAnother: () => void;
  resetForm: () => void;
  description?: string;
  occasion?: string[] | string;
}

const GeneratedOutfitModal = ({
  open,
  onOpenChange,
  outfitData,
  onGenerateAnother,
  resetForm,
  description,
  occasion,
}: GeneratedOutfitModalProps) => {
  const { mutate, isPending } = useSaveCombination();

  if (!outfitData) return null;

  const handleSaveOutfit = () => {
    const outfitDataSave = {
      description: description || '',
      occasions: occasion || [],
      name: occasion?.[0] || '',
      isAIGenerated: true,
      combinationItems: outfitData?.items?.map((item) => ({
        wardrobeItemId: item.id,
      })),
    };

    mutate(
      { data: outfitDataSave as SaveCombinationDto },
      {
        onSuccess: (success) => {
          console.log(success);
          SuccessToast({
            title: 'Outfit guardado con éxito',
          });
          resetForm();
        },
        onError: () => {
          ErrorToast({
            title: 'Error al guardar el outfit',
            description:
              'Hubo un problema al guardar el outfit. Por favor, intenta de nuevo.',
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[95vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-4 sm:px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pr-8">
              <DialogTitle className="text-xl sm:text-2xl">
                ✨ Outfit Generado
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {outfitData.message}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full hover:bg-muted cursor-pointer shrink-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="size-5" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 py-6 space-y-6">
          {/* Explanation Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Descripción del Outfit
            </p>
            <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
              <p className="text-sm text-foreground leading-relaxed">
                {outfitData.explanation}
              </p>
            </div>
          </div>

          {/* Items Grid */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Prendas del Outfit ({outfitData.items.length})
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {outfitData.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-sm truncate">
                      {item.name}
                    </h3>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="size-5 rounded-full border-2 border-border shadow-sm"
                          style={{ backgroundColor: item.primaryColor }}
                          aria-label={`Color principal: ${item.primaryColor}`}
                        />
                      </div>
                      {item.secondaryColor && (
                        <div className="flex items-center gap-1.5">
                          <div
                            className="size-5 rounded-full border-2 border-border shadow-sm"
                            style={{ backgroundColor: item.secondaryColor }}
                            aria-label={`Color secundario: ${item.secondaryColor}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/40">
            <Button
              onClick={handleSaveOutfit}
              disabled={isPending}
              className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm cursor-pointer"
            >
              <Check className="mr-2 size-4" />
              {isPending ? 'Guardando...' : 'Guardar Outfit'}
            </Button>
            <Button
              onClick={onGenerateAnother}
              variant="outline"
              disabled={isPending}
              className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm cursor-pointer"
            >
              <Sparkles className="mr-2 size-4" />
              Generar Otro Outfit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratedOutfitModal;
