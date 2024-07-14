import { SupplierService } from "../services/SupplierService.js";

export class SupplierController {
    async getSupplierById(req: any, res: any) {
        const supplierId = parseInt(req.params.id);

        try {
            const supplierService = new SupplierService();
            const suppliers = await supplierService.getSupplierById(supplierId, req.session);

            res.status(200).send(suppliers);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }

    async searchSuppliers(req: any, res: any) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;

        try {
            const supplierService = new SupplierService();
            const { supplierDTOs, total } = await supplierService.searchSuppliers(page, pageSize, req.session);

            res.status(200).send({
                data: supplierDTOs,
                total: total[0].count,
                page,
                pageSize,
                pageCount: Math.ceil(total[0].count / pageSize),
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }

    async createSuppliers(req: any, res: any) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            const supplierService = new SupplierService();
            const filePath = req.file.path as string;
            const response = supplierService.createSuppliers(filePath);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ error: 'Error while creating suppliers' });
        }
    }
}
