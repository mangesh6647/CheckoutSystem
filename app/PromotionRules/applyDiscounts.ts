import { CartItemWithPromotion } from '../controllers/cart';

export function applyPromotionRules(cartItem: CartItemWithPromotion): CartItemWithPromotion {
    const product = cartItem.product;
    const quantity = cartItem.quantity;

    let itemPrice = product.price * quantity;
    let itemDiscount = 0;

    if (product.productName === 'A' && quantity >= 3) {
        const discountedSets = Math.floor(quantity / 3);
        itemPrice = discountedSets * 75 + (quantity % 3) * product.price;
    } else if (product.productName === 'B' && quantity >= 2) {
        const discountedSets = Math.floor(quantity / 2);
        itemPrice = discountedSets * 35 + (quantity % 2) * product.price;
    }

    itemDiscount = product.price * quantity - itemPrice;

    return {
        ...cartItem,
        originalPrice: product.price * quantity,
        discountedPrice: itemPrice,
        discount: itemDiscount,
    };
}

export function applyAdditionalDiscount(totalPrice: number): number {
    return totalPrice > 150 ? totalPrice - 20 : totalPrice;
}
