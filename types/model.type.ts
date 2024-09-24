export interface User {
    name: string;
    age: number | null;
    department: string | null;
    salary: number | null;
    isMarried: boolean;
    isSeniorJob: boolean;
    id: number | null;
}

export interface UserAuth {
    id: number | null;
    name: string;
}

export type UserID = number | number[]

export type UserArray = [string ,number ,string ,number ,boolean ,boolean ,number | null];