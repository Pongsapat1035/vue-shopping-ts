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
  quantity: number
  remainQty: number
  serveQty?: number
  usedQty?: number
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

export interface AdminProductFormData {
  coverImg: string;
  name: string;
  quantity?: number;
  quantityServe?: number;
  remainQuantity?: number;
  usedQuantity?: number;
  variantType: string;
  price: number;
  description: string;
  status?: boolean;
  colors: ProductVariants[];
  sizes: ProductVariants[];
}

export interface ProductVariants {
  name: string;
  enable: boolean;
  remainQuantity?: number;
  quantity?: number;
}
