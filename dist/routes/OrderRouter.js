import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';
import multer from 'multer';
const router = Router();
const upload = multer({ dest: 'uploads/' });
const orderController = new OrderController();
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Search orders
 *     tags: [Orders]
 *     parameters:
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
 *                 orderDTOsCompact:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderDTOCompact'
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', (req, res) => orderController.searchOrders(req, res));
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDTOFull'
 *       404:
 *         description: Order not found
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
router.get('/:id', (req, res) => orderController.getOrderById(req, res));
router.post('/', upload.single('file'), (req, res) => orderController.createOrders(req, res));
router.post('/details', upload.single('file'), (req, res) => orderController.createOrderDetails(req, res));
router.post('/shippers', upload.single('file'), (req, res) => orderController.createShippers(req, res));
router.delete('/all', (req, res) => orderController.deleteAllOrdersAndDetails(req, res));
export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDTOCompact:
 *       type: object
 *       properties:
 *         orderId:
 *           type: integer
 *         totalPrice:
 *           type: string
 *         totalProducts:
 *           type: integer
 *         totalQuantity:
 *           type: integer
 *         shippedDate:
 *           type: string
 *         shipName:
 *           type: string
 *         shipCity:
 *           type: string
 *         shipCountry:
 *           type: string
 *     OrderDTOFull:
 *       type: object
 *       properties:
 *         orderId:
 *           type: integer
 *         customerId:
 *           type: string
 *         shipName:
 *           type: string
 *         totalProducts:
 *           type: integer
 *         totalQuantity:
 *           type: integer
 *         totalPrice:
 *           type: string
 *         totalDiscount:
 *           type: string
 *         shipVia:
 *           type: string
 *         freight:
 *           type: string
 *         orderDate:
 *           type: string
 *         requiredDate:
 *           type: string
 *         shippedDate:
 *           type: string
 *         shipCity:
 *           type: string
 *         shipRegion:
 *           type: string
 *         shipPostalCode:
 *           type: string
 *         shipCountry:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               productName:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               orderPrice:
 *                 type: string
 *               totalPrice:
 *                 type: string
 *               discount:
 *                 type: string
 */ 
//# sourceMappingURL=OrderRouter.js.map