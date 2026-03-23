export interface ProductListEntity {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ProductEntity {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListEntity[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  selectedColor: ColorOption;
  selectedStorage: StorageOption;
  price: number;
}

export interface ProductsResponse {
  products: ProductListEntity[];
  total?: number;
}

export interface UseProductsState {
  products: ProductListEntity[];
  loading: boolean;
  error: string | null;
  total: number;
}

export interface UseProductDetailState {
  product: ProductEntity | null;
  loading: boolean;
  error: string | null;
}