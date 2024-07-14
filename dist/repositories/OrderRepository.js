import { db } from "../drizzle/db.js";
import { Order, OrderDetail, Product, Shipper } from "../drizzle/schema.js";
import { sql, eq } from 'drizzle-orm';
import { generateLogEntry } from "../middleware/LogsProcessor.js";
export class OrderRepository {
    async findOrderByIdAndLog(id, currentSession) {
        try {
            const startTime = Date.now();
            const orderQuery = db.select({
                orderID: Order.orderID,
                customerID: Order.customerID,
                employeeID: Order.employeeID,
                orderDate: Order.orderDate,
                requiredDate: Order.requiredDate,
                shippedDate: Order.shippedDate,
                shipVia: Order.shipVia,
                freight: Order.freight,
                shipName: Order.shipName,
                shipAddress: Order.shipAddress,
                shipCity: Order.shipCity,
                shipRegion: Order.shipRegion,
                shipPostalCode: Order.shipPostalCode,
                shipCountry: Order.shipCountry,
                shipViaName: Shipper.companyName
            })
                .from(Order)
                .leftJoin(Shipper, eq(Order.shipVia, Shipper.shipperID))
                .where(eq(Order.orderID, id))
                .limit(1);
            const order = await orderQuery;
            if (order.length === 0) {
                throw new Error(`Order not found by id: ${id}`);
            }
            const orderDetailsQuery = db
                .select({
                productId: Product.productID,
                quantity: OrderDetail.quantity,
                unitPrice: OrderDetail.unitPrice,
                discount: OrderDetail.discount,
                productName: Product.productName,
            })
                .from(OrderDetail)
                .leftJoin(Product, eq(OrderDetail.productID, Product.id))
                .where(eq(OrderDetail.orderID, id));
            const details = await orderDetailsQuery;
            const orderLogsData = generateLogEntry(startTime);
            const orderSqlLogs = orderQuery.toSQL().sql;
            const detailsSqlLogs = orderDetailsQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: orderSqlLogs, logsData: orderLogsData, resultsCount: order.length });
            currentSession.sqlLogs.push({ logs: detailsSqlLogs, logsData: orderLogsData, resultsCount: details.length });
            return { order, details };
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async searchOrdersAndLog(page, pageSize, currentSession) {
        try {
            const skip = (page - 1) * pageSize;
            const countQuery = db.select({ count: sql `count(*)` }).from(Order);
            const ordersWithDetailsQuery = db
                .select({
                totalProductsDiscount: sql `SUM(${OrderDetail.unitPrice} * ${OrderDetail.discount} * ${OrderDetail.quantity})`,
                totalProductsPrice: sql `SUM(${OrderDetail.unitPrice} * ${OrderDetail.quantity})`,
                totalProductsItems: sql `SUM(${OrderDetail.quantity})`,
                totalProducts: sql `COUNT(${OrderDetail.orderID})`,
                orderId: Order.orderID,
                customerId: Order.customerID,
                employeeId: Order.employeeID,
                orderDate: Order.orderDate,
                requiredDate: Order.requiredDate,
                shippedDate: Order.shippedDate,
                shipVia: Order.shipVia,
                freight: Order.freight,
                shipName: Order.shipName,
                shipAddress: Order.shipAddress,
                shipCity: Order.shipCity,
                shipRegion: Order.shipRegion,
                shipPostalCode: Order.shipPostalCode,
                shipCountry: Order.shipCountry,
            })
                .from(Order)
                .leftJoin(OrderDetail, eq(OrderDetail.orderID, Order.orderID))
                .groupBy(Order.orderID)
                .orderBy(Order.orderID)
                .limit(pageSize)
                .offset(skip);
            const startTime = Date.now();
            const orders = await ordersWithDetailsQuery;
            const total = await countQuery;
            const ordersLogsData = generateLogEntry(startTime);
            const ordersSqlLogs = ordersWithDetailsQuery.toSQL().sql;
            const totalSqlLogs = countQuery.toSQL().sql;
            if (!currentSession.sqlLogs) {
                currentSession.sqlLogs = [];
            }
            currentSession.sqlLogs.push({ logs: ordersSqlLogs, logsData: ordersLogsData, resultsCount: orders.length });
            currentSession.sqlLogs.push({ logs: totalSqlLogs, logsData: ordersLogsData, resultsCount: total.length });
            const ordersList = orders;
            return { ordersList, total };
        }
        catch (error) {
            throw new Error(`Database query failed: ${error}`);
        }
    }
    async createManyOrders(orders) {
        try {
            await db.insert(Order).values(orders);
        }
        catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
    async createManyOrderDetails(details) {
        try {
            await db.insert(OrderDetail).values(details);
        }
        catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
    async createManyShippers(shippers) {
        try {
            await db.insert(Shipper).values(shippers);
        }
        catch (error) {
            throw new Error(`Database insert failed: ${error}`);
        }
    }
    async deleteAllOrdersAndDetails() {
        try {
            await db.delete(OrderDetail).execute();
            await db.delete(Order).execute();
        }
        catch (error) {
            throw new Error(`Database delete failed: ${error}`);
        }
    }
}
//# sourceMappingURL=OrderRepository.js.map