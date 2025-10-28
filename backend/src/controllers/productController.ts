import { Request, Response} from 'express';
import { Product } from '../types/product';
import { products, findProductById, createProduct, getAllProducts, updateProduct, deleteProduct} from '../data/products';
import { validateProductData } from '../utils/validation';

export class productController{
    static async getProducts(req: Request, res: Response): Promise<void>{
        const allProducts = getAllProducts();
        
        if(allProducts.length === 0){
            res.status(404).json({
                success: false,
                message: 'No product found'
            });
            return;
        }

        res.json({
            success: true,
            data: allProducts,
            count: allProducts.length
        })
    }

    static async getProductById(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const product = findProductById(id);

        if(!product){
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
            return; 
        }

        res.json({
            success: true,
            data: product
        });

    }

    static async createProduct(req: Request, res: Response): Promise<void>{
        const validation = validateProductData(req);
        
        if (!validation.isValid) {
            res.status(400).json({
                success: false,
                message: validation.message
            });
            return;
        }

        const { name, color, price, quantity, shopName, brand, description, category, images } = req.body;

        const productData = {
            name: name.trim(),
            color: color.trim(),
            price,
            quantity,
            shopName: shopName.trim(),
            brand: brand.trim(),
            description: description?.trim() || '',
            category: category.trim(),
            images
        };
        
        const newProduct = createProduct(productData);
        
        res.status(201).json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        });
    }

    static async updateProduct(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const updateData = req.body;

        const existingProduct = findProductById(id);

        if(!existingProduct){
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
            return;
        }

        const updatedProduct = updateProduct(id, updateData);

        res.json({
            success: true,
            data: updatedProduct,
            message: 'Product updated successfuly'
        })
    }

    static async deleteProduct(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const deletedProduct = deleteProduct(id);

        if(!deletedProduct){
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
            return;
        }

        res.json({
            success: true,
            data: deletedProduct,
            message: 'Product deleted successfuly'
        });
    }

    
}