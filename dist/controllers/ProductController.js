import { ProductService } from "../services/ProductService.js";
export class ProductController {
    async getProductById(req, res) {
        const productId = parseInt(req.params.id);
        try {
            const productService = new ProductService();
            const products = await productService.getProductById(productId, req.session);
            res.status(200).send(products);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async searchProducts(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const search = req.query.search;
        try {
            const productService = new ProductService();
            const { productDTOs, total } = await productService.searchProducts(search, page, pageSize, req.session);
            res.status(200).send({
                data: productDTOs,
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
    async createProducts(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            const productService = new ProductService();
            const filePath = req.file.path;
            const response = productService.createProducts(filePath);
            res.status(200).send(response);
        }
        catch (error) {
            res.status(500).send({ error: 'Error while creating products' });
        }
    }
}
//# sourceMappingURL=ProductController.js.map