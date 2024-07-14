import { db } from "../drizzle/db.js";
import { Product } from "../drizzle/schema.js";
import { eq, ilike, sql } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
export class ProductRepository {
    async findProductByIdAndLog(id, currentSession) {
        try {
            const startTime = Date.now();
            const productsQuery = db.select().from(Product).where(eq(Product.productID, id)).limit(1);
            const product = await productsQuery;
            if (product.length === 0) {
                throw new Error(`Product not found by id: ${id}`);
            }
            const productsLogsData = generateLogEntry(startTime);
            const productsSqlLogs = productsQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: productsSqlLogs, logsData: productsLogsData, resultsCount: product.length });
            return product;
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async searchProductsAndLog(search, page, pageSize, currentSession) {
        try {
            const skip = (page - 1) * pageSize;
            let query = db.select().from(Product).limit(pageSize).offset(skip);
            let countQuery = db.select({ count: sql `count(*)` }).from(Product);
            if (search) {
                const searchPattern = `%${search}%`;
                query.where(ilike(Product.productName, searchPattern));
                countQuery.where(ilike(Product.productName, searchPattern));
            }
            const startTime = Date.now();
            const { products1, total } = await db.transaction(async (tx) => {
                const products1 = await tx.execute(query);
                const total = await tx.execute(countQuery);
                return { products1, total };
            });
            const productsLogsData = generateLogEntry(startTime);
            const productsSqlLogs = query.toSQL().sql;
            const totalSqlLogs = countQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: productsSqlLogs, logsData: productsLogsData, resultsCount: products1.length });
            currentSession.sqlLogs.push({ logs: totalSqlLogs, logsData: productsLogsData, resultsCount: total.length });
            const products = products1;
            return { products, total };
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async createManyProducts(products) {
        try {
            await db.insert(Product).values(products);
        }
        catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
}
//# sourceMappingURL=ProductRepository.js.map