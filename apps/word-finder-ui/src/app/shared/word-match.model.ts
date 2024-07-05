import { RequireAtLeastOne } from './shared.model';

export type WordMatchResponse = string[];

export type ContainsMatchRequest = RequireAtLeastOne<
  {
    startsWith?: string;
    contains?: string;
    endsWith?: string;
  },
  'startsWith' | 'contains' | 'endsWith'
>;
