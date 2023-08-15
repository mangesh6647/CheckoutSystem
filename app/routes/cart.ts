import { Router } from 'express';
import controller from '../controllers/cart';

const router = Router();

router.post('/', async (req, res, next) => {
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

router.get('/', async (req, res, next) => {
    try {
        const cartItems = await controller.getAllCartItems();
        res.status(200).send(cartItems);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as Error).message });
    }
})

export default router;