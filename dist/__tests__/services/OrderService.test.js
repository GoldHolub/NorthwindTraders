import { OrderService } from "../../services/OrderService.js";
import { OrderRepository } from "../../repositories/OrderRepository.js";
import OrderDTOCompact from "../../dto/OrderDTOCompact.js";
import OrderDTOFull from "../../dto/OrderDTOFull.js";
jest.mock('../../repositories/OrderRepository.js');
jest.mock('fs');
jest.mock('csv-parser');
describe('OrderService', () => {
    let orderService;
    let orderRepository;
    let mockSession;
    beforeEach(() => {
        orderRepository = new OrderRepository();
        orderService = new OrderService();
        orderService['orderRepository'] = orderRepository;
        mockSession = { sqlLogs: [] };
    });
    describe('getOrderById', () => {
        test('should return order when order exists', async () => {
            const mockOrder = {
                orderID: 1, customerID: 'CUST1', shipName: 'ShipName', shipVia: 2,
                freight: '10.00', orderDate: new Date('2024-07-12'), requiredDate: new Date('2024-07-14'),
                shippedDate: new Date('2024-07-13'), shipCity: 'City', shipRegion: 'Region',
                shipPostalCode: '12345', shipCountry: 'Country', shipViaName: 'sf',
                shipAddress: 'Unknown', employeeID: 1
            };
            const mockDetails = [{
                    productId: 1, productName: 'Product1', quantity: 10, unitPrice: '20', discount: '0.1'
                }];
            jest.spyOn(orderRepository, 'findOrderByIdAndLog').mockResolvedValue({ order: [mockOrder], details: mockDetails });
            const result = await orderService.getOrderById(1, mockSession);
            expect(result).toEqual(new OrderDTOFull([mockOrder], mockDetails));
            expect(orderRepository.findOrderByIdAndLog).toHaveBeenCalledWith(1, mockSession);
        });
        test('should throw an error when order does not exist', async () => {
            jest.spyOn(orderRepository, 'findOrderByIdAndLog').mockImplementation(() => {
                throw new Error('Order not found by id: 1');
            });
            await expect(orderService.getOrderById(1, mockSession)).rejects.toThrow('Order not found by id: 1');
        });
    });
    describe('searchOrders', () => {
        test('should return orders and total count', async () => {
            const mockOrders = [{
                    orderId: 1, totalProductsPrice: '$100.00', totalProducts: 1, totalProductsItems: 10,
                    shippedDate: new Date('2024-07-13'), shipName: 'ShipName', shipCity: 'City', shipCountry: 'Country',
                    employeeID: 1, customerID: '1', orderID: 1, orderDate: new Date('2024-07-13'), requiredDate: new Date('2024-07-13'),
                    shipVia: 2, freight: '5.0', shipAddress: 'Tokio', shipRegion: 'Unknown', shipPostalCode: 'some'
                }];
            const mockTotal = [{ count: 1 }];
            jest.spyOn(orderRepository, 'searchOrdersAndLog').mockResolvedValue({ ordersList: mockOrders, total: mockTotal });
            const result = await orderService.searchOrders(1, 10, mockSession);
            expect(result).toEqual({
                orderDTOsCompact: mockOrders.map(order => new OrderDTOCompact(order)),
                total: mockTotal,
            });
            expect(orderRepository.searchOrdersAndLog).toHaveBeenCalledWith(1, 10, mockSession);
        });
        test('should throw an error when search fails', async () => {
            jest.spyOn(orderRepository, 'searchOrdersAndLog').mockImplementation(() => {
                throw new Error('Database query failed');
            });
            await expect(orderService.searchOrders(1, 10, mockSession)).rejects.toThrow('Database query failed');
        });
    });
});
//# sourceMappingURL=OrderService.test.js.map