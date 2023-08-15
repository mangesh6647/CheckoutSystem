import { Router } from 'express';
import controller from '../controllers/product';

const router = Router();
/**
 * @route GET /product
 * @desc Get all products
 * @returns  Response containing a list of products
 */
router.get('/', async (req, res, next) => {
    try {
        const products = await controller.getProducts();
        res.status(200).send(products);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as Error).message });
    }
});
/**
 * @route POST /product
 * @desc Create a new product
 * @param  productName - The name of the product
 * @param  price - The price of the product
 * @returns  Response indicating success or error
 */
router.post('/', async (req, res, next) => {
    try {
        const id = await controller.createProduct(req.body.productName, req.body.price);
        res.status(201).send({ msg: 'Product inserted', id: id });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
