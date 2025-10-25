export interface Product {
    id: string,
    name: string,
    color: string,
    price: number,
    quantity: number,
    shopName: string,
    brand: string,
    description: string,
    category: string,
    images: string[],
    createdAt: Date;
    updatedAt: Date;
}