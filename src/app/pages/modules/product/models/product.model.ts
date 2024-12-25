export interface ProductDetails {
  productName: string;
  modelNo: string;
  cho: string;
  aCode: string;
  janCode: string;
  quantity: string;
  arrangement: string;
  category: string;
  itemType: string;
  discount: string;
  sellingPrice: string;
  masterDiscount: string;
  stockAttribute: string;
  points: string;
  rank: string;
  unitPrice: string;
  unitPriceExcludingTax: string;
  totalPrice: string;
  makerName: string;
  rankValue: string;
}

export interface Product {
  productCode: string;
  productDetails: ProductDetails;
}
