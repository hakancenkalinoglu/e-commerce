import { Request, Response} from 'express';
import { Product } from '../types/product';
import { products, findProductById, createProduct, getAllProducts} from '../data/products';

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
        const productData = req.body;
        const newProduct = createProduct(productData);
        
        res.status(201).json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        });
    }
}