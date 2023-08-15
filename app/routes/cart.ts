import { Router, Request, Response, NextFunction } from 'express';
import controller from '../controllers/cart';

const router = Router();

/**
 * @route POST /cart
 * @desc Add a product to the cart
 * @param  productId - The ID of the product to be added
 * @returns Response indicating success or error
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = parseInt(req.body.productId);
        const isItemAdded = await controller.addTocart(productId);
        if (!isItemAdded) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(201).send({ msg: 'Product inserted in the cart', productId: productId });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @route GET /cart
 * @desc Get all cart items with promotions
 * @returns Response containing cart items with promotions
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartItems = await controller.getAllCartItems();
        res.status(200).send(cartItems);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as Error).message });
    }
})

export default router;