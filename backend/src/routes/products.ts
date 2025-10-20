import { Router } from 'express';

const router = Router();

// Sample product data
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    price: 999,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300',
    stock: 10
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone',
    price: 899,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300',
    stock: 15
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    description: 'Lightweight and powerful laptop',
    price: 1199,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300',
    stock: 8
  }
];

// GET /api/products
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: products,
    count: products.length
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

export default router;
