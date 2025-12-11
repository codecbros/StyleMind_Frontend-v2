export type Category = {
  id: string;
  name: string;
  description: string | null;
};

export type CategoryFieldValues = {
  [key: string]: string | null;
};
