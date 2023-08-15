import { Product, CartItem } from '../models';

const addTocart = async (productId: number): Promise<boolean> => {
    try {
        const product = await Product.findByPk(productId);

        if (product === null) {
            throw new Error('Product not found');
        }
        // Check if the product is already in the cart
        let cartItem = await CartItem.findOne({ where: { productId } });

        if (cartItem) {
            // If the product is in the cart, increment the quantity
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // If the product is not in the cart, create a new cart item
            await CartItem.create({ productId });
        }

        return true;
    } catch (error) {
        throw error;
    }
};

const getAllCartItems = async (): Promise<any[]> => {
    try {
        return await CartItem.findAll({
            order: [['id', 'ASC']],
        });
    } catch (error) {
        throw error;
    }
}


export default {
    addTocart,
    getAllCartItems
};

