import { OrderService } from "../services/OrderService.js";
export class OrderController {
    async getOrderById(req, res) {
        const orderId = parseInt(req.params.id);
        try {
            const orderService = new OrderService();
            const order = await orderService.getOrderById(orderId, req.session);
            res.status(200).send(order);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async searchOrders(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        try {
            const orderService = new OrderService();
            const { orderDTOsCompact, total } = await orderService.searchOrders(page, pageSize, req.session);
            res.status(200).send({
                data: orderDTOsCompact,
                total: total[0].count,
                page,
                pageSize,
                pageCount: Math.ceil(total[0].count / pageSize),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error fetching orders' });
        }
    }
    async createOrders(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        const filePath = req.file.path;
        try {
            const orderService = new OrderService();
            const resultMessage = await orderService.createOrders(filePath);
            res.status(201).json({ message: resultMessage });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while processing the CSV data', error });
        }
    }
    async createOrderDetails(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        const filePath = req.file.path;
        try {
            const orderService = new OrderService();
            const resultMessage = await orderService.createOrderDetails(filePath);
            res.status(201).json({ message: resultMessage });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while processing the CSV data', error });
        }
    }
    async createShippers(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        const filePath = req.file.path;
        try {
            const orderService = new OrderService();
            const resultMessage = await orderService.createShipper(filePath);
            res.status(201).json({ message: resultMessage });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while processing the CSV data', error });
        }
    }
    async deleteAllOrdersAndDetails(req, res) {
        try {
            const orderService = new OrderService();
            const resultMessage = await orderService.deleteAllOrdersAndDetails();
            res.status(200).json({ message: resultMessage });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error deleting all orders and details' });
        }
    }
}
//# sourceMappingURL=OrderController.js.map