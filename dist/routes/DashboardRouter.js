import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController.js';
import multer from 'multer';
const dashboardController = new DashboardController();
const dashboardRouter = Router();
const upload = multer({ dest: 'uploads/' });
/**
 * @swagger
 * /dashboard/logs:
 *   get:
 *     summary: Get SQL logs
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sqlLogs:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
dashboardRouter.get('/logs', dashboardController.getLogs);
/**
 * @swagger
 * /dashboard/location:
 *   get:
 *     summary: Get location by IP
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *       400:
 *         description: Invalid IP address
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
dashboardRouter.get('/location', dashboardController.getLocation);
dashboardRouter.post('/location', upload.single('file'), dashboardController.saveIpLocationsToDb);
dashboardRouter.delete('/location', dashboardController.deleteIpLocationsTable);
export default dashboardRouter;
//# sourceMappingURL=DashboardRouter.js.map