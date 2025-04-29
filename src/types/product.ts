export interface ProductData {
  id?: string;
  productInfo : ProductInfo
  totalQuantity?: TotalQuantity
  status: boolean;
  variantType: string;
  variants?: ProductVariants[]
}

export interface ProductInfo {
  coverImg:string
  name: string
  price: number
  description: string
}

export interface TotalQuantity {
  remainQty: number
  serveQty?: number
  soldQty?: number
}

export interface ProductCardDetail  {
  id: string;
  coverImg: string;
  name: string;
  price: number;
  detail: string;
  remainQuantity: number
  colors?: ProductVariants[];
  sizes?: ProductVariants[];
}

export type ProductCardData = ProductInfo & {
  id:string
  remainQuantity: number
  variants: ProductVariants[]
}

export interface ProductCart {
  id: string;
  quantity: number | 0;
  variant: string | "";
  variantType: string;
}

export interface ProductCartDetail extends ProductCart {
  productInfo?: ProductInfo;
  totalPrice: number;
  remainQuantity: number;
}

export interface ProductVariants {
  name: string;
  enable: boolean;
  remainQuantity: number;
  serveQuantity?: number
  soldQuantity?: number
}
