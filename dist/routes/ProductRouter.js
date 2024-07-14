import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';
import multer from 'multer';
const router = Router();
const upload = multer({ dest: 'uploads/' });
const productController = new ProductController();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for products
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productDTOs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductDTO'
 *                 total:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', (req, res) => productController.searchProducts(req, res));
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', upload.single('file'), (req, res) => productController.createProducts(req, res));
export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Chai"
 *         supplierID:
 *           type: integer
 *           example: 1
 *         categoryID:
 *           type: integer
 *           example: 1
 *         quantityPerUnit:
 *           type: string
 *           example: "10 boxes x 20 bags"
 *         unitPrice:
 *           type: number
 *           format: float
 *           example: 18.00
 *         unitsInStock:
 *           type: integer
 *           example: 39
 *         unitsOnOrder:
 *           type: integer
 *           example: 0
 *         reorderLevel:
 *           type: integer
 *           example: 10
 *         discontinued:
 *           type: integer
 *           example: 0
 *     ProductDTO:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Chai"
 *         quantityPerUnit:
 *           type: string
 *           example: "10 boxes x 20 bags"
 *         price:
 *           type: string
 *           example: "$18.00"
 *         stock:
 *           type: integer
 *           example: 39
 *         orders:
 *           type: integer
 *           example: 0
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */ 
//# sourceMappingURL=ProductRouter.js.map