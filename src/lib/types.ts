export type AnswerType = "Text" | "Yes/No" | "Dropdown" | "Number";

export interface QuestionRow {
    id: number;
    category: string;
    property: string;
    description: string;
    answerType: AnswerType;
    options: string[];
    required: boolean;
    active: boolean;
}
