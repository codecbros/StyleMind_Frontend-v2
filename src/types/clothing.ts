import type { CreateClothesDto } from '../api/generated/schemas';

// types/clothing.ts
export interface ClothingItem extends CreateClothesDto {
  id: string;
  images: Array<{
    id: string;
    url: string;
  }>;
  categories: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
  createdAt?: string;
  updatedAt?: string;
}
