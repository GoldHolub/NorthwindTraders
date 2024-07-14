import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product.js';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
const router = Router();
const upload = multer({ dest: 'uploads/' });
router.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const productRepository = getRepository(Product);
    try {
        const [products, total] = await productRepository.findAndCount({
            skip,
            take: limit,
        });
        res.status(200).send({
            data: products,
            total,
            page,
            pageCount: Math.ceil(total / limit),
        });
    }
    catch (error) {
        res.status(500).send({ error: 'Error fetching products' });
    }
});
router.get('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const productRepository = getRepository(Product);
    try {
        const product = await productRepository.findOneBy({ id: productId });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({ error: 'Error fetching product' });
    }
});
router.post('/product', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    const productRepository = getRepository(Product);
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
        const product = new Product();
        product.productID = parseInt(data.ProductID);
        product.productName = data.ProductName;
        product.supplierID = parseInt(data.SupplierID);
        product.categoryID = parseInt(data.CategoryID);
        product.quantityPerUnit = data.QuantityPerUnit;
        product.unitPrice = parseFloat(data.UnitPrice);
        product.unitsInStock = parseInt(data.UnitsInStock);
        product.unitsOnOrder = parseInt(data.UnitsOnOrder);
        product.reorderLevel = parseInt(data.ReorderLevel);
        product.discontinued = parseInt(data.Discontinued);
        results.push(product);
    })
        .on('end', async () => {
        await productRepository.save(results);
        fs.unlinkSync(filePath); // Remove the file after processing
        res.status(201).json({ message: 'CSV data has been successfully imported.' });
    })
        .on('error', (error) => {
        fs.unlinkSync(filePath); // Remove the file if there's an error
        res.status(500).json({ message: 'Error while reading the CSV file', error });
    });
});
export default router;
//# sourceMappingURL=OrdersRouter.js.map