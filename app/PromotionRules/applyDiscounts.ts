import { CartItemWithPromotion } from '../controllers/cart';

export function applyPromotionRules(cartItem: CartItemWithPromotion): CartItemWithPromotion {
    const product = cartItem.product;
    const quantity = cartItem.quantity;

    let itemPrice = product.price * quantity;
    let itemDiscount = 0;
    // Apply promotion rules based on product type and quantity
    if (product.productName === 'A' && quantity >= 3) {
        const discountedSets = Math.floor(quantity / 3);
        // Calculate price for discounted sets and remaining items
        itemPrice = discountedSets * 75 + (quantity % 3) * product.price;
    } else if (product.productName === 'B' && quantity >= 2) {
        const discountedSets = Math.floor(quantity / 2);
        // Calculate price for discounted sets and remaining items
        itemPrice = discountedSets * 35 + (quantity % 2) * product.price;
    }
    // Calculate the total discount based on the original price and discounted price
    itemDiscount = product.price * quantity - itemPrice;

    return {
        ...cartItem,
        originalPrice: product.price * quantity,
        discountedPrice: itemPrice,
        discount: itemDiscount,
    };
}

// Applies additional discount based on the total price
export function applyAdditionalDiscount(totalPrice: number): number {
    // If total price is greater than Rs 150, apply an additional discount of Rs 20
    return totalPrice > 150 ? totalPrice - 20 : totalPrice;
}
