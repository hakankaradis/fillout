export type FilterClauseType = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

export type ResponseFiltersType = FilterClauseType[];

export interface Question {
  id: string;
  name: string;
  type: string;
  value: string;
}

export interface Calculation {
  id: string;
  name: string;
  type: string;
  value: string;
}

export interface URLParameter {
  id: string;
  name: string;
  value: string;
}

export interface Quiz {
  score: number;
  maxScore: number;
}

export interface FormResponse {
  questions: Question[];
  calculations: Calculation[];
  urlParameters: URLParameter[];
  quiz?: Quiz;
  submissionId: string;
  submissionTime: string;
}

export interface ApiResponse {
  responses: FormResponse[];
  totalResponses: number;
  pageCount: number;
}
