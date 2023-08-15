import { Router } from 'express';
import controller from '../controllers/product';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const products = await controller.getProducts();
        res.status(200).send(products);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const id = await controller.createProduct(req.body.productName, req.body.price);
        res.status(201).send({ msg: 'Product inserted', id: id });
    } catch (error) {
        next(error);
    }
});

export default router;
