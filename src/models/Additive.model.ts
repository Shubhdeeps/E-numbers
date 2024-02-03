export interface Additive {
  e_number: string;
  name: string;
  description?: string;
  use?: string;
  translation?: { [locale: string]: string };
  vegan?: boolean;
  vegetarian?: boolean;
  category?: string;
  subject?: string;
  context?: string;
  additiveName?: string;
  isGroup?: boolean;
}
