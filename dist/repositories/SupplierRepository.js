import { db } from "../drizzle/db.js";
import { Supplier } from "../drizzle/schema.js";
import { eq, sql } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
export class SupplierRepository {
    async findSupplierByIdAndLog(id, currentSession) {
        try {
            const startTime = Date.now();
            const suppliersQuery = db.select().from(Supplier).where(eq(Supplier.supplierID, id)).limit(1);
            const supplier = await suppliersQuery;
            if (supplier.length === 0) {
                throw new Error(`Supplier not found by id: ${id}`);
            }
            const suppliersLogsData = generateLogEntry(startTime);
            const suppliersSqlLogs = suppliersQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: suppliersSqlLogs, logsData: suppliersLogsData, resultsCount: supplier.length });
            return supplier;
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async searchSuppliersAndLog(page, pageSize, currentSession) {
        try {
            const skip = (page - 1) * pageSize;
            const query = db.select().from(Supplier).limit(pageSize).offset(skip);
            const countQuery = db.select({ count: sql `count(*)` }).from(Supplier);
            const startTime = Date.now();
            const suppliers = await query;
            const total = await countQuery;
            const suppliersLogsData = generateLogEntry(startTime);
            const suppliersSqlLogs = query.toSQL().sql;
            const totalSqlLogs = countQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: suppliersSqlLogs, logsData: suppliersLogsData, resultsCount: suppliers.length });
            currentSession.sqlLogs.push({ logs: totalSqlLogs, logsData: suppliersLogsData, resultsCount: total.length });
            const suppliersList = suppliers;
            return { suppliersList, total };
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async createManySuppliers(suppliers) {
        try {
            await db.insert(Supplier).values(suppliers);
        }
        catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
}
//# sourceMappingURL=SupplierRepository.js.map