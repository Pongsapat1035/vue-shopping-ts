import type { ProductCartDetail } from "./product";

export interface OrderDetail{
    id?: string;
    customerName: string;
    userId: string;
    totalProductPrice: number;
    totalShippingPrice: number;
    totalPrice: number;
    status: string;
    createdDate: Date;
    products: ProductCartDetail[];
}