import { User } from '../types/user';

export const users: User[] = [];

let nextId = 1;

export const findUserByEmail = (email: string) : User | undefined => {
    return users.find(user => user.email === email);
}

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
        id: nextId.toString(),
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    users.push(newUser);
    nextId++;

    return newUser;
}