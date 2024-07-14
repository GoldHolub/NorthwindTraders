import { EmployeeRepository } from "../repositories/EmployeeRepository.js";
import { EmployeeDTO } from "../dto/EmployeeDTO.js";
import fs from 'fs';
import csv from 'csv-parser';
import { SessionData } from "express-session";
import { format } from 'date-fns';

export class EmployeeService {
    private employeeRepository = new EmployeeRepository();

    async getEmployeeById(id: string, currentSession: SessionData) {
        return await this.employeeRepository.findEmployeeByIdAndLog(id, currentSession);
    }

    async searchEmployees(page: number, pageSize: number, currentSession: SessionData) {
        const { employeesList, total } = await this.employeeRepository.searchEmployeesAndLog(page, pageSize, currentSession);
        const employeeDTOs = employeesList.map(employee => new EmployeeDTO(employee));
        return { employeeDTOs, total }
    }

    async createEmployees(employeeFilePath: string) {
        const employees: any[] = [];
        fs.createReadStream(employeeFilePath)
            .pipe(csv())
            .on('data', (data) => {
                employees.push({
                    employeeID: data.EmployeeID,
                    lastName: data.LastName,
                    firstName: data.FirstName,
                    title: data.Title,
                    titleOfCourtesy: data.TitleOfCourtesy,
                    birthDate: new Date(data.BirthDate),
                    hireDate: new Date(data.HireDate),
                    address: data.Address,
                    city: data.City,
                    region: data.Region,
                    postalCode: data.PostalCode,
                    country: data.Country,
                    homePhone: data.HomePhone,
                    extension: data.Extension,
                    notes: data.Notes,
                    reportsTo: data.ReportsTo,
                });
            })
            .on('end', async () => {
                try {
                    await this.employeeRepository.createManyEmployees(employees);
                    fs.unlinkSync(employeeFilePath);
                    return 'CSV data has been successfully imported.';
                } catch (error) {
                    fs.unlinkSync(employeeFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(employeeFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }
}
