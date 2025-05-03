export interface ProductData {
    id?: string;
    productInfo: ProductInfo
    totalQuantity?: TotalQuantity
    status: boolean;
    variantType: string;
    variants?: ProductVariants[]
}

export interface ProductVariants {
    name: string;
    enable: boolean;
    remainQuantity: number;
    serveQuantity: number
    soldQuantity: number
}

export interface ProductDetail {
    id: string;
    quantity: number | 0;
    variant: string | "";
    variantType: string;
    productInfo?: ProductInfo;
    totalPrice: number;
    remainQuantity: number;
}

export type ProductCardData = ProductInfo & {
    id: string
    remainQuantity: number
    variantType: string
    variants: string[]
}

interface ProductInfo {
    coverImg: string
    name: string
    price: number
    description: string
}

interface TotalQuantity {
    remainQty: number
    serveQty?: number
    soldQty?: number
}

export interface OrderDetail {
    id?: string;
    customerName: string;
    userId: string;
    totalProductPrice: number;
    totalShippingPrice: number;
    totalPrice: number;
    status: string;
    createdDate: Date;
    products: ProductDetail[];
}