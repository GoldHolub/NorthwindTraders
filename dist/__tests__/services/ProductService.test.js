import { ProductService } from "../../services/ProductService.js";
import { ProductRepository } from "../../repositories/ProductRepository.js";
import { ProductDTO } from "../../dto/ProductDTO.js";
jest.mock('../../repositories/ProductRepository.js');
jest.mock('fs');
jest.mock('csv-parser');
describe('ProductService', () => {
    let productService;
    let productRepository;
    let mockSession;
    beforeEach(() => {
        productRepository = new ProductRepository();
        productService = new ProductService();
        productService['productRepository'] = productRepository;
        mockSession = { sqlLogs: [] };
    });
    describe('getProductById', () => {
        test('should return product when product exists', async () => {
            const mockProduct = [{
                    id: 1,
                    productID: 1,
                    productName: 'Test Product',
                    supplierID: 1,
                    supplierName: 'SomeName',
                    categoryID: 1,
                    quantityPerUnit: '10 boxes',
                    unitPrice: '20.0',
                    unitsInStock: 100,
                    unitsOnOrder: 50,
                    reorderLevel: 10,
                    discontinued: 0
                }];
            jest.spyOn(productRepository, 'findProductByIdAndLog').mockResolvedValue(mockProduct);
            const result = await productService.getProductById(1, mockSession);
            expect(result).toEqual(mockProduct);
            expect(productRepository.findProductByIdAndLog).toHaveBeenCalledWith(1, mockSession);
        });
        test('should throw an error when product does not exist', async () => {
            jest.spyOn(productRepository, 'findProductByIdAndLog').mockImplementation(() => {
                throw new Error('Product not found by id: 1');
            });
            await expect(productService.getProductById(1, mockSession)).rejects.toThrow('Product not found by id: 1');
        });
    });
    describe('searchProducts', () => {
        test('should return products and total count', async () => {
            const mockProducts = [{
                    id: 2,
                    productID: 1,
                    productName: 'Test Product',
                    supplierID: 1,
                    categoryID: 1,
                    quantityPerUnit: '10 boxes',
                    unitPrice: '20.0',
                    unitsInStock: 100,
                    unitsOnOrder: 50,
                    reorderLevel: 10,
                    discontinued: 0
                }];
            const mockTotal = [{ count: 1 }];
            jest.spyOn(productRepository, 'searchProductsAndLog').mockResolvedValue({ products: mockProducts, total: mockTotal });
            const result = await productService.searchProducts('test', 1, 10, mockSession);
            expect(result).toEqual({
                productDTOs: mockProducts.map(product => new ProductDTO(product)),
                total: mockTotal,
            });
            expect(productRepository.searchProductsAndLog).toHaveBeenCalledWith('test', 1, 10, mockSession);
        });
        test('should throw an error when search fails', async () => {
            jest.spyOn(productRepository, 'searchProductsAndLog').mockImplementation(() => {
                throw new Error('Database query failed');
            });
            await expect(productService.searchProducts('test', 1, 10, mockSession)).rejects.toThrow('Database query failed');
        });
    });
});
//# sourceMappingURL=ProductService.test.js.map