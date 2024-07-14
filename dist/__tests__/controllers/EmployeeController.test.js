import request from 'supertest';
import express from 'express';
import { EmployeeController } from '../../controllers/EmployeeController.js';
import { EmployeeService } from '../../services/EmployeeService.js';
import { EmployeeDTO } from '../../dto/EmployeeDTO.js';
jest.mock('../../services/EmployeeService');
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
const employeeController = new EmployeeController();
app.get('/employee/:id', (req, res) => employeeController.getEmployeeById(req, res));
app.get('/employees', (req, res) => employeeController.searchEmployees(req, res));
app.post('/employees', (req, res) => employeeController.createEmployees(req, res));
describe('EmployeeController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('getEmployeeById', () => {
        it('should return employee when employee exists', async () => {
            const mockEmployee = [{
                    id: 1,
                    employeeID: 'E123',
                    lastName: 'Doe',
                    firstName: 'John',
                    title: 'Manager',
                    titleOfCourtesy: 'Mr.',
                    birthDate: new Date('1990-01-01'),
                    hireDate: new Date('2020-01-01'),
                    address: '123 Main St',
                    city: 'Anytown',
                    region: 'State',
                    postalCode: '12345',
                    country: 'Country',
                    homePhone: '123-456-7890',
                    extension: '123',
                    notes: 'Notes here',
                    reportsTo: '2',
                }];
            jest.spyOn(EmployeeService.prototype, 'getEmployeeById').mockResolvedValue(mockEmployee);
            const response = await request(app).get('/employee/1');
            const expectedResult = [{
                    id: 1,
                    employeeID: 'E123',
                    lastName: 'Doe',
                    firstName: 'John',
                    title: 'Manager',
                    titleOfCourtesy: 'Mr.',
                    birthDate: "1990-01-01T00:00:00.000Z",
                    hireDate: "2020-01-01T00:00:00.000Z",
                    address: '123 Main St',
                    city: 'Anytown',
                    region: 'State',
                    postalCode: '12345',
                    country: 'Country',
                    homePhone: '123-456-7890',
                    extension: '123',
                    notes: 'Notes here',
                    reportsTo: '2',
                }];
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResult);
            expect(EmployeeService.prototype.getEmployeeById).toHaveBeenCalledWith('1', expect.objectContaining({
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
            jest.spyOn(EmployeeService.prototype, 'getEmployeeById').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/employee/1');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
    describe('searchEmployees', () => {
        it('should return employees and total count', async () => {
            const employees = [{ id: 1, name: 'Test Employee' }];
            const mockEmployees = employees.map(employee => new EmployeeDTO(employee));
            const mockTotal = [{ count: 1 }];
            jest.spyOn(EmployeeService.prototype, 'searchEmployees').mockResolvedValue({
                employeeDTOs: mockEmployees,
                total: mockTotal,
            });
            const response = await request(app).get('/employees').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                data: mockEmployees,
                total: 1,
                page: 1,
                pageSize: 10,
                pageCount: 1,
            });
            expect(EmployeeService.prototype.searchEmployees).toHaveBeenCalledWith(1, 10, expect.objectContaining({
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
            jest.spyOn(EmployeeService.prototype, 'searchEmployees').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/employees').query({ page: 1, pageSize: 10 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Database error' });
        });
    });
});
//# sourceMappingURL=EmployeeController.test.js.map