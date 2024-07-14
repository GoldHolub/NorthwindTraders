import { SessionData } from "express-session";
import { CustomerDTO } from "../../dto/CustomerDTO.js";
import { CustomerService } from "../../services/CustomerService.js";
import { CustomerRepository } from "../../repositories/CustomerRepository.js";

jest.mock('../../repositories/CustomerRepository.js');
jest.mock('fs');
jest.mock('csv-parser');

describe('CustomerService', () => {
    let customerService: CustomerService;
    let customerRepository: CustomerRepository;
    let mockSession: SessionData;

    beforeEach(() => {
        customerRepository = new CustomerRepository();
        customerService = new CustomerService();
        customerService['customerRepository'] = customerRepository;
        mockSession = { sqlLogs: [] } as unknown as SessionData;
    });

    describe('getCustomerById', () => {
        test('should return customer when customer exists', async () => {
            const mockCustomer =
                [{
                    customerID: '123', companyName: 'Test Company', contactName: null, contactTitle: null,
                    address: null, city: null, region: null, postalCode: null, country: null, phone: null, fax: null
                }];
            jest.spyOn(customerRepository, 'findCustomerByIdAndLog').mockResolvedValue(mockCustomer);

            const result = await customerService.getCustomerById('123', mockSession);

            expect(result).toEqual(mockCustomer);
            expect(customerRepository.findCustomerByIdAndLog).toHaveBeenCalledWith('123', mockSession);
        });

        test('should throw an error when customer does not exist', async () => {
            jest.spyOn(customerRepository, 'findCustomerByIdAndLog').mockImplementation(() => {
                throw new Error('Customer not found by id: 123');
            });

            await expect(customerService.getCustomerById('123', mockSession)).rejects.toThrow('Customer not found by id: 123');
        });
    });

    describe('searchCustomers', () => {
        test('should return customers and total count', async () => {
            const mockCustomers = [{ customerID: '123', companyName: 'Test Company', contactName: null, contactTitle: null, address: null, city: null, region: null, postalCode: null, country: null, phone: null, fax: null }];
            const mockTotal = [{ count: 1 }];
            jest.spyOn(customerRepository, 'searchCustomersAndLog').mockResolvedValue({ customers: mockCustomers, total: mockTotal });

            const result = await customerService.searchCustomers('test', 1, 10, mockSession);

            expect(result).toEqual({
                customerDTOs: mockCustomers.map(customer => new CustomerDTO(customer)),
                total: mockTotal,
            });
            expect(customerRepository.searchCustomersAndLog).toHaveBeenCalledWith('test', 1, 10, mockSession);
        });

        test('should throw an error when search fails', async () => {
            jest.spyOn(customerRepository, 'searchCustomersAndLog').mockImplementation(() => {
                throw new Error('Database query failed');
            });

            await expect(customerService.searchCustomers('test', 1, 10, mockSession)).rejects.toThrow('Database query failed');
        });
    });
});