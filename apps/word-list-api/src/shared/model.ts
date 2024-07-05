export interface ContainsMatchRequest {
    startsWith?: string;
    contains?: string;
    endsWith?: string;
}

export type CharCount = { [key: string]: number };
