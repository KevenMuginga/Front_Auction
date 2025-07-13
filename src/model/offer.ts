import { Item } from "./item";
import { User } from "./user";

export interface Offer{
    id: number;
    value: number;
    pass: string;
    createdAt: Date;
    item: Item;
    user: User;
}

export interface NewOffer{
    value: number;
    pass: string;
    itemId: number;
    userId: number;
}