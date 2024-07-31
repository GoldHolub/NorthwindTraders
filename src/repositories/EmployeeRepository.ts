import { db } from "../drizzle/db.js";
import { Employee } from "../drizzle/schema.js";
import { eq, sql } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
import { SessionData } from "express-session";
import { EmployeeType } from "../models/Types.js";
import { alias } from "drizzle-orm/pg-core";

export class EmployeeRepository {
    async findEmployeeByIdAndLog(id: string, currentSession: SessionData) {
        try {
            const startTime = Date.now();
            const supervisor = alias(Employee, 'supervisor');
            const employeeQuery = db.select({
                employeeID: Employee.employeeID,
                lastName: Employee.lastName,
                firstName: Employee.firstName,
                title: Employee.title,
                titleOfCourtesy: Employee.titleOfCourtesy,
                birthDate: Employee.birthDate,
                hireDate: Employee.hireDate,
                address: Employee.address,
                city: Employee.city,
                region: Employee.region,
                postalCode: Employee.postalCode,
                country: Employee.country,
                homePhone: Employee.homePhone,
                extension: Employee.extension,
                notes: Employee.notes,
                reportsTo: Employee.reportsTo,
                supervisorLastName: supervisor.lastName,
                supervisorFirstName: supervisor.firstName
              })
              .from(Employee)
              .leftJoin(supervisor, eq(supervisor.employeeID, Employee.reportsTo))
              .where(eq(Employee.employeeID, id))
              .limit(1);
            const employee = await employeeQuery;
            if (employee.length === 0) {
                throw new Error(`Employee not found by id: ${id}`);
            }

            const employeeLogsData = generateLogEntry(startTime);
            const employeeSqlLogs = employeeQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: employeeSqlLogs, logsData: employeeLogsData, resultsCount: employee.length });
            return employee;
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }

    async searchEmployeesAndLog(page: number, pageSize: number, currentSession: SessionData) {
        try {
            const skip = (page - 1) * pageSize;
            const query = db.select().from(Employee).limit(pageSize).offset(skip);
            const countQuery = db.select({ count: sql`count(*)` }).from(Employee);

            const startTime = Date.now();
            const employees = await query;
            const total = await countQuery as { count: number }[];

            const employeesLogsData = generateLogEntry(startTime);
            const employeesSqlLogs = query.toSQL().sql;
            const totalSqlLogs = countQuery.toSQL().sql;

            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: employeesSqlLogs, logsData: employeesLogsData, resultsCount: employees.length });
            currentSession.sqlLogs.push({ logs: totalSqlLogs, logsData: employeesLogsData, resultsCount: total.length });
            const employeesList = employees as unknown as EmployeeType[];

            return { employeesList, total };
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }

    async createManyEmployees(employees: any[]) {
        try {
            await db.insert(Employee).values(employees);
        } catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
}
