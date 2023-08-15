import { Product } from '../models';

const getProducts = async (): Promise<any[]> => {
    return await Product.findAll({
        order: [['id', 'ASC']],
    });
};

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
