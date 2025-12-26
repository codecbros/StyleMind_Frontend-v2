export interface ClothingItem {
  id: string;
  name: string;
  images: string[];
  primaryColor: string;
  secondaryColor: string;
}

export interface GeneratedOutfitData {
  explanation: string;
  items: ClothingItem[];
  message: string;
}
