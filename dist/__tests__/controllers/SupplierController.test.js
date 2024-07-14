import request from 'supertest';
import express from 'express';
import { SupplierController } from '../../controllers/SupplierController.js';
import { SupplierService } from '../../services/SupplierService.js';
import { SupplierDTO } from '../../dto/SupplierDTO.js';
jest.mock('../../services/SupplierService');
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
const supplierController = new SupplierController();
app.get('/supplier/:id', (req, res) => supplierController.getSupplierById(req, res));
app.get('/suppliers', (req, res) => supplierController.searchSuppliers(req, res));
app.post('/suppliers', (req, res) => supplierController.createSuppliers(req, res));
describe('SupplierController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('getSupplierById', () => {
        it('should return supplier when supplier exists', async () => {
            const mockSupplier = { id: 1, companyName: 'Test Supplier' };
            SupplierService.prototype.getSupplierById.mockResolvedValue(mockSupplier);
            const response = await request(app).get('/supplier/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSupplier);
            expect(SupplierService.prototype.getSupplierById).toHaveBeenCalledWith(1, expect.objectContaining({
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
            jest.spyOn(SupplierService.prototype, 'getSupplierById').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/supplier/1');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
    describe('searchSuppliers', () => {
        it('should return suppliers and total count', async () => {
            const suppliers = [{ id: 1, companyName: 'Test Supplier' }];
            const mockSuppliers = suppliers.map(supplier => new SupplierDTO(supplier));
            const mockTotal = [{ count: 1 }];
            jest.spyOn(SupplierService.prototype, 'searchSuppliers').mockResolvedValue({
                supplierDTOs: mockSuppliers,
                total: mockTotal
            });
            const response = await request(app).get('/suppliers').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: mockSuppliers,
                total: 1,
                page: 1,
                pageSize: 10,
                pageCount: 1
            });
            expect(SupplierService.prototype.searchSuppliers).toHaveBeenCalledWith(1, // page
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
            SupplierService.prototype.searchSuppliers.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/suppliers').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
});
//# sourceMappingURL=SupplierController.test.js.map