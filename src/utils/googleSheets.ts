// Define product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats" | "all";
  requiresFallbackImage?: boolean;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`);
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}; 