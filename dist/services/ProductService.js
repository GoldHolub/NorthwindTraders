import { ProductRepository } from "../repositories/ProductRepository.js";
import { ProductDTO } from "../dto/ProductDTO.js";
import fs from 'fs';
import csv from 'csv-parser';
export class ProductService {
    productRepository = new ProductRepository();
    async getProductById(id, currentSession) {
        return await this.productRepository.findProductByIdAndLog(id, currentSession);
    }
    async searchProducts(search, page, pageSize, currentSession) {
        const { products, total } = await this.productRepository.searchProductsAndLog(search, page, pageSize, currentSession);
        const productDTOs = products.map(product => new ProductDTO(product));
        return { productDTOs, total };
    }
    async createProducts(productFilePath) {
        const products = [];
        fs.createReadStream(productFilePath)
            .pipe(csv())
            .on('data', (data) => {
            products.push({
                productID: parseInt(data.ProductID),
                productName: data.ProductName,
                supplierID: parseInt(data.SupplierID),
                categoryID: parseInt(data.CategoryID),
                quantityPerUnit: data.QuantityPerUnit,
                unitPrice: parseFloat(data.UnitPrice),
                unitsInStock: parseInt(data.UnitsInStock),
                unitsOnOrder: parseInt(data.UnitsOnOrder),
                reorderLevel: parseInt(data.ReorderLevel),
                discontinued: parseInt(data.Discontinued),
            });
        })
            .on('end', async () => {
            try {
                await this.productRepository.createManyProducts(products);
                fs.unlinkSync(productFilePath);
                return 'CSV data has been successfully imported.';
            }
            catch (error) {
                fs.unlinkSync(productFilePath);
                console.error(error);
                return 'Error while saving data';
            }
        })
            .on('error', (error) => {
            fs.unlinkSync(productFilePath);
            console.error(error);
            return 'Error while reading the CSV file';
        });
    }
}
//# sourceMappingURL=ProductService.js.map