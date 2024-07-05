export type DictionaryLicenseV2 = {
  name: string;
  url: string;
};

export type DictionaryPhoneticsV2 = {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: DictionaryLicenseV2;
};

export type DictionaryDefinitionV2 = {
  definition?: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
};

export type DictionaryMeaningV2 = {
  partOfSpeech?: string;
  definitions: DictionaryDefinitionV2[];
  synonyms: string[];
  antonyms: string[];
};

export type DictionaryResponseV2 = {
  word?: string;
  phonetic?: string;
  phonetics: DictionaryPhoneticsV2[];
  meanings: DictionaryMeaningV2[];
  sourceUrls: string[];
  license: DictionaryLicenseV2;
};
