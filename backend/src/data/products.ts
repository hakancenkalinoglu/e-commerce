import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    color: 'Space Black',
    price: 999,
    quantity: 10,
    shopName: 'Apple Store',
    brand: 'Apple',
    description: 'Latest iPhone with advanced features and titanium design',
    category: 'Electronics',
    images: [
      'https://via.placeholder.com/300x300',
      'https://via.placeholder.com/300x300'
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    color: 'Titanium Gray',
    price: 899,
    quantity: 15,
    shopName: 'Samsung Store',
    brand: 'Samsung',
    description: 'Premium Android smartphone with AI features',
    category: 'Electronics',
    images: [
      'https://via.placeholder.com/300x300',
      'https://via.placeholder.com/300x300'
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    color: 'Space Gray',
    price: 1199,
    quantity: 8,
    shopName: 'Apple Store',
    brand: 'Apple',
    description: 'Lightweight and powerful laptop with M2 chip',
    category: 'Electronics',
    images: [
      'https://via.placeholder.com/300x300',
      'https://via.placeholder.com/300x300'
    ],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

let nextId = 4;

export const findProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const createProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
  const newProduct: Product = {
    id: nextId.toString(),
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  products.push(newProduct);
  nextId++;

  return newProduct;
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const deleteProduct = (id: string): Product | undefined => {
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    return undefined;
}
  const deletedProduct = products[index];
  products.splice(index, 1);
      
  return deletedProduct;
}

export const updateProduct = (id: string, updateData: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | undefined => {
  const index = products.findIndex(product => product.id === id);

  if(index === -1){
    return undefined;
  }

  const existingProduct = products[index];
  
  const updatedProduct: Product = {
    ...existingProduct,
    ...updateData,
    updatedAt: new Date()
  };

  products[index] = updatedProduct;

  return updatedProduct;
}