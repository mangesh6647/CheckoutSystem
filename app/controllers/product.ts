import { Product } from '../models';

// Fetches all products from the database and returns them
const getProducts = async (): Promise<any[]> => {
    return await Product.findAll({
        order: [['id', 'ASC']],
    });
};

// Creates a new product in the database and returns its ID
const createProduct = async (productName: string, price: number): Promise<number> => {
    let product = await Product.create({
        productName: productName,
        price: price,
    });
    return product.id;
};

export default {
    createProduct,
    getProducts
};
