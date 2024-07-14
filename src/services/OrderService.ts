import { OrderRepository } from "../repositories/OrderRepository.js";
import OrderDTOCompact from "../dto/OrderDTOCompact.js";
import OrderDTOFull from "../dto/OrderDTOFull.js";
import fs from 'fs';
import csv from 'csv-parser';
import { SessionData } from "express-session";

export class OrderService {
    private orderRepository = new OrderRepository();

    async getOrderById(id: number, currentSession: SessionData) {
        const { order, details } = await this.orderRepository.findOrderByIdAndLog(id, currentSession);
        return new OrderDTOFull(order, details);
    }

    async searchOrders(page: number, pageSize: number, currentSession: SessionData) {
        const { ordersList, total } = await this.orderRepository.searchOrdersAndLog(page, pageSize, currentSession);
        const orderDTOsCompact = ordersList.map(order => new OrderDTOCompact(order));
        return { orderDTOsCompact, total }
    }

    async createOrders(orderFilePath: string) {
        const orders: any[] = [];
        fs.createReadStream(orderFilePath)
            .pipe(csv())
            .on('data', (data) => {
                const order = {
                    orderID: parseInt(data.OrderID),
                    customerID: data.CustomerID,
                    employeeID: parseInt(data.EmployeeID),
                    orderDate: this.parseDate(data.OrderDate),
                    requiredDate: this.parseDate(data.RequiredDate),
                    shippedDate: this.parseDate(data.ShippedDate),
                    shipVia: parseInt(data.ShipVia),
                    freight: parseFloat(data.Freight),
                    shipName: data.ShipName,
                    shipAddress: data.ShipAddress,
                    shipCity: data.ShipCity,
                    shipRegion: data.ShipRegion,
                    shipPostalCode: data.ShipPostalCode,
                    shipCountry: data.ShipCountry,
                };
                orders.push(order);
            })
            .on('end', async () => {
                try {
                    await this.orderRepository.createManyOrders(orders);
                    fs.unlinkSync(orderFilePath);
                    return 'Orders have been successfully imported.';
                } catch (error) {
                    fs.unlinkSync(orderFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(orderFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }

    async createOrderDetails(detailFilePath: string) {
        const details: any[] = [];
        fs.createReadStream(detailFilePath)
            .pipe(csv())
            .on('data', (data) => {
                const detail = {
                    orderID: parseInt(data.OrderID),
                    productID: parseInt(data.ProductID),
                    unitPrice: parseFloat(data.UnitPrice),
                    quantity: parseInt(data.Quantity),
                    discount: parseFloat(data.Discount),
                };
                details.push(detail);
            })
            .on('end', async () => {
                try {
                    await this.orderRepository.createManyOrderDetails(details);
                    fs.unlinkSync(detailFilePath);
                    return 'Order details have been successfully imported.';
                } catch (error) {
                    fs.unlinkSync(detailFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(detailFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }

    async createShipper(shipperFilePath: string) {
        const shippers: any[] = [];
        fs.createReadStream(shipperFilePath)
            .pipe(csv())
            .on('data', (data) => {
                const shipper = {
                    shipperID: parseInt(data.ShipperID),
                    companyName: data.CompanyName,
                    phone: data.Phone,
                };
                shippers.push(shipper);
            })
            .on('end', async () => {
                try {
                    await this.orderRepository.createManyShippers(shippers);
                    fs.unlinkSync(shipperFilePath);
                    return 'Shippers have been successfully imported.';
                } catch (error) {
                    fs.unlinkSync(shipperFilePath);
                    console.error(error);
                    return 'Error while saving data';
                }
            })
            .on('error', (error: Error) => {
                fs.unlinkSync(shipperFilePath);
                console.error(error);
                return 'Error while reading the CSV file';
            });
    }

    async deleteAllOrdersAndDetails() {
        try {
            await this.orderRepository.deleteAllOrdersAndDetails();
            return 'All orders and associated details deleted successfully.';
        } catch (error) {
            throw new Error('Error deleting all orders and details');
        }
    }

    private parseDate(dateString: string): Date | null {
        const datePart = dateString.split(' ')[0];
        const date = new Date(datePart);
        return isNaN(date.getTime()) ? null : date;
    }
}
