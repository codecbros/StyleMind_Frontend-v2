import type { CreateClothesDto } from '../api/generated/schemas';

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

export interface WardrobeItem {
  id: string;
  name: string;
  season: string;
  primaryColor: string;
  secondaryColor?: string;
  style: string;
  size: string;
  images: Array<{
    id: string;
    url: string;
  }>;
  categories: Array<{
    category: {
      name: string;
    };
  }>;
}
