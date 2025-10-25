export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'seller' | 'customer';
    createdAt: Date;
    updatedAt: Date;
}

export interface Seller extends User {
    role: 'seller';
    shopName?: string;
    shopDescription?: string;
    isActive: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'seller' | 'customer';
}