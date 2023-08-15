import { applyAdditionalDiscount, applyPromotionRules } from '../PromotionRules/applyDiscounts';
import { Product, CartItem } from '../models';

// Represents an item in the cart with applied promotion rules
export interface CartItemWithPromotion {
    product: Product;
    quantity: number;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
}
// Represents the response format when fetching cart items
interface CartResponse {
    cartItems: CartItemWithPromotion[];
    totalPrice: number;
    totalDiscount: number;
}


// Function to add a product to the cart
const addTocart = async (productId: number): Promise<boolean> => {
    try {
        // Find the product by its ID
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

        return true; // Indicates successful addition to cart
    } catch (error) {
        throw error;
    }
};
// Function to get all cart items with applied promotion rules
const getAllCartItems = async (): Promise<CartResponse> => {
    try {
        // Fetch all cart items from the database
        const cartItems = await CartItem.findAll({
            order: [['id', 'ASC']],
        });

        const cartItemsWithPromotions: CartItemWithPromotion[] = [];

        for (const cartItem of cartItems) {

            // Find the product associated with the cart item
            const product = await Product.findByPk(cartItem.productId);

            if (product === null) {
                throw new Error('Product not found');
            }

            const cartItemWithPromotion: CartItemWithPromotion = {
                product,
                quantity: cartItem.quantity,
                originalPrice: 0,
                discountedPrice: 0,
                discount: 0,
            };
            // Apply promotion rules to the cart item
            cartItemsWithPromotions.push(applyPromotionRules(cartItemWithPromotion));
        }
        // Calculating total price, total discount, and final total price
        const totalPrice = cartItemsWithPromotions.reduce((total, item) => total + item.discountedPrice, 0);
        const totalDiscount = cartItemsWithPromotions.reduce((total, item) => total + item.discount, 0);
        const finalTotalPrice = applyAdditionalDiscount(totalPrice);

        return {
            cartItems: cartItemsWithPromotions,
            totalPrice: finalTotalPrice,
            totalDiscount,
        };

    } catch (error) {
        throw error;
    }
}


export default {
    addTocart,
    getAllCartItems
};

