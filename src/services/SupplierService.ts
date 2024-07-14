import { SupplierRepository } from "../repositories/SupplierRepository.js";
import { SupplierDTO } from "../dto/SupplierDTO.js";
import fs from 'fs';
import csv from 'csv-parser';
import { SessionData } from "express-session";

export class SupplierService {
    private supplierRepository = new SupplierRepository();

    async getSupplierById(id: number, currentSession: SessionData) {
        return await this.supplierRepository.findSupplierByIdAndLog(id, currentSession);
    }

    async searchSuppliers(page: number, pageSize: number, currentSession: SessionData) {
        const { suppliersList, total } = await this.supplierRepository.searchSuppliersAndLog(page, pageSize, currentSession);
        const supplierDTOs = suppliersList.map(supplier => new SupplierDTO(supplier));
        return { supplierDTOs, total }
    }

    async createSuppliers(supplierFilePath: string) {
        const suppliers: any[] = [];
        fs.createReadStream(supplierFilePath)
            .pipe(csv())
            .on('data', (data) => {
                suppliers.push({
                    supplierID: parseInt(data.SupplierID),
                    companyName: data.CompanyName,
                    contactName: data.ContactName,
                    contactTitle: data.ContactTitle,
                    address: data.Address,
                    city: data.City,
                    region: data.Region,
                    postalCode: data.PostalCode,
                    country: data.Country,
                    phone: data.Phone,
                    fax: data.Fax,
                    homePage: data.HomePage,
                });
            })
            .on('end', async () => {
                try {
                    await this.supplierRepository.createManySuppliers(suppliers);
                    fs.unlinkSync(supplierFilePath);
                    return 'CSV data has been successfully imported.';
                } catch (error) {
                    fs.unlinkSync(supplierFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(supplierFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }
}
