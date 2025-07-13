import { Item } from "./item";

export interface User{
    id: number;
    userName: string;
    createdAt: Date;
    email: string;
    itens: Item[]
}

export interface newUser{
    id: number;
    userName: string;
    pass: string;
    createdAt: Date;
    email: string;
    itens: Item[]
}
