import type { ProductCartDetail } from "./product";
import type { AddressInfo } from "./user";

export interface OrderDetail{
    id?: string;
    customerName: string;
    userId: string;
    totalProductPrice: number;
    totalShippingPrice: number;
    totalPrice: number;
    status: string;
    createdDate: Date;
    address: AddressInfo
    products: ProductCartDetail[];
}