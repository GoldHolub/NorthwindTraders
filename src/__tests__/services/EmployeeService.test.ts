import { SessionData } from "express-session";
import { EmployeeService } from "../../services/EmployeeService.js";
import { EmployeeRepository } from "../../repositories/EmployeeRepository.js";
import { EmployeeDTO } from "../../dto/EmployeeDTO.js";

jest.mock('../../repositories/EmployeeRepository.js');
jest.mock('fs');
jest.mock('csv-parser');

describe('EmployeeService', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let mockSession: SessionData;

    beforeEach(() => {
        employeeRepository = new EmployeeRepository();
        employeeService = new EmployeeService();
        employeeService['employeeRepository'] = employeeRepository;
        mockSession = { sqlLogs: [] } as unknown as SessionData;
    });

    describe('getEmployeeById', () => {
        test('should return employee when employee exists', async () => {
            const mockEmployee = [{
                id: 1,
                employeeID: '1',
                lastName: 'Doe',
                firstName: 'John',
                title: 'Manager',
                titleOfCourtesy: 'Mr.',
                birthDate: new Date('1980-01-01'),
                hireDate: new Date('2000-01-01'),
                address: '123 Test St',
                city: 'Test City',
                region: 'Test Region',
                postalCode: '12345',
                country: 'Test Country',
                homePhone: '123-456-7890',
                extension: '1234',
                notes: 'Test notes',
                reportsTo: '2',
                supervisorLastName: 'last',
                supervisorFirstName: 'first'
            }];
            jest.spyOn(employeeRepository, 'findEmployeeByIdAndLog').mockResolvedValue(mockEmployee);

            const result = await employeeService.getEmployeeById('1', mockSession);

            expect(result).toEqual(mockEmployee);
            expect(employeeRepository.findEmployeeByIdAndLog).toHaveBeenCalledWith('1', mockSession);
        });

        test('should throw an error when employee does not exist', async () => {
            jest.spyOn(employeeRepository, 'findEmployeeByIdAndLog').mockImplementation(() => {
                throw new Error('Employee not found by id: 1');
            });

            await expect(employeeService.getEmployeeById('1', mockSession)).rejects.toThrow('Employee not found by id: 1');
        });
    });

    describe('searchEmployees', () => {
        test('should return employees and total count', async () => {
            const mockEmployees = [{
                id: 1,
                employeeID: '1',
                lastName: 'Doe',
                firstName: 'John',
                title: 'Manager',
                titleOfCourtesy: 'Mr.',
                birthDate: new Date('1980-01-01'),
                hireDate: new Date('2000-01-01'),
                address: '123 Test St',
                city: 'Test City',
                region: 'Test Region',
                postalCode: '12345',
                country: 'Test Country',
                homePhone: '123-456-7890',
                extension: '1234',
                notes: 'Test notes',
                reportsTo: '2'
            }];
            const mockTotal = [{ count: 1 }];
            jest.spyOn(employeeRepository, 'searchEmployeesAndLog').mockResolvedValue({ employeesList: mockEmployees, total: mockTotal });

            const result = await employeeService.searchEmployees(1, 10, mockSession);

            expect(result).toEqual({
                employeeDTOs: mockEmployees.map(employee => new EmployeeDTO(employee)),
                total: mockTotal,
            });
            expect(employeeRepository.searchEmployeesAndLog).toHaveBeenCalledWith(1, 10, mockSession);
        });

        test('should throw an error when search fails', async () => {
            jest.spyOn(employeeRepository, 'searchEmployeesAndLog').mockImplementation(() => {
                throw new Error('Database query failed');
            });

            await expect(employeeService.searchEmployees(1, 10, mockSession)).rejects.toThrow('Database query failed');
        });
    });
});
