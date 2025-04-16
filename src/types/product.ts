export interface AdminProductData {
  id: string;
  coverImg: string;
  name: string;
  quantity?: number;
  quantityServe?: number;
  usedQuantity?: number;
  remainQuantity?: number;
  price: number;
  detail: string;
  status?: boolean;
  colors: ProductCheckBoxOption[];
  sizes: ProductCheckBoxOption[];
}

export interface ClientProductCard  {
  id: string;
  coverImg: string;
  name: string;
  price: number;
  detail: string;
  remainQuantity: number
  colors?: ProductCheckBoxOption[];
  sizes?: ProductCheckBoxOption[];
}

export interface AdminProductFormData {
  coverImg: string;
  name: string;
  quantity?: number;
  quantityServe?: number;
  remainQuantity?: number;
  usedQuantity?: number;
  price: number;
  detail: string;
  status?: boolean;
  colors: ProductCheckBoxOption[];
  sizes: ProductCheckBoxOption[];
}

export interface ProductCheckBoxOption {
  name: string;
  isCheck: boolean;
}
