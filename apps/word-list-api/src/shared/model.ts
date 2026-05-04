export interface ContainsMatchRequest {
    startsWith?: string;
    contains?: string;
    endsWith?: string;
    length?: number;
}

export type CharCount = { [key: string]: number };
