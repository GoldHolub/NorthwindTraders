import request from 'supertest';
import express from 'express';
import { ProductController } from '../../controllers/ProductController.js';
import { ProductService } from '../../services/ProductService.js';
import { ProductDTO } from '../../dto/ProductDTO.js';

jest.mock('../../services/ProductService.js');

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

const productController = new ProductController();

app.get('/product/:id', (req, res) => productController.getProductById(req, res));
app.get('/products', (req, res) => productController.searchProducts(req, res));
app.post('/products', (req, res) => productController.createProducts(req, res));

describe('ProductController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getProductById', () => {
        it('should return product when product exists', async () => {
            const mockProduct = [{
                id: 1,
                productID: 100,
                productName: 'Test Product',
                supplierID: 10,
                supplierName: 'SomeName',
                categoryID: 20,
                quantityPerUnit: '10 boxes',
                unitPrice: '25.50',
                unitsInStock: 100,
                unitsOnOrder: 50,
                reorderLevel: 10,
                discontinued: 0
            }];

            jest.spyOn(ProductService.prototype, 'getProductById').mockResolvedValue(mockProduct);

            const response = await request(app).get('/product/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct);
            expect(ProductService.prototype.getProductById).toHaveBeenCalledWith(1, expect.objectContaining({
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
            jest.spyOn(ProductService.prototype, 'getProductById').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/product/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });

    describe('searchProducts', () => {
        it('should return products and total count', async () => {
            const products = [{
                id: 1,
                productID: 100,
                productName: 'Test Product',
                supplierID: 10,
                categoryID: 20,
                quantityPerUnit: '10 boxes',
                unitPrice: '25.50',
                unitsInStock: 100,
                unitsOnOrder: 50,
                reorderLevel: 10,
                discontinued: 0
            }];
            const mockProducts = products.map(product => new ProductDTO(product));
            const mockTotal = [{ count: 1 }];

            jest.spyOn(ProductService.prototype, 'searchProducts').mockResolvedValue({
                productDTOs: mockProducts,
                total: mockTotal
            });

            const response = await request(app).get('/products').query({ page: 1, pageSize: 10, search: 'test' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: mockProducts,
                total: 1,
                page: 1,
                pageSize: 10,
                pageCount: 1
            });

            expect(ProductService.prototype.searchProducts).toHaveBeenCalledWith(
                'test',
                1,
                10,
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
                })
            );
        });

        it('should return 500 when there is an error', async () => {
            jest.spyOn(ProductService.prototype, 'searchProducts').mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/products').query({ page: 1, pageSize: 10, search: 'test' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
});
