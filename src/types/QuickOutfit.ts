export interface GeneratedOutfitClothingItem {
  id: string;
  name: string;
  images: string[];
  primaryColor: string;
  secondaryColor: string;
}

export interface GeneratedOutfitData {
  explanation: string;
  items: GeneratedOutfitClothingItem[];
  message: string;
}
