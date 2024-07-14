import { CustomerService } from "../services/CustomerService.js";

export class CustomerController {
    
    async getCustomerById(req: any, res: any) {
        const customerId = req.params.id;

        try {
            const customerService = new CustomerService();
            const customers = await customerService.getCustomerById(customerId, req.session);

            res.status(200).send(customers);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }

    async searchCustomers(req: any, res: any) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const search = req.query.search as string;

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
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}`});
        }
    }

    async createCustomers(req: any, res: any) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            const customerService = new CustomerService();
            const filePath = req.file.path as string;
            const response = customerService.createCustomers(filePath);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ error: 'Error while creating customers' });
        }
    }
}