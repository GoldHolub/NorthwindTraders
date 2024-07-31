import { db } from "../drizzle/db.js";
import { Product, Supplier } from "../drizzle/schema.js";
import { eq, ilike, sql } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
import { ProductType } from "../models/Types.js";
import { SessionData } from "express-session";

export class ProductRepository {
    async findProductByIdAndLog(id: number, currentSession: SessionData) {
        try {
            const startTime = Date.now();
            const productsQuery = db.select({
                productID: Product.productID,
                productName: Product.productName,
                supplierID: Product.supplierID,
                supplierName: Supplier.companyName,
                categoryID: Product.categoryID,
                quantityPerUnit: Product.quantityPerUnit,
                unitPrice: Product.unitPrice,
                unitsInStock: Product.unitsInStock,
                unitsOnOrder: Product.unitsOnOrder,
                reorderLevel: Product.reorderLevel,
                discontinued: Product.discontinued
            })
                .from(Product)
                .leftJoin(Supplier, eq(Product.supplierID, Supplier.supplierID))
                .where(eq(Product.productID, id))
                .limit(1);

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
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }

    async searchProductsAndLog(search: string, page: number, pageSize: number, currentSession: SessionData) {
        try {
            const skip = (page - 1) * pageSize;
            let query = db.select().from(Product).limit(pageSize).offset(skip);
            let countQuery = db.select({ count: sql`count(*)` }).from(Product);

            if (search) {
                const searchPattern = `%${search}%`;
                query.where(ilike(Product.productName, searchPattern));
                countQuery.where(ilike(Product.productName, searchPattern));
            }

            const startTime = Date.now();
            const { products1, total } = await db.transaction(async (tx) => {
                const products1 = await tx.execute(query);
                const total = await tx.execute(countQuery) as { count: number }[];
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
            const products = products1 as unknown as ProductType[];

            return { products, total };
        } catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }

    async createManyProducts(products: any[]) {
        try {
            await db.insert(Product).values(products);
        } catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
}
