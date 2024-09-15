export interface LineItems {
  price_data: {
    product_data: {
      name: string;
      description: string;
      images: string[];
    };
    currency: string;
    unit_amount: number;
  };
  quantity: number;
}
