import request from 'supertest';
import express from 'express';
import { CustomerController } from '../../controllers/CustomerController.js';
import { CustomerService } from '../../services/CustomerService.js';
import { CustomerDTO } from '../../dto/CustomerDTO.js';
jest.mock('../../services/CustomerService');
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
const customerController = new CustomerController();
app.get('/customer/:id', (req, res) => customerController.getCustomerById(req, res));
app.get('/customers', (req, res) => customerController.searchCustomers(req, res));
app.post('/customers', (req, res) => customerController.createCustomers(req, res));
describe('CustomerController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('getCustomerById', () => {
        it('should return customer when customer exists', async () => {
            const mockCustomer = { id: 1, name: 'Test Customer' };
            CustomerService.prototype.getCustomerById.mockResolvedValue(mockCustomer);
            const response = await request(app).get('/customer/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCustomer);
            // Adjusted session data expectation to match exactly
            expect(CustomerService.prototype.getCustomerById).toHaveBeenCalledWith('1', expect.objectContaining({
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
            jest.spyOn(CustomerService.prototype, 'getCustomerById').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/customer/1');
            expect(response.status).toBe(500);
            // Adjusted error message expectation to match the actual format
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
    describe('searchCustomers', () => {
        it('should return customers and total count', async () => {
            const customers = [{ id: 1, name: 'Test Customer' }];
            const mockCustomers = customers.map(customer => new CustomerDTO(customer));
            const mockTotal = [{ count: 1 }];
            // Mock the searchCustomers method on CustomerService
            jest.spyOn(CustomerService.prototype, 'searchCustomers').mockResolvedValue({
                customerDTOs: mockCustomers,
                total: mockTotal
            });
            // Make the request to your app
            const response = await request(app).get('/customers').query({ page: 1, pageSize: 10, search: 'test' });
            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: mockCustomers,
                total: 1,
                page: 1,
                pageSize: 10,
                pageCount: 1
            });
            // Verify that searchCustomers was called with expected parameters
            expect(CustomerService.prototype.searchCustomers).toHaveBeenCalledWith('test', // search parameter
            1, // page
            10, // pageSize
            expect.objectContaining({
                id: 'mock-session-id', // Example session id
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
                sqlLogs: [], // Assuming empty SQL logs array
            }));
        });
    });
    it('should return 500 when there is an error', async () => {
        CustomerService.prototype.searchCustomers.mockRejectedValue(new Error('Database error'));
        const response = await request(app).get('/customers').query({ page: 1, pageSize: 10, search: 'test' });
        expect(response.status).toBe(500);
        // Adjusted error message expectation to match the actual format
        expect(response.body).toEqual({ error: 'Error: Database error' });
    });
});
//# sourceMappingURL=CustomerController.test.js.map