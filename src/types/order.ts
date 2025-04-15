import type { AdminProductData } from "./product";

export interface OrderDetail{
    id: string;
    name: string;
    totalProductPrice: number;
    totalShippingPrice: number;
    totalPrice: number;
    status: string;
    createdDate: Date;
    products: AdminProductData[];
}