import type { ProductData, ProductCardData, ProductCartDetail } from "./product";

export interface OrderDetail{
    id?: string;
    name: string;
    userId: string;
    totalProductPrice: number;
    totalShippingPrice: number;
    totalPrice: number;
    status: string;
    createdDate: Date;
    products: ProductCartDetail[];
}