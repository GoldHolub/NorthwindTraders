import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController.js';
import multer from 'multer';


const customerController = new CustomerController();
const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get a list of customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for customers
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
 *                 customerDTOs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CustomerDTO'
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
router.get('/', customerController.searchCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
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
router.get('/:id', customerController.getCustomerById);
router.post('/', upload.single('file'), customerController.createCustomers);

export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           example: "123"
 *         company:
 *           type: string
 *           example: "Test Company"
 *         contact:
 *           type: string
 *           example: "John Doe"
 *         title:
 *           type: string
 *           example: "Manager"
 *         address:
 *           type: string
 *           example: "123 Test St"
 *         city:
 *           type: string
 *           example: "Test City"
 *         region:
 *           type: string
 *           example: "Test Region"
 *         postalCode:
 *           type: string
 *           example: "12345"
 *         country:
 *           type: string
 *           example: "Test Country"
 *         phone:
 *           type: string
 *           example: "123-456-7890"
 *         fax:
 *           type: string
 *           example: "123-456-7891"
 *     CustomerDTO:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           example: "123"
 *         company:
 *           type: string
 *           example: "Test Company"
 *         contact:
 *           type: string
 *           example: "John Doe"
 *         title:
 *           type: string
 *           example: "Manager"
 *         city:
 *           type: string
 *           example: "Test City"
 *         country:
 *           type: string
 *           example: "Test Country"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */
