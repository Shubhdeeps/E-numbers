export type AdditiveCategory = {
  additive: string;
  category: string;
  startNumber: number;
  endNumber: number;
};

export const additivesAndCategories: AdditiveCategory[] = [
  {
    additive: "E100 - E199",
    category: "Colours",
    startNumber: 100,
    endNumber: 199,
  },
  {
    additive: "E200 - E299",
    category: "Preservatives",
    startNumber: 200,
    endNumber: 299,
  },
  {
    additive: "E300 - E399",
    category: "Antioxidants & acidity regulators",
    startNumber: 300,
    endNumber: 399,
  },
  {
    additive: "E400 - E499",
    category: "Thickeners, stabilizers & emulsifiers",
    startNumber: 400,
    endNumber: 499,
  },
  {
    additive: "E500 - E599",
    category: "pH regulators & anti-caking agents",
    startNumber: 500,
    endNumber: 599,
  },
  {
    additive: "E600 - E699",
    category: "Flavour enhancers",
    startNumber: 600,
    endNumber: 699,
  },
  {
    additive: "E900 - E999",
    category: "Miscellaneous",
    startNumber: 900,
    endNumber: 999,
  },
  {
    additive: "E1100 - E1599",
    category: "Additional chemicals",
    startNumber: 1100,
    endNumber: 1599,
  },
];
