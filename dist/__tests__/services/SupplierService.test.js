import { SupplierService } from "../../services/SupplierService.js";
import { SupplierRepository } from "../../repositories/SupplierRepository.js";
import { SupplierDTO } from "../../dto/SupplierDTO.js";
jest.mock('../../repositories/SupplierRepository.js');
jest.mock('fs');
jest.mock('csv-parser');
describe('SupplierService', () => {
    let supplierService;
    let supplierRepository;
    let mockSession;
    beforeEach(() => {
        supplierRepository = new SupplierRepository();
        supplierService = new SupplierService();
        supplierService['supplierRepository'] = supplierRepository;
        mockSession = { sqlLogs: [] };
    });
    describe('getSupplierById', () => {
        test('should return supplier when supplier exists', async () => {
            const mockSupplier = [{
                    id: 1,
                    supplierID: 1,
                    companyName: 'Test Supplier',
                    contactName: 'John Doe',
                    contactTitle: 'Manager',
                    address: '123 Test St',
                    city: 'Test City',
                    region: 'Test Region',
                    postalCode: '12345',
                    country: 'Test Country',
                    phone: '123-456-7890',
                    fax: '123-456-7891',
                    homePage: 'www.test.com'
                }];
            jest.spyOn(supplierRepository, 'findSupplierByIdAndLog').mockResolvedValue(mockSupplier);
            const result = await supplierService.getSupplierById(1, mockSession);
            expect(result).toEqual(mockSupplier);
            expect(supplierRepository.findSupplierByIdAndLog).toHaveBeenCalledWith(1, mockSession);
        });
        test('should throw an error when supplier does not exist', async () => {
            jest.spyOn(supplierRepository, 'findSupplierByIdAndLog').mockImplementation(() => {
                throw new Error('Supplier not found by id: 1');
            });
            await expect(supplierService.getSupplierById(1, mockSession)).rejects.toThrow('Supplier not found by id: 1');
        });
    });
    describe('searchSuppliers', () => {
        test('should return suppliers and total count', async () => {
            const mockSuppliers = [{
                    id: 1,
                    supplierID: 1,
                    companyName: 'Test Supplier',
                    contactName: 'John Doe',
                    contactTitle: 'Manager',
                    address: '123 Test St',
                    city: 'Test City',
                    region: 'Test Region',
                    postalCode: '12345',
                    country: 'Test Country',
                    phone: '123-456-7890',
                    fax: '123-456-7891',
                    homePage: 'www.test.com'
                }];
            const mockTotal = [{ count: 1 }];
            jest.spyOn(supplierRepository, 'searchSuppliersAndLog').mockResolvedValue({ suppliersList: mockSuppliers, total: mockTotal });
            const result = await supplierService.searchSuppliers(1, 10, mockSession);
            expect(result).toEqual({
                supplierDTOs: mockSuppliers.map(supplier => new SupplierDTO(supplier)),
                total: mockTotal,
            });
            expect(supplierRepository.searchSuppliersAndLog).toHaveBeenCalledWith(1, 10, mockSession);
        });
        test('should throw an error when search fails', async () => {
            jest.spyOn(supplierRepository, 'searchSuppliersAndLog').mockImplementation(() => {
                throw new Error('Database query failed');
            });
            await expect(supplierService.searchSuppliers(1, 10, mockSession)).rejects.toThrow('Database query failed');
        });
    });
});
//# sourceMappingURL=SupplierService.test.js.map