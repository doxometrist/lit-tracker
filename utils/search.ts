
export function searchTitles(query: string) {
  // todo first get the string of dictionary of titles
  // todo then run the search over that dictionary
}


export function searchDictionary(pattern: string, dictionary: string[]) {
  // Create regex pattern that excludes characters already present in word
  let excludeRegex = "";
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c != "?" && c != "_") {
      excludeRegex += "^" + c;
    }
  }
  excludeRegex = "[" + excludeRegex + "]";

  // Let question marks only match characters not already present in word
  let searchPattern = pattern.replace(/\?/g, excludeRegex);

  // Let underscores match anything
  searchPattern = "^" + searchPattern.replace(/\_/g, "[a-z]") + "$";

  // Find all words in dictionary that match pattern
  const matches = [];
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    if (word.match(new RegExp(searchPattern))) {
      matches.push(word);
    }
  }

  return matches;
}