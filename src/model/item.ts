import { Offer } from "./offer";

export interface Item{
    id: number;
    name: string;
    imageUrl: string;
    untilAt: Date;
    offer: Offer;
}

export interface newItem{
    name: string;
    pass: string;
    untilAt: any;
    ownerId: number;
}
