function removeUnitValues(str: string) {
  const regex = /(\d+)(?:[gL]|%)/g;
  const regex2 = /(\d+)(?:[ml]|%)/g;
  const regex3 = /(\d+)(?:[kg]|%)/g;
  // console.log("raw: ", str);
  return str.replace(regex, "").replace(regex2, "").replace(regex3, "");
}

export function extractEnumbersList(text: string) {
  const regex = /E\d{3,4}[a-zA-Z]?/g;
  const matches = text.match(regex) || ([] as string[]);

  // console.log("matches: ", matches);

  const removedUnits = removeUnitValues(text);
  // console.log("without units", removedUnits);

  const all_numbers = extractNumbers(removedUnits);
  // console.log("all_numbers ", all_numbers);
  // all_numbers.push(..._all_numbers);

  return Array.from(new Set([...matches, ...all_numbers]));
}

function extractNumbers(text: string) {
  const numbers = text.match(/\d+/g) || [];

  return numbers
    .filter((n) => n.length >= 3)
    .map((n) => {
      return `E${n}`;
    });
}

const removeNumberPattern = /\d+/g;
// export function extractIngredients(text: string) {
//   const pattern = /[^a-zA-Z0-9\s]/g; // Replace all non-alphanumeric and non-whitespace characters with an empty string

//   const ingredientsList = text.replace(removeNumberPattern, "").split(pattern);
//   return ingredientsList.map((text) => text.trim());
// }

// export function removeSpecialCharacters(text: string) {
//   const pattern = /[^a-zA-Z0-9\s]/g; // Replace all non-alphanumeric and non-whitespace characters with an empty string
//   const filteredText = text.replace(pattern, "");
//   return filteredText.replace(/\n/g, " ");
// }

export function processRawStringAndReturnList(text: string) {
  const pattern = /[^a-zA-Z0-9\s]/g; // Replace all non-alphanumeric and non-whitespace characters with an empty string

  const ingredientsList = text.replace(removeNumberPattern, "").split(pattern);
  return ingredientsList
    .map((text) => text.trim())
    .filter((text) => {
      const shorterThan4 = text.length >= 4;
      return shorterThan4;
    });
}
