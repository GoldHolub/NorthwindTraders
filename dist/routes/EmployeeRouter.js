import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController.js';
import multer from 'multer';
const router = Router();
const upload = multer({ dest: 'uploads/' });
const employeeController = new EmployeeController();
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of employees
 *     tags: [Employees]
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
 *                 employeeDTOs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDTO'
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
router.get('/', (req, res) => employeeController.searchEmployees(req, res));
/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
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
router.get('/:id', (req, res) => employeeController.getEmployeeById(req, res));
router.post('/', upload.single('file'), (req, res) => employeeController.createEmployees(req, res));
export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         employeeID:
 *           type: string
 *           example: "E001"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         firstName:
 *           type: string
 *           example: "John"
 *         title:
 *           type: string
 *           example: "Software Engineer"
 *         titleOfCourtesy:
 *           type: string
 *           example: "Mr."
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1980-01-01"
 *         hireDate:
 *           type: string
 *           format: date
 *           example: "2020-01-01"
 *         address:
 *           type: string
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           example: "Anytown"
 *         region:
 *           type: string
 *           example: "CA"
 *         postalCode:
 *           type: string
 *           example: "12345"
 *         country:
 *           type: string
 *           example: "USA"
 *         homePhone:
 *           type: string
 *           example: "(555) 555-5555"
 *         extension:
 *           type: string
 *           example: "1234"
 *         notes:
 *           type: string
 *           example: "Notes about the employee"
 *         reportsTo:
 *           type: string
 *           example: "ManagerID"
 *     EmployeeDTO:
 *       type: object
 *       properties:
 *         employeeId:
 *           type: string
 *           example: "E001"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         title:
 *           type: string
 *           example: "Software Engineer"
 *         city:
 *           type: string
 *           example: "Anytown"
 *         phone:
 *           type: string
 *           example: "(555) 555-5555"
 *         country:
 *           type: string
 *           example: "USA"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 */
//# sourceMappingURL=EmployeeRouter.js.map