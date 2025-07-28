// types/index.ts - Shared types and interfaces

export interface ValidationRule {
    test: (value: string) => boolean;
    message: string;
}

export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}