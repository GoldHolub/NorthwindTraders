import { CustomerService } from "../services/CustomerService.js";
export class CustomerController {
    async getCustomerById(req, res) {
        const customerId = req.params.id;
        try {
            const customerService = new CustomerService();
            const customers = await customerService.getCustomerById(customerId, req.session);
            res.status(200).send(customers);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async searchCustomers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const search = req.query.search;
        try {
            const customerService = new CustomerService();
            const { customerDTOs, total } = await customerService.searchCustomers(search, page, pageSize, req.session);
            res.status(200).send({
                data: customerDTOs,
                total: total[0].count,
                page,
                pageSize,
                pageCount: Math.ceil(total[0].count / pageSize),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async createCustomers(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            const customerService = new CustomerService();
            const filePath = req.file.path;
            const response = customerService.createCustomers(filePath);
            res.status(200).send(response);
        }
        catch (error) {
            res.status(500).send({ error: 'Error while creating customers' });
        }
    }
}
//# sourceMappingURL=CustomerController.js.map