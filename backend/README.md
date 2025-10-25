# TypeScript E-Commerce Backend API

## 📋 Project Overview

This is a backend API for an e-commerce application built with Express.js, TypeScript, and in-memory data storage. The system supports user authentication, product management, and a seller system.

## 🚀 Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **In-memory storage** - Data stored in arrays (no database yet)

## 📁 Project Structure

```
backend/
├── src/
│   ├── types/
│   │   └── user.ts              # Type definitions
│   ├── data/
│   │   └── users.ts             # In-memory user storage
│   ├── controllers/
│   │   └── authController.ts    # Authentication logic
│   ├── routes/
│   │   ├── auth.ts              # Auth endpoints
│   │   └── products.ts          # Product endpoints
│   └── app.ts                   # Main application file
├── package.json
└── tsconfig.json
```

## 📝 Step-by-Step Development Order

### Step 1: User Types and Models

**File: `src/types/user.ts`**

This file defines all TypeScript interfaces for user-related data.

#### What it does:
- **User Interface**: Defines the structure of a user object
  - `id`: Unique identifier
  - `firstName`, `lastName`: User's name
  - `email`: Login email
  - `password`: User's password (stored as-is for now)
  - `role`: User type (`seller` or `customer`)
  - `createdAt`, `updatedAt`: Timestamps

- **Seller Interface**: Extends User for sellers
  - `role`: Fixed as `seller`
  - `shopName`, `shopDescription`: Shop information
  - `isActive`: Active status

- **LoginRequest Interface**: Data structure for login API calls
- **RegisterRequest Interface**: Data structure for registration API calls

#### Key Code:
```typescript
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
```

---

### Step 2: In-Memory Data Storage

**File: `src/data/users.ts`**

This file manages user data storage in memory (arrays).

#### What it does:
- **users array**: Stores all registered users
- **nextId**: Counter for generating unique IDs
- **findUserByEmail()**: Searches for a user by email
- **createUser()**: Adds a new user to the array

#### Key Code:
```typescript
export const users: User[] = [];  // Empty array to store users

let nextId = 1;  // Auto-increment ID counter

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
    // Uses JavaScript's find() method to search array
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
        id: nextId.toString(),  // Convert to string
        ...userData,            // Spread user data
        createdAt: new Date(),  // Current timestamp
        updatedAt: new Date()
    };
    
    users.push(newUser);  // Add to array
    nextId++;             // Increment ID counter
    
    return newUser;
};
```

---

### Step 3: Authentication Controller

**File: `src/controllers/authController.ts`**

This class contains all authentication-related business logic.

#### What it does:

##### 1. **register()** - Register Function
- Receives registration data from request body
- Checks if email already exists
- Creates new user if email is unique
- Returns user data (without password)

**Step-by-step:**
```typescript
static async register(req: Request, res: Response): Promise<void> {
    try {
        // 1. Extract data from request body
        const { firstName, lastName, email, password, role } = req.body;
        
        // 2. Check if email already exists
        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exist'
            });
        }
        
        // 3. Create new user
        const newUser = createUser({
            firstName,
            lastName,
            email,
            password,
            role
        });
        
        // 4. Return success response with user data
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { ...newUser without password }
        });
    } catch (error) {
        // Handle errors
    }
}
```

##### 2. **login()** - Login Function
- Receives email and password
- Finds user by email
- Compares passwords
- Returns user data if credentials are correct

**Step-by-step:**
```typescript
static async login(req: Request, res: Response): Promise<void> {
    try {
        // 1. Extract email and password
        const { email, password } = req.body;
        
        // 2. Find user by email
        const existingUser = findUserByEmail(email);
        
        // 3. Check if user exists
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // 4. Check password (temporary simple comparison)
        if (existingUser.password !== password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }
        
        // 5. Return success with user data
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { ...user without password }
        });
    } catch (error) {
        // Handle errors
    }
}
```

---

### Step 4: Authentication Routes

**File: `src/routes/auth.ts`**

This file defines the HTTP endpoints for authentication.

#### What it does:
- Creates an Express router
- Maps HTTP methods and paths to controller functions
- **POST /register** → Calls `AuthController.register()`
- **POST /login** → Calls `AuthController.login()`

#### Key Code:
```typescript
import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();  // Create new router

// Define routes
router.post('/register', AuthController.register);  // POST /api/auth/register
router.post('/login', AuthController.login);       // POST /api/auth/login

export default router;  // Export for use in app.ts
```

---

### Step 5: Main Application Setup

**File: `src/app.ts`**

This is the main application file that ties everything together.

#### What it does:
1. **Imports**: Load required modules
2. **Middleware Setup**: Configure CORS, JSON parsing
3. **Routes**: Mount auth and product routes
4. **Server Start**: Listen on port 5000

#### Key Code:
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products';  // Import routes
import authRouter from './routes/auth';          // Import routes

dotenv.config();  // Load environment variables

const app = express();  // Create Express app
const PORT = process.env.PORT || 5000;  // Use PORT from .env or default 5000

// Middleware (executed before routes)
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON request bodies

// Routes
app.use('/api/products', productsRouter);  // Mount products routes
app.use('/api/auth', authRouter);          // Mount auth routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        message: 'E-commerce API is running!',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## 🔄 Request Flow Example: User Registration

1. **Client** → POST `/api/auth/register` with user data
2. **Express** → Matches route in `auth.ts`
3. **Router** → Calls `AuthController.register()`
4. **Controller** → Validates email doesn't exist
5. **Controller** → Calls `createUser()` from `users.ts`
6. **Data Layer** → Adds user to `users` array
7. **Controller** → Returns success response
8. **Client** ← Receives user data

---

## 🎯 Key Concepts Explained

### **What is a Controller?**
A controller handles the business logic for specific features. It processes requests, interacts with data, and returns responses.

### **What is a Route?**
Routes define the URL endpoints and map them to controller functions.

### **What is Middleware?**
Middleware functions run before routes. Examples:
- **CORS**: Allows frontend to call backend
- **express.json()**: Parses JSON request bodies

### **Why In-Memory Storage?**
For learning purposes, data is stored in arrays. In production, this would be a database (PostgreSQL, MongoDB, etc.).

---

## 🚀 Next Steps (Future Development)

1. **Database Integration**: Use Prisma with PostgreSQL
2. **Password Hashing**: Use bcrypt for secure passwords
3. **JWT Tokens**: Implement token-based authentication
4. **Product Management**: Add seller's product CRUD operations
5. **Order System**: Implement order creation and tracking
6. **Input Validation**: Use express-validator
7. **Error Handling**: Global error handler middleware

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Health Check
- `GET /api/health` - Check API status

---

## 🛠️ How to Run

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 💡 Tips for Building Similar Projects

1. **Start with Types**: Define your data structures first
2. **Build Data Layer**: Create storage and helper functions
3. **Create Controllers**: Implement business logic
4. **Add Routes**: Connect endpoints to controllers
5. **Test Incrementally**: Test each endpoint as you build

---

**Last Updated**: December 2024
