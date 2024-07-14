import { createConnection } from "typeorm";
import { Supplier } from "../entities/Supplier.js";
import * as fs from "fs";
import csv from "csv-parser";
async function importSuppliersFromCSV(filePath) {
    const connection = await createConnection();
    const supplierRepository = connection.getRepository(Supplier);
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
        const supplier = new Supplier();
        supplier.supplierID = data.SupplierID;
        supplier.companyName = data.CompanyName;
        supplier.contactName = data.ContactName;
        supplier.contactTitle = data.ContactTitle;
        supplier.address = data.Address;
        supplier.city = data.City;
        supplier.region = data.Region;
        supplier.postalCode = data.PostalCode;
        supplier.country = data.Country;
        supplier.phone = data.Phone;
        supplier.fax = data.Fax;
        supplier.homePage = data.HomePage;
        results.push(supplier);
    })
        .on("end", async () => {
        await supplierRepository.save(results);
        console.log("CSV data has been successfully imported.");
        await connection.close();
    })
        .on("error", (error) => {
        console.error("Error while reading the CSV file:", error);
    });
}
// Call the function with the path to your CSV file
importSuppliersFromCSV("src/services/Suppliers.csv");
//# sourceMappingURL=CsvImporter.js.map