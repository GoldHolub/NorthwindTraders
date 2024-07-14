import { ProductRepository } from "../repositories/ProductRepository.js";
import { ProductDTO } from "../dto/ProductDTO.js";
import fs from 'fs';
import csv from 'csv-parser';
import { SessionData } from "express-session";

export class ProductService {
    private productRepository = new ProductRepository();

    async getProductById(id: number, currentSession: SessionData) {
        return await this.productRepository.findProductByIdAndLog(id, currentSession);
    }

    async searchProducts(search: string, page: number, pageSize: number, currentSession: SessionData) {
        const { products, total } = await this.productRepository.searchProductsAndLog(search, page, pageSize, currentSession);
        const productDTOs = products.map(product => new ProductDTO(product));
        return { productDTOs, total }
    }

    async createProducts(productFilePath: string) {
        const products: any[] = [];
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
                } catch (error) {
                    fs.unlinkSync(productFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(productFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }
}
