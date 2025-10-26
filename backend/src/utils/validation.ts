export const validateProductData = (req: { body: any }) => {
    const { name, color, price, quantity, shopName, brand, description, category, images } = req.body;

    
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return {
            isValid: false,
            message: 'Product name is required and must be a non-empty string'
        };
    }
    
    if (!color || typeof color !== 'string' || color.trim() === '') {
        return {
            isValid: false,
            message: 'Product color is required and must be a non-empty string'
        };
    }
    
    if (price === undefined || typeof price !== 'number') {
        return {
            isValid: false,
            message: 'Price is required and must be a number'
        };
    }
    if (price <= 0) {
        return {
            isValid: false,
            message: 'Price must be greater than 0'
        };
    }
    
    if (quantity === undefined || typeof quantity !== 'number') {
        return {
            isValid: false,
            message: 'Quantity is required and must be a number'
        };
    }
    if (quantity < 0) {
        return {
            isValid: false,
            message: 'Quantity cannot be negative'
        };
    }
    
    if (!shopName || typeof shopName !== 'string' || shopName.trim() === '') {
        return {
            isValid: false,
            message: 'Shop name is required'
        };
    }
    
    if (!brand || typeof brand !== 'string' || brand.trim() === '') {
        return {
            isValid: false,
            message: 'Brand is required'
        };
    }
    
    if (description && (typeof description !== 'string' || description.length > 1000)) {
        return {
            isValid: false,
            message: 'Description must be a string and less than 1000 characters'
        };
    }
    
    if (!category || typeof category !== 'string' || category.trim() === '') {
        return {
            isValid: false,
            message: 'Category is required'
        };
    }
    
    if (!images || !Array.isArray(images)) {
        return {
            isValid: false,
            message: 'Images must be an array'
        };
    }
    if (images.length === 0) {
        return {
            isValid: false,
            message: 'At least one image is required'
        };
    }
    for (const image of images) {
        if (typeof image !== 'string') {
            return {
                isValid: false,
                message: 'All image URLs must be strings'
            };
        }
    }
    
    return { isValid: true };
};