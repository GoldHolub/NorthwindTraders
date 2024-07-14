import request from 'supertest';
import express from 'express';
import { OrderController } from '../../controllers/OrderController.js';
import { OrderService } from '../../services/OrderService.js';
import OrderDTOCompact from '../../dto/OrderDTOCompact.js';
import OrderDTOFull from '../../dto/OrderDTOFull.js';
jest.mock('../../services/OrderService');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.session = {
        id: 'mock-session-id',
        cookie: {
            originalMaxAge: 200,
            maxAge: 200,
            expires: new Date(Date.now() + 200),
            secure: false,
            httpOnly: true,
            domain: undefined,
            path: '/',
            sameSite: 'lax',
            // @ts-ignore
            resetMaxAge: jest.fn(),
            resetExpires: jest.fn(),
        },
        regenerate: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(),
        save: jest.fn(),
        touch: jest.fn(),
        sqlLogs: [],
    };
    next();
});
const orderController = new OrderController();
app.get('/order/:id', (req, res) => orderController.getOrderById(req, res));
app.get('/orders', (req, res) => orderController.searchOrders(req, res));
describe('OrderController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('getOrderById', () => {
        it('should return order when order exists', async () => {
            const mockOrder = new OrderDTOFull([{
                    orderID: 1,
                    customerID: 'CUST1',
                    shipName: 'Ship1',
                    totalProducts: 5,
                    shipVia: 'Carrier1',
                    freight: '100.00',
                    orderDate: '2023-01-01',
                    requiredDate: '2023-01-10',
                    shippedDate: '2023-01-05',
                    shipCity: 'City1',
                    shipRegion: 'Region1',
                    shipPostalCode: 'Postal1',
                    shipCountry: 'Country1'
                }], []);
            OrderService.prototype.getOrderById.mockResolvedValue(mockOrder);
            const response = await request(app).get('/order/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrder);
            expect(OrderService.prototype.getOrderById).toHaveBeenCalledWith(1, expect.objectContaining({
                id: 'mock-session-id',
                cookie: expect.objectContaining({
                    originalMaxAge: 200,
                    maxAge: 200,
                    expires: expect.any(Date),
                    secure: false,
                    httpOnly: true,
                    domain: undefined,
                    path: '/',
                    sameSite: 'lax',
                    resetMaxAge: expect.any(Function),
                    resetExpires: expect.any(Function),
                }),
                regenerate: expect.any(Function),
                destroy: expect.any(Function),
                reload: expect.any(Function),
                save: expect.any(Function),
                touch: expect.any(Function),
                sqlLogs: [],
            }));
        });
        it('should return 500 when there is an error', async () => {
            jest.spyOn(OrderService.prototype, 'getOrderById').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/order/1');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
    describe('searchOrders', () => {
        it('should return orders and total count', async () => {
            const orders = [{ orderId: 1, totalPrice: '100.00', totalProducts: 5, totalQuantity: 10,
                    shippedDate: new Date('2023-01-05'), shipName: 'Ship1', shipCity: 'City1', shipCountry: 'Country1' }];
            const mockOrders = orders.map(order => new OrderDTOCompact(order));
            const mockTotal = [{ count: 1 }];
            jest.spyOn(OrderService.prototype, 'searchOrders').mockResolvedValue({
                orderDTOsCompact: mockOrders,
                total: mockTotal
            });
            const response = await request(app).get('/orders').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: mockOrders,
                total: 1,
                page: 1,
                pageSize: 10,
                pageCount: 1
            });
            expect(OrderService.prototype.searchOrders).toHaveBeenCalledWith(1, // page
            10, // pageSize
            expect.objectContaining({
                id: 'mock-session-id',
                cookie: expect.objectContaining({
                    originalMaxAge: 200,
                    maxAge: 200,
                    expires: expect.any(Date),
                    secure: false,
                    httpOnly: true,
                    domain: undefined,
                    path: '/',
                    sameSite: 'lax',
                    resetMaxAge: expect.any(Function),
                    resetExpires: expect.any(Function),
                }),
                regenerate: expect.any(Function),
                destroy: expect.any(Function),
                reload: expect.any(Function),
                save: expect.any(Function),
                touch: expect.any(Function),
                sqlLogs: [],
            }));
        });
        it('should return 500 when there is an error', async () => {
            OrderService.prototype.searchOrders.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/orders').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error fetching orders' });
        });
    });
});
//# sourceMappingURL=OrderController.test.js.map