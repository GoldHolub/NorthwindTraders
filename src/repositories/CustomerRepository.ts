import { db } from "../drizzle/db.js";
import { Customer } from "../drizzle/schema.js";
import { eq, ilike, sql } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
import { SessionData } from "express-session";
import { CustomerType } from "../models/Types.js";

export class CustomerRepository {
    async findCustomerByIdAndLog(id: string, currentSession: SessionData) {
        try {
            const startTime = Date.now();
            const customersQuery = db.select().from(Customer).where(eq(Customer.customerID, id)).limit(1);
            const customer = await customersQuery;
            if (customer.length === 0) {
                throw new Error(`Customer not found by id: ${id}`);
            }

            const customersLogsData = generateLogEntry(startTime);
            const customersSqlLogs = customersQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = []
            }
            currentSession.sqlLogs.push({ logs: customersSqlLogs, logsData: customersLogsData, resultsCount: customer.length });
            return customer;
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async searchCustomersAndLog(search: string, page: number, pageSize: number, currentSession: SessionData) {
        try {
            const skip = (page - 1) * pageSize;
            let query = db.select().from(Customer).limit(pageSize).offset(skip);
            let countQuery = db.select({ count: sql`count(*)` }).from(Customer);

            if (search) {
                const searchPattern = `%${search}%`;
                query.where(ilike(Customer.companyName, searchPattern));
                countQuery.where(ilike(Customer.companyName, searchPattern));
            }

            const startTime = Date.now();
            const { customers1, total } = await db.transaction(async (tx) => {
                const customers1 = await tx.execute(query);
                const total = await tx.execute(countQuery) as { count: number }[];
                return { customers1, total };
            });

            const customersLogsData = generateLogEntry(startTime);
            const customersSqlLogs = query.toSQL().sql;
            const totalSqlLogs = countQuery.toSQL().sql;

            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: customersSqlLogs, logsData: customersLogsData, resultsCount: customers1.length });
            currentSession.sqlLogs.push({ logs: totalSqlLogs, logsData: customersLogsData, resultsCount: total.length });
            const customers = customers1 as unknown as CustomerType[];

            return { customers, total };
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async createManyCustomers(customers: any[]) {
        try {
            await db.insert(Customer).values(customers);
        } catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }

}
