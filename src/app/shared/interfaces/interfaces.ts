export interface RegisterInput {
    email: string;
    password: string;
    username: string;
    country: string;
    university: string;
    studentId: string;
}

export interface LogInInput {
    email: string;
    password: string;
}

export interface User {
    email: string;
    username: string;
    country: string;
    university: string;
    studentId: string;
}
