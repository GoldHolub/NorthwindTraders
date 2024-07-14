import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { CustomerDTO } from "../dto/CustomerDTO.js";
import fs from 'fs';
import csv from 'csv-parser';
export class CustomerService {
    customerRepository = new CustomerRepository();
    async getCustomerById(id, currentSession) {
        return await this.customerRepository.findCustomerByIdAndLog(id, currentSession);
    }
    async searchCustomers(search, page, pageSize, currentSession) {
        const { customers, total } = await this.customerRepository.searchCustomersAndLog(search, page, pageSize, currentSession);
        const customerDTOs = customers.map(customer => new CustomerDTO(customer));
        return { customerDTOs, total };
    }
    async createCustomers(customerFilePath) {
        const customers = [];
        fs.createReadStream(customerFilePath)
            .pipe(csv())
            .on('data', (data) => {
            customers.push({
                customerID: data.CustomerID,
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
            });
        })
            .on('end', async () => {
            try {
                await this.customerRepository.createManyCustomers(customers);
                fs.unlinkSync(customerFilePath);
                return 'CSV data has been successfully imported.';
            }
            catch (error) {
                fs.unlinkSync(customerFilePath);
                console.error(error);
                return 'Error while saving data';
            }
        })
            .on('error', (error) => {
            fs.unlinkSync(customerFilePath);
            console.error(error);
            return 'Error while reading the CSV file';
        });
    }
}
//# sourceMappingURL=CustomerService.js.map