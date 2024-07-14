import { Router } from 'express';
import { SupplierController } from '../controllers/SupplierController.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const supplierController = new SupplierController();
/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get a list of suppliers
 *     tags: [Suppliers]
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
 *                 supplierDTOs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SupplierDTO'
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
router.get('/', (req, res) => supplierController.searchSuppliers(req, res));

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The supplier ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
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
router.get('/:id', (req, res) => supplierController.getSupplierById(req, res));
router.post('/', upload.single('file'), (req, res) => supplierController.createSuppliers(req, res));

export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         supplierID:
 *           type: integer
 *           example: 1
 *         companyName:
 *           type: string
 *           example: "Exotic Liquids"
 *         contactName:
 *           type: string
 *           example: "Charlotte Cooper"
 *         contactTitle:
 *           type: string
 *           example: "Purchasing Manager"
 *         address:
 *           type: string
 *           example: "49 Gilbert St."
 *         city:
 *           type: string
 *           example: "London"
 *         region:
 *           type: string
 *           example: "Western Europe"
 *         postalCode:
 *           type: string
 *           example: "EC1 4SD"
 *         country:
 *           type: string
 *           example: "UK"
 *         phone:
 *           type: string
 *           example: "(171) 555-2222"
 *         fax:
 *           type: string
 *           example: "(171) 555-2223"
 *         homePage:
 *           type: string
 *           example: "http://www.exoticliquids.com"
 *     SupplierDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         companyName:
 *           type: string
 *           example: "Exotic Liquids"
 *         contactName:
 *           type: string
 *           example: "Charlotte Cooper"
 *         contactTitle:
 *           type: string
 *           example: "Purchasing Manager"
 *         city:
 *           type: string
 *           example: "London"
 *         country:
 *           type: string
 *           example: "UK"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */
